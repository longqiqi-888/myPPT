import { defineStore } from "pinia";


export const useMainStore = defineStore('main', {
    state: () => ({
        canvasPercentage: 90, // 画布可视区域百分比
        canvasScale: 1, // 画布缩放比例（基于宽度1000px）
        canvasDragged: false, // 画布被拖拽移动
    }),
    actions: {
        setCanvasScale(scale: number) {
            this.canvasScale = scale
        },
        setCanvasDragged(isDragged:boolean){
            this.canvasDragged = isDragged
        }
    }
})