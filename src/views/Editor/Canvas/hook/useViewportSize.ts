import { Ref, computed, onMounted, onUnmounted, ref, watch } from "vue"
import { storeToRefs } from 'pinia'
import { VIEWPORT_SIZE } from '@/configs/canvas'
import { useMainStore } from '@/store/main'
import { useSlidesStore } from "@/store/slider"




export default (canvasRef: Ref<HTMLElement | undefined>) => {
  const viewportLeft = ref(0)
  const viewportTop = ref(0)

  const { viewportRatio } = storeToRefs(useSlidesStore())
  const mainStore = useMainStore()
  const { canvasPercentage, canvasDragged } = storeToRefs(mainStore)




  // 初始化画布位置
  const initViewportPosition = () => {
    if (!canvasRef.value) return
    // offset:元素本身距离浏览器的距离/元素本身的宽高（包括边框）
    // client：元素本身的宽高（不包括边框）
    // scroll：隐藏内容区域的距离/可滚动的区域（包括隐藏的）
    const canvasWidth = canvasRef.value.clientWidth
    const canvasHeight = canvasRef.value.clientHeight
    // console.log(canvasWidth, 'canvasWidth', canvasHeight, 'canvasHeight')
    console.log(canvasHeight / canvasWidth, viewportRatio.value)
    // 元素的高/元素的宽  默认可视比例
    // 大于16:9 宽变小  9（大）/16（小）  高
    if (canvasHeight / canvasWidth > viewportRatio.value) {

      // 元素的宽 = 宽 * 可视区域百分比
      const viewportActualWidth = canvasWidth * (canvasPercentage.value / 100)
      //    缩放比例
      mainStore.setCanvasScale(viewportActualWidth / VIEWPORT_SIZE)
      viewportLeft.value = (canvasWidth - viewportActualWidth) / 2
      //   宽 * 可视化比例 = 高
      viewportTop.value = (canvasHeight - viewportActualWidth * viewportRatio.value) / 2
    }
    // 小于16:9 高变小
    else {
      // 9（小）/16（大） 宽
      const viewportActualHeight = canvasHeight * (canvasPercentage.value / 100)
      //   宽 / 默认宽 * 可视区域比例
      mainStore.setCanvasScale(viewportActualHeight / (VIEWPORT_SIZE * viewportRatio.value))
      //   原本宽 - 元素高 / 可视比例 
      viewportLeft.value = (canvasWidth - viewportActualHeight / viewportRatio.value) / 2
      //   
      viewportTop.value = (canvasHeight - viewportActualHeight) / 2
    }
  }

  // 更新画布可视区域的位置
  // watch
  const setViewportPosition = (newValue: number, oldValue: number) => {
    if (!canvasRef.value) return
    const canvasWidth = canvasRef.value.clientWidth
    const canvasHeight = canvasRef.value.clientHeight

    const newViewportActualWidth = canvasWidth * (newValue / 100)
    const oldViewportActualWidth = canvasWidth * (oldValue / 100)
    const newViewportActualHeight = canvasHeight * (newValue / 100)
    const oldViewportActualHeight = canvasHeight * (oldValue / 100)

    if (canvasHeight / canvasWidth > viewportRatio.value) {
      mainStore.setCanvasScale(newViewportActualWidth / VIEWPORT_SIZE)
    }
    else {
      mainStore.setCanvasScale(newViewportActualHeight / (VIEWPORT_SIZE * viewportRatio.value))
    }
    viewportLeft.value = viewportLeft.value - (newViewportActualWidth - oldViewportActualWidth) / 2
    viewportTop.value = viewportTop.value - (newViewportActualHeight - oldViewportActualHeight) / 2
  }

  // 可视区域缩放或比例变化时，重置/更新可视区域的位置
  watch(canvasPercentage, setViewportPosition)
  watch(viewportRatio, initViewportPosition)

  // 画布拖拽状态改变（复原）时，重置可视区域的位置
  watch(canvasDragged, () => {
    if (!canvasDragged.value) initViewportPosition()
  })


  // 画布可视区域位置和大小的样式
  const viewportStyles = computed(() => ({
    // 宽
    width: VIEWPORT_SIZE,
    height: VIEWPORT_SIZE * viewportRatio.value,
    left: viewportLeft.value,
    top: viewportTop.value
  }))

  // 监听画布尺寸发生变化时，重置可视区域的位置
  // 监听元素内容区域的变化
  const resizeObserver = new ResizeObserver(initViewportPosition)

  onMounted(() => {
    if (canvasRef.value) resizeObserver.observe(canvasRef.value)
  })
  onUnmounted(() => {
    if (canvasRef.value) resizeObserver.unobserve(canvasRef.value)
  })

  // 拖拽画布
  const dragViewport = (e: MouseEvent) => {
    
    let isMouseDown = true

    const startPageX = e.pageX
    const startPageY = e.pageY

    const originLeft = viewportLeft.value
    const originTop = viewportTop.value
    console.log(startPageX, startPageY, '拖拽画布')
    document.onmousemove = e => {
      if (!isMouseDown) return

      const currentPageX = e.pageX
      const currentPageY = e.pageY

      viewportLeft.value = originLeft + (currentPageX - startPageX)
      viewportTop.value = originTop + (currentPageY - startPageY)
    }

    document.onmouseup = () => {
      isMouseDown = false
      document.onmousemove = null
      document.onmouseup = null

      mainStore.setCanvasDragged(true)
    }
  }

  return {
    viewportStyles,
    dragViewport,
  }


}