<script lang="ts" setup>
import { drawPolygon, flood, clean } from '@/utils/flood'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(window.cesiumInstance.viewer)
})
</script>

<template>
  <div class="drwabutton"></div>
  <button @click="flood()">淹没分析</button>
  <button @click="drawPolygon()">绘制多边形（左键画点，右键结束）</button>
  <button @click="clean()">清除淹没效果</button>
</template>

<style scoped>
.drwabutton {
  background-color: blue;
}
</style>
