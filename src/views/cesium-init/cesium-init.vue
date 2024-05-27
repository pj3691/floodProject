<script lang="ts" setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import CesiumViewer from './index'

onMounted(() => {
  window.cesiumInstance = new CesiumViewer('cesiumContainer')
})

</script>

<template>
  <!-- <EleTable/> -->
  <div id="cesiumContainer"></div>
  <div id="sun">
    <p style="display: inline">区域最大淹没高度(米):</p>
    <input type="text" value="150" id="maxHeight" />
    <p style="display: inline">区域当前水面高度(米):</p>
    <input type="text" value="0" id="minHeight" />
    <p style="display: inline">淹没时间(秒):</p>
    <input type="text" value="1" id="floodSpeed" />
  </div>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
}
</style>
