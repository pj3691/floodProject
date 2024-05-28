import CesiumViewe from './views/cesium-init/index'

declare global {
  interface Window {
    cesiumInstance: CesiumViewe
    sceneId: number
  }
}

// declare interface Window{
// 	cesiumInstances: CesiumViewer
// }
