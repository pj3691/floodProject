import CesiumViewe from "./views/cesiumInit/cesium-init"


declare global {
	interface Window {
		cesiumInstance: CesiumViewe
	}
}

// declare interface Window{
// 	cesiumInstance: CesiumViewer
// }