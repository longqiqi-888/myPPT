import { slides } from "@/mocks/slides";
import { theme } from "@/mocks/theme";
import { defineStore } from "pinia";

export const useSlidesStore = defineStore('slides',{
    state:()=>({
        theme: theme, // 主题样式
        slides: slides, // 幻灯片页面数据
        slideIndex: 0, // 当前页面索引
        viewportRatio: 0.5625, // 可视区域比例，默认16:9
    }),
    getters:{
        currentSlide(state){
            return state.slides[state.slideIndex]
        }
    }
})