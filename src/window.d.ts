import CesiumViewe from "./views/cesiumInit/cesium-init"


declare global {
	interface Window {
		cesiumInstance: CesiumViewe,
		sceneId:number
	}
}

// declare interface Window{
// 	cesiumInstance: CesiumViewer
// }