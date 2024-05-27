<script lang="ts" setup>
import EleTable from 'elementTable/eleTable.vue'
import CesiumView from '@/views/cesium-init/cesium-init.vue'
import DrawButton from '@/views/button-draw/index.vue'
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

onMounted(() => {
  let viewer = window.cesiumInstance.viewer
  console.log(window.cesiumInstance.viewer)
})
</script>

<template>
  <!-- <EleTable/> -->
  <CesiumView />
  <DrawButton />
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
