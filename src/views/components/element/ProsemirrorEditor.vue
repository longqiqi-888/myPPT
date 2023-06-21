<template>
    <div class="prosemirror-editor"  ref="editorViewRef">

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {initProsemirrorEditor} from '../../../utils/prosemirror/index'
const props = defineProps({
  elementId: {
    type: String,
  },
  defaultColor: {
    type: String,
  },
  defaultFontName: {
    type: String,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
})
const textContent = computed(()=> props.value)
const editorViewRef = ref<HTMLElement>()
console.log(props,'ProsemirrorEditor接收的组件')
// Prosemirror编辑器的初始化和卸载
// 第三个参数快捷键操作
onMounted(()=>{
    initProsemirrorEditor((editorViewRef.value as Element),(textContent.value as string))
   
})


</script>

<style lang="scss" scoped></style>