<script setup lang="ts">
import router from '@/router'
// import { findFyMy, getOne } from '@/api/getSceneData'
import { onMounted, toRefs, ref } from 'vue'
import { scenesControlStore } from '@/stores'
import { create } from 'domain'
import axios from 'axios'
// import cesiumViewer from './cesium-view'

let btnShow = ref(true) //控制新建场景以及退出编辑按钮显示
const singledelWaring = ref(false) //删除提示弹窗显示
let startPage = 0 //起始页
let endPage = 0 //结束
let verPage = ref(8) //每页展示工程数量
let diagShow = ref(false) //新建工程弹窗
let sceneName = ref('') //页面名称
let sceneType = ref(0) //页面类型
let currentPage = ref(1) //现在所在页面的页数
let checkValue = new Array(50) //控制某个工程页面是否处于可编辑状态
let { sceneList, typeList } = toRefs(scenesControlStore()) //从store中取出模板列表
const { addScene } = scenesControlStore() //添加工程到sceneControl的store中（）

// function getScene(data: any) {
//   findFyMy(data).then((res) => {
//     console.log(res.data)
//   })
//   // getOne(data)
// }

for (let index = 0; index < checkValue.length; index++) {
  checkValue[index] = ref(true)
}

function setId(params: number) {
  window.sceneId = params
}

//添加场景方法
const createScene = () => {
  addScene(sceneName.value, sceneType.value)
  diagShow.value = false
  sceneName.value = ''
}

//更新想在处于哪个页面
function updatPage(newpage: any) {
  currentPage.value = newpage
}

//更新每个页面展示工程数量
function updatSize(newsize: any) {
  verPage.value = newsize
}

//点击删除按钮时将点击场景的id传入index
let delId: number //需要删除的场景的id
function delSingle(sceneId: number) {
  delId = sceneId
}

//如果点击确定删除触发该方法
function delScene() {
  sceneList.value.forEach((item, index) => {
    if (item.id === delId) {
      sceneList.value.splice(index, 1)
    }
  })
}

// 编辑场景名称
function editIcon(index: number) {
  checkValue[index].value = false
}

// 完成场景名称编辑
function checkIcon(index: number) {
  checkValue[index].value = true
}

//
function editButtonClick(id: number) {
  router.push({
    path: '/sceneDetail',
    query: {
      id
    }
  })
  setId(id)
}
onMounted(() => {})
</script>

<template>
  <el-container>
    <el-header class="topMenu">
      <img src="/切图/菜单/头部 Copy 1@1x.png" alt="" class="topImg" />
      <div class="menuText">洪水模拟</div>
      <div>
        <el-button type="primary" @click="diagShow = true" class="btn-contain" v-show="btnShow"
          >新建场景</el-button
        >
        <el-button
          type="primary"
          style="left: 186px"
          @click="btnShow = true"
          class="btn-contain"
          v-show="!btnShow"
          >退出编辑</el-button
        >
      </div>
    </el-header>
    <el-main>
      <div class="leftcol"><img src="/切图/工程管理/left.png" alt="" class="leftcolimg" /></div>
      <div class="rightcol">
        <img src="/切图/工程管理/right.png" alt="" class="leftcolimg" />
      </div>
      <el-row :gutter="0">
        <el-col
          :span="5.9"
          v-for="(scene, index) in sceneList.slice(
            startPage + (currentPage - 1) * verPage,
            endPage + currentPage * verPage
          )"
          :key="scene.id"
          class="preCard"
        >
          <el-card :body-style="{ padding: '0px' }" class="preCard">
            <img src="/切图/工程管理/cardImg.png" alt="" class="cdbgimg" />
            <div class="projDiv" style="padding: 14px">
              <el-input
                v-model="scene.name"
                :readonly="checkValue[index].value"
                style="width: auto"
                maxlength="6"
                class="projName"
              ></el-input>
              <img v-if="scene.type === 0" src="/img/land.jpg" class="image" />
              <img v-else-if="scene.type === 1" src="/img/sea.jpg" class="image" />
              <img v-else-if="scene.type === 2" src="/img/sky.jpg" class="image" />
              <img v-else-if="scene.type === 3" src="/img/air.jpg" class="image" />
              <el-button
                @click="editIcon(index)"
                v-if="checkValue[index].value"
                class="editIcon"
              ></el-button>
              <el-button
                @click="checkIcon(index)"
                v-if="!checkValue[index].value"
                class="checkIcon"
              ></el-button>
              <el-button
                @click="(singledelWaring = true), delSingle(scene.id)"
                class="delIcon"
              ></el-button>
              <div class="bottom clearfix">
                <el-text class="infoTime"
                  ><span class="graySpan">创建时间：</span>{{ scene.createTime }}</el-text
                >
                <el-text class="infoPeople"> <span class="graySpan">创建人：</span>{{}}</el-text>
                <el-button type="text" class="button" @click="editButtonClick(scene.type)"
                  >进入编辑</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer
      style="
        background: linear-gradient(
          89.77deg,
          rgba(11, 17, 29, 1) 0.1%,
          rgba(6, 75, 130, 1) 51%,
          rgba(11, 17, 29, 1) 99.9%
        );
      "
    >
      <el-pagination
        background
        v-model="currentPage"
        :page-size="verPage"
        :current-page="currentPage"
        @update:page-size="updatSize"
        @update:current-page="updatPage"
        :page-sizes="[1, 2, 3, 4, 8]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sceneList.length"
      />
    </el-footer>
  </el-container>

  <el-dialog class="createScene" title="新建场景" v-model="diagShow" width="30%">
    <div class="line"></div>
    <div style="color: white">场景名称：</div>
    <el-input
      maxlength="30"
      v-model="sceneName"
      placeholder="请输入场景名称"
      style="margin-bottom: 5px"
    ></el-input>
    <div class="sceneSelect" style="color: white; margin-top: 5px">
      场景选择:
      <el-select v-model="sceneType" placeholder="请选择">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="diagShow = false">取 消</el-button>
        <el-button type="primary" @click="createScene()">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog title="提示" v-model="singledelWaring" width="30%">
    <div class="line"></div>
    <div class="msgBox">是否删除该场景？</div>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="singledelWaring = false">取 消</el-button>
        <el-button type="primary" @click="delScene(), (singledelWaring = false)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
.el-container .el-main .el-row {
  top: 76px;
}

.el-dialog {
  border-radius: 4px;
  background-color: rgba(5, 41, 82, 1);
  border: 1px solid rgba(48, 113, 221, 1);
}

.projName .el-input__inner {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
  width: 3%;
  margin-bottom: 17px;
  flex-grow: 1;
  -webkit-appearance: none;
  color: rgb(221, 34, 59);
  background-color: aqua;
  font-size: inherit;
  height: var(--el-input-inner-height);
  line-height: var(--el-input-inner-height);
  padding: 0;
  outline: 0;
  border: none;
  background: 0 0;
  font-family: 'cardFont';
  /* box-sizing: border-box; */
}

.projName .el-input__inner[readonly] {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
  width: 3%;
  margin-bottom: 17px;
  flex-grow: 1;
  -webkit-appearance: none;
  color: rgba(224, 239, 255, 1);
  font-size: inherit;
  height: var(--el-input-inner-height);
  line-height: var(--el-input-inner-height);
  padding: 0;
  outline: 0;
  border: none;
  background: 0 0;
  font-family: 'cardFont';
  /* box-sizing: border-box; */
}

.projName .el-input__wrapper {
  padding: 0;
  /* padding-top:10px;
        margin-left: 100px; */
}

.el-dialog__title {
  left: 542px;
  top: 398px;
  width: 72px;
  height: 25px;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: left;
  font-family: PingFangSC-bold;
}

.el-dialog {
  --el-dialog-width: 50%;
  --el-dialog-margin-top: 15vh;
  --el-dialog-bg-color: var(--el-bg-color);
  --el-dialog-box-shadow: var(--el-box-shadow);
  --el-dialog-title-font-size: var(--el-font-size-large);
  --el-dialog-content-font-size: 14px;
  --el-dialog-font-line-height: var(--el-font-line-height-primary);
  --el-dialog-padding-primary: 32px;
  --el-dialog-border-radius: var(--el-border-radius-small);
  position: relative;
  margin: var(--el-dialog-margin-top, 15vh) auto 50px;
  background: rgba(5, 41, 82, 1);
  border-radius: var(--el-dialog-border-radius);
  box-shadow: var(--el-dialog-box-shadow);
  box-sizing: border-box;
  padding: var(--el-dialog-padding-primary);
  width: var(--el-dialog-width, 50%);
  overflow-wrap: break-word;
}
</style>

<style scoped>
.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.msgBox[data-v-c4998c76] {
  width: 100%;
  height: 10%;
  top: 41%;
  /* position: absolute; */
  margin-top: 30px;
  margin-bottom: 80px;
  margin-left: 100px;
  color: rgba(219, 219, 219, 1);
  font-size: large;
}

.el-row {
  top: 7%;
  left: 10%;
  width: 90%;
}

.el-container {
  width: 100vw;
  height: 100vh;
}

.el-header {
  background-color: aqua;
  text-align: center;
}

.delDefine {
  height: 10%;
  width: 50%;
}

.topImg {
  position: relative;
  width: 100%;
  height: 150px;
}

/* .pagescroll{
        height: 100%;
    }


    .pagescroll .el-scrollbar__warp{
        overflow-x: hidden
    } */

.el-main::-webkit-scrollbar {
  display: none;
}

.editIcon {
  position: absolute;
  /* height: 0; */
  width: 18px;
  height: 18px;
  display: inline-flex;
  top: 3%;
  left: 82%;
  /* color: #fdfdfd; */
  background-image: url(/切图/工程管理/edit.png);
  background-color: transparent !important;
  border-width: 0;
  padding: 0;
}

.checkIcon {
  position: absolute;
  /* height: 0; */
  width: 18px;
  height: 18px;
  display: inline-flex;
  top: 3%;
  left: 82%;
  /* color: #fdfdfd; */
  background-color: transparent !important;
  border-width: 0;
  padding: 0;
  background-image: url(/切图/工程管理/check.png);
}

.delIcon {
  position: absolute;
  /* height: 0; */
  width: 18px;
  height: 18px;
  display: inline-flex;
  top: 3%;
  left: 86%;
  /* color: #fdfdfd; */
  background-image: url(/切图/工程管理/trash.png);
  background-color: transparent !important;
  border-width: 0;
  padding: 0;
}

.el-main {
  left: 0px;
  top: 0px;
  /* width: 1920px;
        height: 1080px; */
  background: linear-gradient(
    89.77deg,
    rgba(11, 17, 29, 1) 0.1%,
    rgba(6, 75, 130, 1) 51%,
    rgba(11, 17, 29, 1) 99.9%
  );
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.infoTime {
  margin: 0;
  padding: 0;
  font-size: var(--el-text-font-size);
  color: var(--el-text-color);
  word-break: break-all;
  position: absolute;
  height: 0;
  display: inline-flex;
  top: 61%;
  left: 21%;
  color: #fdfdfd;
}

.infoPeople {
  align-self: center;
  margin: 0;
  padding: 0;
  font-size: var(--el-text-font-size);
  color: var(--el-text-color);
  word-break: break-all;
  position: absolute;
  height: 0;
  display: inline-flex;
  top: 66%;
  left: 21%;
  color: #fdfdfd;
}

.graySpan {
  color: #bbb;
}

.button {
  left: 10%;
  top: 80%;
  width: 80%;
  /* height: 39px; */
  line-height: 23px;
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    rgba(147, 215, 255, 1) 0%,
    rgba(0, 120, 230, 1) 18%,
    rgba(18, 70, 111, 1) 85%,
    rgba(0, 107, 190, 1) 100%
  );
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  text-align: center;
  box-shadow: 2px 2px 10px 0px rgba(4, 20, 44, 1);
  font-family: 'cardFont';
  font-size: large;
  position: absolute;
}

.image {
  width: 100%;
  height: 286px;
  display: block;
  z-index: 0;
  /* left: 0px; */
  position: relative;
}

.el-col {
  margin: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.delCheck {
  position: absolute;
  top: 1%;
  left: 25px;
}

.btn-contain {
  position: absolute;
  left: 42px;
  top: 67px;
  width: 100px;
  height: 32px;
  border-width: 0;
  border-radius: 0;
  background-color: transparent !important;
  background-image: url(/切图/工程管理/divbutton.png);
}

.dialog-footer {
  margin-top: 5px;
}

.projDiv {
  position: relative;
  top: -419px;
}

.cdbgimg {
  position: relative;
  z-index: 0;
  height: 420px;
  width: 113%;
  left: -17px;
}

.projName {
  /* left: 288px; */
  top: 0;
  left: 33%;
  right: auto;
  height: 0;
  line-height: 39px;
  color: rgba(224, 239, 255, 1);
  font-size: 28px;
  text-align: 'center';
  position: relative;
  font-family: 'cardFont';
  /* pointer-events: none; */
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

.topMenu {
  left: -26px;
  top: 0.01px;
  text-align: center;
  /* width: 1920px;
        height: 209.29px; */
  background: linear-gradient(
    89.77deg,
    rgba(11, 17, 29, 1) 0.1%,
    rgba(6, 75, 130, 1) 51%,
    rgba(11, 17, 29, 1) 99.9%
  );
  background-color: rgba(229, 229, 229, 1);
  z-index: 0;
}

.preCard {
  left: 180px;
  top: 143px;
  width: 345px;
  height: 350px;
}

.leftcol {
  width: 0%;
  height: auto;
  top: 22%;
  left: -2.5%;
  position: absolute;
  /* background-image: url(/切图/工程管理/left.png);*/
}

.rightcol {
  width: 0%;
  height: auto;
  top: 22%;
  right: 6%;
  position: absolute;
  /* background-image: url(/切图/工程管理/left.png);*/
}

.createScene {
  border-radius: 4px;
  background-color: rgba(5, 41, 82, 1);
  border: 1px solid rgba(48, 113, 221, 1);
}

.line {
  width: 100%;
  height: 1px;
  background-color: rgba(48, 113, 221, 1);
  border-style: solid;
  margin: 0;
  border: 0;
  position: relative;
  top: -25px;
}
</style>
