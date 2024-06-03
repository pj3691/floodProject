import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import { weatherControl } from '@/utils/weather'

//绘制的点数组, 选取位置的范围坐标
let adapCoordi: any = []
// 多边形区域实体
let area: any

//绘制多边形
export function drawPolygon() {
  const viewer = window.cesiumInstance.viewer
  let actPoints: any = []
  let floatPoint
  let dynamicShape
  let activeShape
  const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // 绘制面(动态)
  function drawShape(positionData: any) {
    return viewer.entities.add({
      polygon: {
        hierarchy: positionData,
        material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7))
      }
    })
  }
  //左键
  handle.setInputAction(function (movement: any) {
    const position = viewer.scene.pickPosition(movement.position)
    if (Cesium.defined(position)) {
      actPoints.push(position)
      if (actPoints.length < 2) {
        actPoints.push(position)
      }
      // 根据动态位置坐标点画面
      const dynamicPositions = new Cesium.CallbackProperty(function () {
        return new Cesium.PolygonHierarchy(actPoints)
      }, false)
      activeShape = drawShape(dynamicPositions)
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  //右键
  handle.setInputAction(function (movement: any) {
    const position = viewer.scene.pickPosition(movement.position)
    if (Cesium.defined(position)) {
      actPoints.push(position)
      floatPoint = actPoints
      viewer.entities.removeAll()
      actPoints = []
      createPolygon(floatPoint)
      adapCoordi = floatPoint
    }
    handle.destroy()
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK) // LEFT_DOUBLE_CLICK、RIGHT_CLICK
  //移动
  handle.setInputAction(function (movement: any) {
    if (actPoints.length > 0) {
      const position = viewer.scene.pickPosition(movement.endPosition)
      if (Cesium.defined(position)) {
        actPoints.pop()
        actPoints.push(position)
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  viewer.entities.add({
    id: 'tempPolyline',
    polyline: {
      positions: new Cesium.CallbackProperty(function () {
        return actPoints
      }, false),
      width: 2,
      extrudedHeight: 100,
      material: Cesium.Color.RED.withAlpha(1)
    }
  })
}

//创建多边形
export function createPolygon(points: any) {
  const viewer = window.cesiumInstance.viewer
  //primitive方式创建.可以制作出水波纹效果。adapCoordi
  const waterPrimitive = new Cesium.Primitive({
    allowPicking: false,
    asynchronous: false,
    geometryInstances: new Cesium.GeometryInstance({
      id: 'floodGeoInstance',
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(points),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        extrudedHeight: 1,
        height: 0
      })
    }),
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      //当为 true 时，几何体应位于椭圆体的表面上,不是在其上方的恒定高度
      aboveGroud: true,
      material: new Cesium.Material({
        fabric: {
          type: 'Water',
          uniforms: {
            blendColor: new Cesium.Color(0, 0, 1, 0.3),
            normalMap: './waterNormals.jpg',
            //频率速度设置
            frequency: 200,
            animationSpeed: 0.01,
            amplitude: 10
          }
        }
      })
    })
  })
  area = viewer.scene.primitives.add(waterPrimitive)
}

export function clean() {
  const viewer = window.cesiumInstance.viewer
  window.cesiumInstance.viewer.scene.postProcessStages.removeAll()
  viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
  viewer.entities.removeAll()
}

//淹没分析
export function flood() {
  const viewer = window.cesiumInstance.viewer
  weatherControl(1)
  viewer.scene.primitives.remove(area)
  if (!Cesium.defined(adapCoordi)) {
    alert('请先绘制淹没范围')
    return
  }
  let currentHeight = parseFloat(document.getElementById('minHeight').value)
  const maxHeight = parseFloat(document.getElementById('maxHeight').value)
  const times = DparseFloat(document.getElementById('floodSpeed').value)
  const speed = (maxHeight - currentHeight) / times
  //entity方式创建
  const entity = viewer.entities.add({
    id: 'floodEntity',
    polygon: {
      hierarchy: adapCoordi,
      closeTop: true,
      closeBottom: true,
      fill: true,
      //获取或设置分类类型属性，指定此多边形在地面上时是否对地形、3D瓷砖或两者进行分类。
      classificationType: Cesium.ClassificationType.BOTH,
      material: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#7EA4B3'), 0.9),
      perPositionHeight: true,
      //一个属性，其值由回调函数延迟评估。time, result
      extrudedHeight: 0
    }
  })
  viewer.flyTo(entity)
  //设置高度随时间变化
  const setFlood = setInterval(() => {
    if (currentHeight < maxHeight) {
      console.log(currentHeight)

      currentHeight += speed / 30
      entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function (time, result) {
        return currentHeight
      }, false)
      if (currentHeight > maxHeight) {
        currentHeight = maxHeight
        clearInterval(setFlood)
      }
    }
  }, 1000 / 30)
}
