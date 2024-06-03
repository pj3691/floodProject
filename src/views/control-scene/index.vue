<script lang="ts" setup>
import * as Cesium from 'cesium'
import router from '@/router'
import { onMounted, ref, reactive } from 'vue'
import { flood, clean } from '@/utils/flood'

//底部按钮背景图片
const btnStyle = reactive({
  'background-image': 'url(/切图/工程详情/btn-left.png)'
})

const ifRun = ref(false)

//点击模拟运算按钮触发
function sceneSim() {}

function runScene() {
  flood()
  ifRun.value = true
}

//点击场景编辑按钮触发
function sceneEdit() {}

//点击结束运行按钮触发
function quitRun() {
  clean()
  ifRun.value = false
}

//页面跳转
function jump(num: number) {
  switch (num) {
    case 0:
      router.push('/simulationPlatform')
      break
    case 1:
      router.push('/home')
      break
    default:
      break
  }
}
</script>

<template>
  <el-button
    type="primary"
    :disabled="true"
    :style="btnStyle"
    @click="sceneSim()"
    class="btn-sceneEdit"
    >场景编辑</el-button
  >
  <!-- <el-button type="primary" style="left: 1%" @click="jump(1)" class="btn-quitEdit">返回</el-button> -->
  <el-button type="primary" v-show="false" @click="quitRun()" class="btn-quitEdit"
    >结束运行</el-button
  >
  <el-button type="primary" @click="sceneEdit()" class="btn-sceneRun">模拟运算</el-button>
  <el-button v-if="!ifRun" type="primary" @click="runScene()" class="btn-router"
    >场景运行</el-button
  >
  <el-button v-if="ifRun" type="primary" @click="quitRun()" class="btn-router">停止运行</el-button>
</template>

<style lang="scss" scoped>
.el-slider__runway.is-disabled .el-slider__bar {
  background-color: #37518e !important;
}
.sceneContrl {
  position: relative;
  top: -100px;
  height: 0;
  .scenePlay {
    position: relative;
    width: 50%;
    left: 25%;
    top: -56px;
  }
  .icon {
    position: relative;
    top: -120px;
    left: 48%;
  }
}
.btn-sceneEdit {
  position: relative;
  left: 33vw;
  top: 2vh;
  width: 10vw;
  height: 5vh;
  border-width: 0;
  border-radius: 0;
  background-size: 100% 100% !important;
  background-color: transparent !important;
  background-image: url(/切图/工程详情/btn-left.png);
}
.btn-sceneEdit.el-button.is-disabled:hover {
  background-image: url(/切图/工程详情/btn-left.png) !important;
}

.btn-sceneRun {
  position: relative;
  left: 34vw;
  top: 2vh;
  width: 10vw;
  height: 5vh;
  border-width: 0;
  border-radius: 0;
  background-color: transparent !important;
  background-size: 100% 100% !important;
  background-image: url(/切图/工程详情/btn-medium.png);
}

.btn-router {
  position: relative;
  left: 35vw;
  top: 2vh;
  width: 10vw;
  height: 5vh;
  border-width: 0;
  border-radius: 0;
  background-color: transparent !important;
  background-size: 100% 100% !important;
  background-image: url(/切图/工程详情/btn-right.png);
}
.btn-router:hover {
  background-image: url(/切图/工程详情/btn-right.png) !important;
}

.btn-sceneRun .el-button.is-disabled,
.el-button.is-disabled:hover {
  color: #971515;
  cursor: not-allowed;
  background-image: url(/切图/工程详情/btn-medium.png);
  /* background-image: none; */
  background-color: var(--el-button-disabled-bg-color);
  border-color: var(--el-button-disabled-border-color);
}
</style>
