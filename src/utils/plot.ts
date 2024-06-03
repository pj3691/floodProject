// import { pDrawArrow } from '@/utils/plot'
import { GraphManager } from 'cesium-plotting-symbol'
import * as Cesium from 'cesium'
import * as echarts from 'echarts'

export function plotInstance(params: any) {
  const gm = new GraphManager(window.cesiumInstance.viewer, {
    layerId: 'testbh1',
    editAfterCreate: true
  })

  gm.create({ obj: params, color: '#00ff00' })
}

/**
 * 笛卡尔坐标系转WGS84坐标系
 * @param point 笛卡尔
 * @return {{lat: *, lng: *, alt: *}}
 * @constructor
 */
function cartesian3ToDegrees(point: any) {
  const cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
  const lat = Cesium.Math.toDegrees(cartographic.latitude)
  const lng = Cesium.Math.toDegrees(cartographic.longitude)
  const h = point.z
  return [lng, lat, h]
}

/**
 * 调用Echarts绘制剖面图
 * @param Positions 
 */
function createProfileChart(Positions) {
  console.log(Positions.point)
  var x_Range = parseInt(Positions[Positions.length - 1].distance)
  console.log(x_Range)
  var ProfileData = []
  var ProfileData_Lon = []

  var y_Min = 100000000
  for (let index = 0; index < Positions.length; index++) {
    const element = Positions[index]
    var m_distance = element.distance.toFixed(2)
    var m_Lon = element.point[0].toFixed(5)
    var m_Lat = element.point[1].toFixed(5)
    var m_height = element.point[2].toFixed(2)
    // console.log(m_height)

    if (m_height < y_Min) {
      y_Min = m_height
    }
    var m_data = [m_distance, m_height]
    ProfileData.push(m_data)
    ProfileData_Lon.push([m_Lon, m_Lat])
  }
  console.log(ProfileData)
  var lineChart = echarts.init(document.getElementById('profileChart'))
  // background: rgba(255, 255, 255, 1);
  var lineoption = {
    title: {
      text: '剖面分析'
    },
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        console.log(params['data'])
        return '当前高度：' + params['data'][1]
      }
    },
    legend: {
      data: ['剖面线']
    },
    grid: {
      x: 40,
      x2: 40,
      y2: 24
    },
    calculable: true,
    xAxis: [
      {
        type: 'value',
        max: 'dataMax',
        scale: true
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: y_Min,
        scale: true
      }
    ],
    series: [
      {
        name: '剖面线',
        type: 'line',
        data: ProfileData,
        markPoint: {
          data: [
            { type: 'max', name: '最高点' },
            { type: 'min', name: '最低点' }
          ]
        }
      }
    ]
  }
  lineChart.setOption(lineoption)

  document.getElementById('profileChart').style.backgroundColor = 'rgba(255, 255, 255, 1)'
  document.getElementById('profileChart').style.visibility = 'visible'
  // window.resizeBy(lineChart.resize)
}


/**
 * 剖面分析，直接调用即可
 */
export function Profile() {
  const viewer = window.cesiumInstance.viewer
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  let positions: any = []
  let positionsCartographic = []
  let positions_Inter: any = []
  let poly: any = null
  let distance = 0
  let cartesian = null
  let floatingPoint
  let DistanceArray = []

  let profileItem: any = []

  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.endPosition)
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions)
      } else {
        positions.pop()
        positions.push(cartesian)
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  handler.setInputAction(async function (movement) {
    movement.position.x = movement.position.x
    cartesian = viewer.scene.pickPosition(movement.position)
    if (positions.length == 0) {
      positions.push(cartesian.clone())
    }
    positions.push(cartesian)
    if (poly) {
      //进行插值计算
      interPoints(poly.positions)
      distance = getSpaceDistance(positions_Inter)
    } else {
      distance = getSpaceDistance(positions)
    }
    let textDisance = distance + '米'
    DistanceArray.push(distance)
    floatingPoint = viewer.entities.add({
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.NONE
      },
      label: {
        text: textDisance,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -20),
        heightReference: Cesium.HeightReference.NONE
      }
    })
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  handler.setInputAction(async function (movement) {
    const viewer = window.cesiumInstance.viewer
    handler.destroy() //关闭事件句柄
    positions.pop() //最后一个点无效
    // console.log(profileItem)
    for (const key of profileItem) {
      const cartographic = Cesium.Cartographic.fromDegrees(key.point[0], key.point[1])
      const positions1 = [cartographic, cartographic]
      const ppx = await viewer.scene.sampleHeightMostDetailed(positions1)
      key.point[2] = ppx[0].height
    }
    createProfileChart(profileItem)
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

  let PolyLinePrimitive = (function () {
    function _(positions) {
      this.options = {
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.CHARTREUSE,
          width: 2,
          clampToGround: true
        }
      }
      this.positions = positions
      this._init()
    }
    _.prototype._init = function () {
      let _self = this
      let _update = function () {
        return _self.positions
      }
      //实时更新polyline.positions
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
      viewer.entities.add(this.options)
    }
    return _
  })()

  //空间两点距离计算函数
  function getSpaceDistance(positions) {
    profileItem = [
      {
        point: cartesian3ToDegrees(positions[0]),
        distance: 0
      }
    ]
    let distance = 0
    for (let i = 0; i < positions.length - 1; i++) {
      let point1cartographic = Cesium.Cartographic.fromCartesian(positions[i])
      let point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1])
      /**根据经纬度计算出距离**/
      let geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      let s = geodesic.surfaceDistance
      //返回两点之间的距离
      s = Math.sqrt(
        Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2)
      )
      distance = distance + s
      let m_Item = {
        point: cartesian3ToDegrees(positions[i + 1]),
        distance: distance
      }
      profileItem.push(m_Item)
    }

    return distance.toFixed(2)
  }

  //线段插值点
  function interPoints(positions) {
    positionsCartographic = []
    let terrainSamplePositions = []
    for (let index = 0; index < positions.length - 1; index++) {
      const element = positions[index]
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartographic = ellipsoid.cartesianToCartographic(element)
      positionsCartographic.push(cartographic)
    }
    for (let i = 0; i < positionsCartographic.length; i++) {
      const m_Cartographic0 = positionsCartographic[i]
      const m_Cartographic1 = positionsCartographic[i + 1]
      if (m_Cartographic1) {
        let a = Math.abs(m_Cartographic0.longitude - m_Cartographic1.longitude) * 10000000
        let b = Math.abs(m_Cartographic0.latitude - m_Cartographic1.latitude) * 10000000
        //等距采样
        if (a > b) b = a
        let length = parseInt(b / 2)
        if (length > 1000) length = 1000
        if (length < 2) length = 2
        // let length = 4;//等分采样
        for (let j = 0; j < length; j++) {
          terrainSamplePositions.push(
            new Cesium.Cartographic(
              Cesium.Math.lerp(
                m_Cartographic0.longitude,
                m_Cartographic1.longitude,
                j / (length - 1)
              ),
              Cesium.Math.lerp(m_Cartographic0.latitude, m_Cartographic1.latitude, j / (length - 1))
            )
          )
        }
        terrainSamplePositions.pop()
      } else {
        terrainSamplePositions.push(m_Cartographic0)
      }
    }
    positions_Inter = []
    for (let n = 0; n < terrainSamplePositions.length; n++) {
      //地理坐标（弧度）转经纬度坐标
      let m_cartographic = terrainSamplePositions[n]
      let height = viewer.scene.globe.getHeight(m_cartographic)
      // console.log(height)
      let point = Cesium.Cartesian3.fromDegrees(
        (m_cartographic.longitude / Math.PI) * 180,
        (m_cartographic.latitude / Math.PI) * 180,
        height
      )
      positions_Inter.push(point)
    }
    console.log(positions_Inter)
  }
}


