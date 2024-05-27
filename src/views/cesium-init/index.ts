// import mitt from "@/plugins/mitt"
import * as Cesium from 'cesium'
// import CesiumNavigation from "cesium-navigation-es6"
// import * as IsCesium from "is-cesium"
// import { addParticleEffect } from "./handler/particleEffect"

export default class cesiumViewer {
  viewer: Cesium.Viewer
  // plot!: IsCesium.Plot
  savePlot!: Cesium.CustomDataSource

  constructor(container: HTMLElement | string, options: Cesium.Viewer.ConstructorOptions = {}) {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNzQ3M2M5Ny0wZTdmLTRlZjMtYjcwMS1jNTk2YjIzNWQ1M2IiLCJpZCI6MTUxNzQ5LCJpYXQiOjE2ODk5MzQ1MzB9.RSC4XkZF8fpVK-L3GvrgAFuK4pqMW40ZIiYcTDlrm7s'

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      119.51,
      41.45,
      121.51,
      39.45
    ) // 修改相机默认初始范围

    this.viewer = new Cesium.Viewer(container, {
      shouldAnimate: true, //动画自动播放
      timeline: !true, // 时间滚动条控件
      animation: !true, // 控制场景动画的播放速度控件 左下角小控件
      baseLayerPicker: true, // 底图切换控件
      fullscreenButton: !true, // 全屏控件
      geocoder: false, // 地理位置查询定位控件
      homeButton: false, // 默认相机位置控件
      sceneModePicker: false, //是否显示3D/2D选择器
      sceneMode: Cesium.SceneMode.SCENE3D, //设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
      navigationHelpButton: false, // 默认的相机控制提示控件  右上角提示信息
      // geocoder:false,
      // homeButton:false,
      // sceneModePicker:false,
      // baseLayerPicker:false,
      // navigationHelpButton:false,
      // animation:false,
      // timeline:false,
      // fullscreenButton:false,
      // terrainProvider: Cesium.createWorldTerrain(), //初始化加载高程数据
      // selectionIndicator: true, //是否显示选取指示器组件
      // vrButton: true, // VR模式
      // scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存  开启后不能3D和2D切换
      infoBox: !true, //是否显示信息框
      // navigationInstructionsInitiallyVisible: true,
      // showRenderLoopErrors: false, //是否显示渲染错误
      orderIndependentTranslucency: true, //设置背景透明
      // msaaSamples: 4, // 多重采样抗锯齿（MSAA） 抗锯齿效果
      ...options
    })
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(110.2, 34.55, 3000000)
    })

    // 相关方法功能初始化
    this._initParam()
    // 粒子效果全局添加
    // addParticleEffect(this.viewer)
  }

  // 初始化一些参数配置
  protected _initParam() {
    const manager = new Cesium.PrimitiveCollection()
    manager.destroyPrimitives = false
    this.viewer.clock.multiplier = 1
    // 抗锯齿
    this.viewer.resolutionScale = window.devicePixelRatio
    this.viewer.scene.postProcessStages.fxaa.enabled = true
    // 地形深度检测
    this.viewer.scene.globe.depthTestAgainstTerrain = true
    // 取消双击追踪事件
    // this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 左键点击事件取消
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    )
    // 小房子按钮默认矫正窗口修改
    // this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
    // 	e.cancel = true
    // 	this.viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(120.51, 40.45, 500000) })
    // })
    // 罗盘插件
    // new CesiumNavigation(this.viewer, {
    // 	defaultResetView: Cesium.Camera.DEFAULT_VIEW_RECTANGLE,
    // 	enableCompass: true,
    // 	enableZoomControls: true,
    // 	enableDistanceLegend: true,
    // 	enableCompassOuterRing: true,
    // 	resetTooltip: "重置视图",
    // 	zoomInTooltip: "放大",
    // 	zoomOutTooltip: "缩小"
    // })
    // 绘制方法
    // this.plot = new IsCesium.Plot(this.viewer)
    // 存储绘制结果
    this.savePlot = new Cesium.CustomDataSource('savePlot')
    this.viewer.dataSources.add(this.savePlot)
    // 单击编辑Plot对象效果实现、查看单个信息实现
    // const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
    // handler.setInputAction((e: any) => {
    // 	// 多选编辑处理
    // 	const target = this.viewer.scene.drillPick(e.position).filter((item) => item?.id?.properties?.plotType)
    // 	if (target.length && target[0]?.id?.properties?.plotType) {
    // 		// 无状态可选择编辑
    // 		if (this.plot.state === "") {
    // 			this.plot.edit(target[0].id, (val) => {
    // 				// 广播编辑过的实体
    // 				mitt.emit("plotEdit", val)
    // 			})
    // 		}
    // 	}
    // 	// 点击显示信息处理 未选中就取消
    // 	const info = this.viewer.scene.drillPick(e.position).filter((item) => item?.id?.properties?.type)
    // 	if (info.length && info[0]?.id?.properties?.type) {
    // 		mitt.emit("entityInfo", info[0]?.id)
    // 	} else {
    // 		// 弹窗消失处理
    // 		mitt.emit("entityInfo", null)
    // 	}
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  // /**
  //  * 计算线段与圆球交点
  //  * @param start 开始点
  //  * @param end 结束点
  //  * @param center 圆球中心点
  //  * @param radii 圆球半径
  //  * @returns 有交集返回Cesium.Cartesian3[]，无交集返回undefined
  //  */
  // intersectionLineSegmentSphere(
  // 	start: Cesium.Cartesian3,
  // 	end: Cesium.Cartesian3,
  // 	center: Cesium.Cartesian3,
  // 	radii: number
  // ): Cesium.Cartesian3[] | undefined {
  // 	const normalization = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(end, start, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  // 	const dis = Cesium.IntersectionTests.lineSegmentSphere(start, end, new Cesium.BoundingSphere(center, radii))
  // 	if (dis) {
  // 		const nearV = Cesium.Cartesian3.multiplyByScalar(normalization, dis.start, new Cesium.Cartesian3())
  // 		const nP = Cesium.Cartesian3.add(start, nearV, new Cesium.Cartesian3())
  // 		const farV = Cesium.Cartesian3.multiplyByScalar(normalization, dis.stop, new Cesium.Cartesian3())
  // 		const fP = Cesium.Cartesian3.add(start, farV, new Cesium.Cartesian3())
  // 		return [nP, fP]
  // 	}
  // 	return dis
  // }
}

