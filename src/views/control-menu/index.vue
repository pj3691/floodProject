<script setup lang="ts">
import { toRefs, ref, watch, onMounted } from 'vue'
import { selectAviliable } from './index'
import * as Cesium from 'cesium'

//下拉菜单选项
const targetList = [
  {
    value: 0,
    lable: '距离测量'
  },
  {
    value: 1,
    lable: '面积测量'
  }
]
const weatherList = [
  {
    value: 0,
    lable: '点标绘'
  },
  {
    value: 1,
    lable: '线标绘'
  },
  {
    value: 2,
    lable: '面标绘'
  }
]
const targetType = ref('无人机')
const weatherState = ref('晴')

onMounted(() => {})
</script>

<template>
  <div style="index: 1; position: relative; top: 25%; left: 20%">
    <el-space wrap size="small">
      <el-text class="hintText">测量工具：</el-text>
      <el-select
        v-model="targetType"
        :disabled="selectAviliable"
        style="width: 200px"
        placeholder="目标类型"
        popper-class="selectClass"
      >
        <el-option
          v-for="target in targetList"
          :key="target.value"
          :lable="target.lable"
          :value="target.lable"
        />
      </el-select>
      <el-text class="hintText">标绘工具：</el-text>
      <el-select
        v-model="weatherState"
        :disabled="selectAviliable"
        style="width: 200px"
        placeholder="环境状况"
        popper-class="selectClass"
      >
        <el-option
          v-for="weather in weatherList"
          :key="weather.value"
          :lable="weather.lable"
          :value="weather.lable"
        />
      </el-select>
    </el-space>
  </div>
</template>

<style lang="scss" scoped>
.selectListStyle {
  width: 10vw;
  height: 4vh;
  border: 2vh;
}
.menu_main {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  padding: 0 30px;
  .btn-quitEdit {
    width: 100px;
    height: 32px;
    border-width: 0;
    border-radius: 0;
    background-color: transparent !important;
    background-image: url(/173切图/工程管理/divbutton.png);
  }
}
:deep(.el-text) {
  color: #6ac9ff !important;
}

:deep(.el-select-dropdown__list) {
  background-color: #0d2e73 !important;
  border: #095493 solid 1px;
  border-radius: 0;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}

:deep(.el-select__wrapper) {
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  padding: 4px 12px;
  gap: 6px;
  min-height: 32px;
  line-height: 24px;
  /* border-radius: 20px; */
  background-color: transparent !important;
  transition: var(--el-transition-duration);
  box-shadow: 0 0 1px 0 var(--el-border-color) inset;
  border-color: #00fdff !important;
  border-width: 1px;
  border-style: solid;
  color: rgba(0, 253, 255, 1);
}

:deep(.el-select__placeholder) {
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 253, 255, 1);
}
:deep(.el-select__popper.el-popper) {
  background: transparent;
  border: 0px solid var(--el-border-color-light);
  box-shadow: none;
}
:deep(.el-popper__arrow) {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
  display: none;
}
</style>

<style lang="scss">
.selectClass {
  .el-select-dropdown__list {
    background-color: #0d2e73 !important;
    border: #095493 solid 1px;
    border-radius: 0;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
  }
  .el-select-dropdown__item.is-hovering {
    background-color: #6a92cd;
  }
  .el-select-dropdown__item {
    font-size: var(--el-font-size-base);
    padding: 0 32px 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(0, 253, 255);
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .el-select {
    --el-select-input-focus-border-color: none !important;
  }
  .el-input__wrapper {
    box-shadow: none !important;
  }
  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
  }
  .el-select .el-input__wrapper.is-focus {
    box-shadow: none !important;
  }
  .el-select:hover:not(.el-select--disabled) .el-input__wrapper {
    box-shadow: none !important;
  }
}
.el-select__popper.el-popper {
  background: #0d2e73;
  border: 0px solid var(--el-border-color-light);
  box-shadow: none;
}
.el-popper__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
  display: none;
}
</style>
