<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import * as Cesium from 'cesium'
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

function handleRightClick(movement: any) {
  const viewer = window.cesiumInstance.viewer
  const pickedFeature = viewer.scene.pick(movement.position)
  if (Cesium.defined(pickedFeature) && pickedFeature.id && pickedFeature.id.properties) {
    console.log(pickedFeature.id._properties._WIDTH._value)
    console.log(movement.position)
    styleObj.top = (movement.position.y + 25).toString() + 'px'
    styleObj.left = (movement.position.x + 35).toString() + 'px'
  }
}

onMounted(() => {
  const handler = new Cesium.ScreenSpaceEventHandler(window.cesiumInstance.viewer.scene.canvas)
  handler.setInputAction(handleRightClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
})
</script>

<template>
  <div :style="styleObj" v-show="true">
    <div class="title">经纬度信息</div>
    <div class="infoBody"></div>
  </div>
</template>

<style scoped></style>
