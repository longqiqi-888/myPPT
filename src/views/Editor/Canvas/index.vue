<template>
    <!-- 点击屏幕以外的区域触发 -->
    <div class="canvas" ref="canvasRef" @wheel="$event => handleMousewheelCanvas($event)"
        @mousedown="$event => handleClickBlankArea($event)" v-contextmenu="contextmenus"
        v-click-outside="removeEditorAreaFocus">
        <div class="viewport-wrapper" :style="{
                width: viewportStyles.width * canvasScale + 'px',
                height: viewportStyles.height * canvasScale + 'px',
                left: viewportStyles.left + 'px',
                top: viewportStyles.top + 'px',
            }">
  111
            <Operate :element-info="currentSlide"></Operate>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref,nextTick } from 'vue';
import   useViewportSize  from './hook/useViewportSize'
import { useMainStore } from '@/store/main';
import { useKeyboardStore } from '@/store/keyboard'
import { storeToRefs } from 'pinia'
import Operate from './Operate/index.vue'
import { useSlidesStore } from '@/store/slider';
const mainStore:any = useMainStore()
const slidesStore:any = useSlidesStore()
const {
    canvasScale,
    activeElementIdList,
    // handleElementId,
    // activeGroupElementId,
    // hiddenElementIdList,
} = storeToRefs(mainStore)
const { spaceKeyState }  = storeToRefs(useKeyboardStore())
const { currentSlide } = storeToRefs(slidesStore)
console.log(currentSlide,'11currentSlide')
const canvasRef = ref<HTMLElement>()
const { viewportStyles } :any = useViewportSize(canvasRef)
const handleMousewheelCanvas = () => {

}

// 组件渲染时，如果存在元素焦点，需要清除
// 这种情况存在于：有焦点元素的情况下进入了放映模式，再退出时，需要清除原先的焦点（因为可能已经切换了页面）
onMounted(() => {
  if (activeElementIdList.value.length) {
    nextTick(() => mainStore.setActiveElementIdList([]))
  }
})

// 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区、清空格式刷状态
const handleClickBlankArea = (e: MouseEvent) => {
  console.log(handleClickBlankArea, 'handleClickBlankArea')
  if (activeElementIdList.value.length) mainStore.setActiveElementIdList([])
  if (!spaceKeyState.value) updateMouseSelection(e)
  else dragViewport(e)

  if (!editorAreaFocus.value) mainStore.setEditorareaFocus(true)
  if (textFormatPainter.value) mainStore.setTextFormatPainter(null)
  removeAllRanges()
}

const removeEditorAreaFocus = () => {

}




</script>