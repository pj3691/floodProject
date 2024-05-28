<script setup lang="ts">
import * as Cesium from 'cesium'
import CesiumView from '@/views/cesium-init/cesium-init.vue'
import ControlMenu from '@/views/control-menu/index.vue'
import ControlScene from '@/views/control-scene/index.vue'
import InfoTable from '@/views/info-table/index.vue'
import { onBeforeMount, onMounted, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import proj4 from 'proj4'
import { weatherControl } from '@/utils/weather'
//接收id参数，根据id确定加载的场景
const id = ref<number>(0)
const routerP = useRoute()
id.value = parseInt(routerP.query.id as string)

async function add3DTiles() {
  const viewer = window.cesiumInstance.viewer
  var tileset = await Cesium.Cesium3DTileset.fromUrl('/tiled/tileset.json', {
    //加载参数设置，优化cesium加载3dtiles速度
    skipLevelOfDetail: true,
    // baseScreenSpaceError: 1024,
    // skipScreenSpaceErrorFactor: 16,
    skipLevels: 1,
    immediatelyLoadDesiredLevelOfDetail: false,
    loadSiblings: false,
    cullWithChildrenBounds: true,
    dynamicScreenSpaceError: true,
    dynamicScreenSpaceErrorDensity: 2.0e-4,
    dynamicScreenSpaceErrorFactor: 24.0,
    dynamicScreenSpaceErrorHeightFalloff: 0.25,
    maximumScreenSpaceError: 2
  })

  const tilesets = window.cesiumInstance.viewer.scene.primitives.add(tileset)
  const boundingSphere = tileset.boundingSphere
  viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0))
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('rgba(255,255,255,0.7)')"
    // 	show: {
    // 		conditions: [
    // 			["${level} >= 10", false],
    // 			["true", true]
    // 		]
    // 	}
  })

  const offsetHeight = 100
  // const boundingSphere = tileset.boundingSphere
  const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)
  const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
  const offset = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    offsetHeight
  )
  const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  window.cesiumInstance.viewer.flyTo(tileset)
}

//geoJson香港坐标系转wgs84坐标系
const tranformCoordinate = (fromProjection: any, toProjection: any) => {
  Cesium.GeoJsonDataSource.crsNames['urn:ogc:def:crs:EPSG::2326'] =
    Cesium.GeoJsonDataSource.crsNames['EPSG:2326'] = (coordinates: any) => {
      const x = coordinates[0]
      const y = coordinates[1]
      const newCoordinates = proj4(fromProjection, toProjection, [x, y])
      return Cesium.Cartesian3.fromDegrees(newCoordinates[0], newCoordinates[1], 0)
    }
}

function handleRightClick(movement: any) {
  const viewer = window.cesiumInstance.viewer
  const pickedFeature = viewer.scene.pick(movement.position)
  if (Cesium.defined(pickedFeature) && pickedFeature.id && pickedFeature.id.properties) {
    console.log(pickedFeature.id._properties._WIDTH._value)
  }
}

//初始化场景
const loadData = async () => {
  //将3d模型以及geoJson的坐标从香港1980转为wgs84
  const espg2326 =
    'PROJCS["Hong Kong 1980 Grid System",GEOGCS["Hong Kong 1980",DATUM["Hong_Kong_1980",SPHEROID["International 1924",6378388,297],TOWGS84[-162.619,-276.959,-161.764,-0.067753,2.243648,1.158828,-1.094246]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4611"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",22.3121333333333],PARAMETER["central_meridian",114.178555555556],PARAMETER["scale_factor",1],PARAMETER["false_easting",836694.05],PARAMETER["false_northing",819069.8],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","2326"]]'
  const wgs84 =
    'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
  tranformCoordinate(espg2326, wgs84)
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(119.51, 41.45, 121.51, 39.45)
  // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(119.51, 41.45, 121.51, 39.45);
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    120.131292,
    30.471157,
    120.132072,
    30.471217
  )
  window.cesiumInstance.viewer.imageryLayers.remove(
    window.cesiumInstance.viewer.imageryLayers.get(0)
  )
  const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3954, {}),
    {}
  )
  const terrainProvider = await Cesium.createWorldTerrainAsync()
  window.cesiumInstance.viewer.imageryLayers.add(imageryLayer)

  const viewer = window.cesiumInstance.viewer
  // viewer.terrainProvider = terrainProvider //加载cesium地形
  const coordinates = [
    -123.0744619, 44.0503706, -123.0744619, 44.0543706, -123.0704619, 44.0543706, -123.0704619,
    44.0503706
  ]
  // 将坐标转换为 Cartographic 对象
  const cartographics = coordinates.reduce((acc, val, i) => {
    if (i % 2 === 0) {
      acc.push(Cesium.Cartographic.fromDegrees(val, coordinates[i + 1]))
    }
    return acc
  }, [])

  // 加载GeoJSON数据
  // const geoJsonUrl = '/Pipe_Stormwater.json'
  // Cesium.GeoJsonDataSource.load(geoJsonUrl, {
  //   // clampToGround: true
  // }).then(function (dataSource) {
  //   // 将GeoJSON数据添加到Cesium Viewer
  //   window.cesiumInstance.viewer.dataSources.add(dataSource)
  //   // 可以选择将视图中心定位到GeoJSON数据的中心
  //   window.cesiumInstance.viewer.zoomTo(dataSource)
  //   // dataSource.entities.
  //   const entities = dataSource.entities.values
  //   for (let i = 0; i < entities.length; i++) {
  //     const entity = entities[i]
  //     if (entity.polygon) {
  //       // 提升多边形高度
  //       entity.polygon.height = new Cesium.CallbackProperty(function () {
  //         return 10
  //       }, false)
  //     }
  //     if (entity.polyline) {
  //       const positions = entity.polyline.positions.getValue(Cesium.JulianDate.now())
  //       // positions[0].z += 10000
  //       // positions[1].z += 10000
  //       const newPositions = positions.map((pos) => {
  //         const cartographic = Cesium.Cartographic.fromCartesian(pos)
  //         return Cesium.Cartesian3.fromRadians(
  //           cartographic.longitude,
  //           cartographic.latitude,
  //           cartographic.height + 100
  //         )
  //       })
  //       entity.polyline.positions = newPositions
  //     }
  //     if (entity.point) {
  //       // 提升点的高度
  //       entity.position = new Cesium.CallbackProperty(function () {
  //         const position = entity.position.getValue()
  //         const cartographic = Cesium.Cartographic.fromCartesian(position)
  //         cartographic.height += 10
  //         return Cesium.Cartesian3.fromRadians(
  //           cartographic.longitude,
  //           cartographic.latitude,
  //           cartographic.height
  //         )
  //       }, false)
  //     }
  //   }
  // })
  // viewer.scene.globe.depthTestAgainstTerrain = true

  // //加载3dtiles数据
  // add3DTiles()
}

onMounted(async () => {
  loadData()
  // pDrawArrow()
  // const handler = new Cesium.ScreenSpaceEventHandler(window.cesiumInstance.viewer.scene.canvas)
  // handler.setInputAction(handleRightClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
})
</script>

<template>
  <div class="container">
    <div>
      <div class="top">
        <!-- <img src="/切图/菜单/头部 Copy 1@1x.png" alt="" class="topImg" />
        <div class="menuText">洪水模拟</div> -->
        <!-- 菜单控制列表 -->
        <control-menu />
      </div>
      <div class="main">
        <!-- 地图显示 -->
        <cesium-view />
        <info-table />
      </div>
      <div class="footer">
        <!-- 底部场景控制控件 -->
        <control-scene ref="controlSceneRef" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: linear-gradient(
    89.77deg,
    rgba(11, 17, 29, 1) 0.1%,
    rgba(6, 75, 130, 1) 51%,
    rgba(11, 17, 29, 1) 99.9%
  );
  height: 100vh;
  width: 100vw;
  .top {
    width: 100vw;
    height: 5vh;
    /* border-radius: 10px; */
    background-color: transparent;
    position: relative;
  }
  .topImg {
    position: relative;
    width: 100%;
    height: 150px;
  }
  .menuText {
    position: relative;
    left: 39%;
    top: -137px;
    width: 26%;
    height: 46px;
    font-family: 'menuFont';
    font-size: 34px;
    color: #b9dbff;
  }
  .main {
    width: 100vw;
    height: 86vh;
    /* border-radius: 10px; */
    background-color: transparent;
    background-image: url(/切图/工程详情/ceiusnBoxBg.png);
    position: relative;
    background-size: 101% 100%;
    background-position: 50%;
  }

  .footer {
    width: 100vw;
    height: 15vh;
    /* border-radius: 10px; */
    background-color: transparent;
    position: relative;
  }

  #cesium-box {
    width: 98vw;
    height: 82vh;
    top: 1.5vh;
    left: 1%;
    position: relative;
  }
}
.cesium-widget,
.cesium-widget canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  border-radius: 10px !important;
}
</style>
