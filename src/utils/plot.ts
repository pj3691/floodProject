// import { pDrawArrow } from '@/utils/plot'
import { GraphManager } from 'cesium-plotting-symbol'

export function plotInstance(params: any) {
  const gm = new GraphManager(window.cesiumInstance.viewer, {
    layerId: 'testbh1',
    editAfterCreate: true
  })

  gm.create({ obj: params, color: '#00ff00' })
}
