import { defineStore } from 'pinia'
import * as Cesium from 'cesium'
import { ref } from 'vue'

interface sceneInfo {
  id: number
  name: string
  createTime: string
  type: number
}
const secneDatas: Array<sceneInfo> = [
  {
    id: 0,
    name: '工程1',
    createTime: '2023-12-24',
    type: 0,
  },
  {
    id: 1,
    name: '工程2',
    createTime: '2023-12-25',
    type: 1,

  },
  {
    id: 2,
    name: '工程3',
    createTime: '2023-12-26',
    type: 2,
  },
  {
    id: 3,
    name: '工程4',
    createTime: '2023-12-27',
    type: 3,
  }
]
const sceneTypes: Array<any> = [
  {
    value: 0,
    label: '工程1'
  },
  {
    value: 1,
    label: '工程2'
  },
  {
    value: 2,
    label: '工程3'
  }
]

export const scenesControlStore = defineStore('scenesControl', {
  state: () => ({
    sceneList: secneDatas,
    typeList: sceneTypes
  }),
  getters: {},
  actions: {
    addScene(data: string, type: any) {
      const date = new Date()
      const year = date.getFullYear() // 获取当前年份，例如：2021
      const month = date.getMonth() + 1 // 获取当前月份，注意需要加1，例如：9
      const day = date.getDate() // 获取当前日期，例如：22
      const newScene = {
        name: data,
        createTime: `${year}-${month}-${day}`,
        type: type,
        scene: Cesium.Cartesian3.fromDegrees(120, 25, 2000),
        platForm: '../../public/gltf/GroundVehicle.glb'
      }
      this.sceneList.push(newScene)
    }
  }
})
