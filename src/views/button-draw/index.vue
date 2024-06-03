<script lang="ts" setup>
import { drawPolygon, flood, clean } from '@/utils/flood'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(window.cesiumInstance.viewer)
})
</script>

<template>
  <div class="drwabutton">
    <button @click="flood()">淹没分析</button>
    <button @click="drawPolygon()">绘制多边形（左键画点，右键结束）</button>
    <button @click="clean()">清除淹没效果</button>
  </div>
</template>

<style scoped>
.drwabutton {
  position: absolute;
  left: 20vw;
  top: 0;
  width: 10vw;
  height: 5vh;
  border-width: 0;
  border-radius: 0;
  background-size: 100% 100% !important;
  background-color: transparent !important;
}
</style>
