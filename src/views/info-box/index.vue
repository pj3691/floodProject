<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import * as Cesium from 'cesium'
import { usePopShowStore, scenesControlStore } from '@/stores'

const popShowStore = usePopShowStore()
const sceneContrlStore = scenesControlStore()
const styleObj = reactive({
  top: '0px',
  left: '0px',
  width: '261px',
  height: '158px',
  position: 'absolute',
  // padding: "10px",
  color: '#03e9f4',
  animation: 'fadein .5s',
  'z-index': '1',
  'box-sizing': 'border-box',
  'font-size': '18px',
  'line-height': '1.5',
  'background-image': 'url(/切图/工程详情/infoBox.png)'
})
const styleObj2 = reactive({
  top: '68vh',
  left: '19px',
  width: '98vw',
  height: '15vh',
  position: 'absolute',
  // padding: "10px",
  color: '#03e9f4',
  animation: 'fadein .5s',
  'z-index': '1',
  'box-sizing': 'border-box',
  'font-size': '18px',
  'line-height': '1.5'
  // 'background-image': 'url(/切图/工程详情/infoBox.png)'
})
function handleRightClick(movement: any) {
  const viewer = window.cesiumInstance.viewer
  const pickedFeature = viewer.scene.pick(movement.position)
  if (Cesium.defined(pickedFeature) && pickedFeature.id && pickedFeature.id.properties) {
    console.log(pickedFeature.id._properties)
    // console.log(movement.position)
    styleObj.top = (movement.position.y + 25).toString() + 'px'
    styleObj.left = (movement.position.x + 35).toString() + 'px'
    popShowStore.infoShow = true
    sceneContrlStore.setpipe(
      pickedFeature.id._properties.FR_PNT._value,
      pickedFeature.id._properties._WIDTH._value,
      pickedFeature.id._properties.SHAPE_DESCRIPTION._value
    )
  }
}

function handlLeftClick(movement?: any) {
  const viewer = window.cesiumInstance.viewer
  const pickedFeature = viewer.scene.pick(movement.position)
  if (!(Cesium.defined(pickedFeature) && pickedFeature.id && pickedFeature.id.properties)) {
    popShowStore.infoShow = false
  }
}

onMounted(() => {
  const handler = new Cesium.ScreenSpaceEventHandler(window.cesiumInstance.viewer.scene.canvas)
  handler.setInputAction(handleRightClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK) //SHAPE_DESCRIPTION
  handler.setInputAction((movement?: any) => {
    const viewer = window.cesiumInstance.viewer
    const pickedFeature = viewer.scene.pick(movement.position)
    if (!(Cesium.defined(pickedFeature) && pickedFeature.id && pickedFeature.id.properties)) {
      popShowStore.infoShow = false
      // handler.destroy()
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})
</script>

<template>
  <div :style="styleObj" v-show="popShowStore.infoShow">
    <div class="title">管道信息</div>
    <div class="infoBody">
      id：{{ sceneContrlStore.pipeIfo.id }}
      <br />
      长度：{{ sceneContrlStore.pipeIfo.wid }}米
      <br />
      类型：{{ sceneContrlStore.pipeIfo.type }}
    </div>
  </div>
  <div id="profileChart" :style="styleObj2"></div>
</template>

<style scoped>
.title {
  position: relative;
  width: 60%;
  left: 16%;
  top: 5%;
  font-size: 15px;
}
.infoBody {
  position: relative;
  width: 60%;
  left: 16%;
  top: 18%;
  font-size: 17px;
}
</style>
