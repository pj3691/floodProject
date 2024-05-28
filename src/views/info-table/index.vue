<script lang="ts" setup>
import { onMounted } from 'vue'
const data1 = ''
const data2 = [
  {
    index: 1,
    data: 123,
    label: 123
  },
  {
    index: 2,
    data: 123,
    label: 123
  },
  {
    index: 3,
    data: 123,
    label: 123
  }
]
</script>

<template>
  <div v-show="true" class="infoTable">
    <div class="demoModules">
      <!-- 头部 -->
      <div class="titleDemo">
        <div class="editImage" />
        <div class="titleFont">基本信息</div>
        <div class="fontXLine" />
      </div>
      <!-- 内容 -->
      <div class="centerFirst">
        <div class="messageLeft">
          <div class="fontName">场景名称</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" readonly />
        </div>
        <div class="messageright">
          <div class="fontName">步长</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" />
        </div>
      </div>
      <div class="centerFirst">
        <div class="messageLeft">
          <div class="fontName">场景名称</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" readonly />
        </div>
        <div class="messageright">
          <div class="fontName">步长</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" />
        </div>
      </div>
      <div class="centerFirst">
        <div class="messageLeft">
          <div class="fontName">场景名称</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" readonly />
        </div>
        <div class="messageright">
          <div class="fontName">步长</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" />
        </div>
      </div>
      <div class="centerFirst">
        <div class="messageLeft">
          <div class="fontName">场景名称</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" readonly />
        </div>
        <div class="messageright">
          <div class="fontName">步长</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" />
        </div>
      </div>
      <div class="centerFirst">
        <div class="messageLeft">
          <div class="fontName">场景名称</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" readonly />
        </div>
        <div class="messageright">
          <div class="fontName">步长</div>
          <el-input v-model="data1" placeholder="请输入" class="inputOne" />
        </div>
      </div>
      <!-- 底部 -->
      <div class="tableBottom" v-show="true">
        <el-button type="info" @click="">取消</el-button>
        <el-button type="primary" @click="">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.infoTable .el-table .cell {
  text-align: center !important;
  color: #6ac9ff;
  font-size: 0.6vw !important;
}
</style>

<style scoped lang="scss">
input {
  margin: 0 0px 0 0;
}
.tableBottom {
  float: right;
  padding-bottom: 10px;
  > :first-child {
    background-color: #071e3a;
  }
}
:deep(.el-input__wrapper) {
  background-color: #032c59;
  box-shadow: 0 0 0 0.05vw #4092f9 inset;
  width: 9.3vw;
  height: 2.7vh;
}
:deep(.el-input__inner) {
  color: white;
  font-size: 0.7vw;
}
:deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #032c59;
  box-shadow: 0 0 0 1px #4092f9 inset;
  opacity: 1;
}
:deep(.el-input.is-disabled .el-input__inner) {
  color: white;
}
.noClick {
  pointer-events: none;
}
.actionButton {
  margin-left: 0 !important;
  margin: 2px 0;
}
.inputOne {
  position: relative;
  top: 1.7vh;
  left: 0.5vw;
  margin-top: 0.2vh;
  margin-bottom: 0.8vh;
  margin-right: 0.5vw;
  width: 10vw;
}
.infoTable {
  position: relative;
  top: -69vh;
  left: 2.5vw;
  font-size: var(--vxe-font-size);
  color: var(--vxe-font-color);
  font-family: var(--vxe-font-family);
  direction: ltr;
  width: 35%;
  text-align: center;
  background: linear-gradient(180deg, rgba(0, 62, 102, 1) 0%, rgba(9, 43, 84, 1) 100%);
  border-radius: 4px;
  height: auto;
  max-height: 100%;
  border: 1px solid rgba(48, 113, 221, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 253, 255, 1);
  overflow-y: auto;
  opacity: 0.9;
  .demoModules {
    width: 95%;
    margin: 2% 2.5% 2% 2.5%;
    .titleDemo {
      width: 100%;
      height: 3.5vh;
      position: relative;
      .editImage {
        width: 1.2vw;
        height: 2.3vh;
        position: absolute;
        left: 0.8vw;
        background: url('@/assets/createSceneForm/editTo.png') no-repeat center center;
        background-size: contain;
      }
      .titleFont {
        opacity: 1;
        color: #ffffff;
        font-family: YouSheBiaoTiHei;
        font-size: 0.8vw;
        line-height: 1.5vh;
        letter-spacing: 0;
        text-align: left;
        position: absolute;
        left: 2.7vw;
        top: 0.5vh;
        font-style: italic; /* 设置字体为倾斜 */
        font-weight: bold; /* 设置字体为加粗 */
      }
      .fontXLine {
        width: 100%;
        height: 0.15vh;
        background-color: #6ac9ff;
        position: absolute;
        top: 3.1vh;
      }
    }
    .centerFirst {
      display: flex;
      width: 100%;
      height: 5vh;
      .fontName {
        width: 23%;
        position: relative;
        top: 2.5vh;
        line-height: 1.5vh;
        color: rgba(106, 201, 255, 1);
        font-size: 0.9vw;
        text-align: left;
        font-weight: bold; /* 设置字体为加粗 */
        font-family: SourceHanSansSC-bold;
      }
      .messageLeft {
        width: 50%;
        display: flex;
        text-align: left;
      }
      .messageright {
        width: 50%;
        display: flex;
        text-align: left;
      }
    }
    .centerSecond {
      margin-top: 1vh;
      text-align: center;
      .imgtable {
        width: 20px;
        height: 20px;
      }
      .imgtableFirst {
        background: url('@/assets/createSceneForm/renTo.png') no-repeat center center;
        background-size: contain;
        position: absolute;
        left: 40%;
        top: 27%;
      }
      .imgtableSecond {
        background: url('@/assets/createSceneForm/mubiaoTo.png') no-repeat center center;
        background-size: contain;
        position: absolute;
        left: 40%;
        top: 27%;
      }
      .imgtableADD {
        background: url('@/assets/createSceneForm/jiaTo.png') no-repeat center center;
        background-size: contain;
        position: absolute;
        right: 5%;
        top: 27%;
        cursor: pointer;
      }
      .buttonUIS {
        width: 100%;
        display: flex;
        .buttonUISFirst {
          width: 50%;
          font-size: 0.6vw;
          cursor: pointer;
          color: #00fdff;
          font-weight: bold; /* 设置字体为加粗 */
        }
        .buttonUISSecond {
          width: 50%;
          font-size: 0.6vw;
          cursor: pointer;
          color: #00fdff;
          font-weight: bold; /* 设置字体为加粗 */
        }
      }
    }
  }
}
.el-table {
  --el-table-border-color: #075ebe;
  --el-table-border: 0.05vw solid #075ebe;
  --el-table-text-color: rgba(255, 255, 255, 0.85);
  --el-table-header-text-color: rgba(255, 255, 255, 0.85);
  --el-table-row-hover-bg-color: transparent;
  --el-table-current-row-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-expanded-cell-bg-color: transparent;
  --el-table-fixed-left-column: inset 10px 0 10px -10px transparent;
}
//:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left) {
//  background-color: #0d142b !important;
//  //background-color: transparent;
//  border-right: 1px solid #e51a1a !important;
//}
:deep(.el-table__header-wrapper tr th.el-table-fixed-column--left) {
  border-right: 1px solid white !important;
}
:deep(.el-table .cell) {
  font-size: 13px;
}
</style>
