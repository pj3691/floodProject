// import { pDrawArrow } from '@/utils/plot'
import { GraphManager } from 'cesium-plotting-symbol'

let gm = new GraphManager(window.cesiumInstance.viewer, {
  layerId: 'testbh1',
  editAfterCreate: true
})
gm.create({ obj: 'Polygon', color: '#00FF00' })
