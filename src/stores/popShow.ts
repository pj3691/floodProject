import { defineStore } from "pinia"
import { ref } from "vue";
export const usePopShowStore = defineStore("popShow", {
	state: () => ({
		scenarioShow: false, // 想定场景列表显示控制
		sceneFormShow: ref(false), // 模拟场景创建弹窗控制
		sceneResultShow: false, // 模拟场景结果弹窗控制
		infoShow: false // 弹窗信息显示窗口
	}),
	getters: {},
	actions: {
		scenarioControl(val?: boolean) {
			this.scenarioShow = val ?? !this.scenarioShow
		},
		sceneFormControl(val?: boolean) {
			this.sceneFormShow = true
		},
		sceneResultControl(val?: boolean) {
			this.sceneResultShow = val ?? !this.sceneResultShow
		}
	}
})
