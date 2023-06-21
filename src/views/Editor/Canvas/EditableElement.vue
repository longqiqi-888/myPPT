<template>
    <div
        class="editable-element"
        ref="elementRef"
    >
    <component
    :is="currentElementComponent" 
    :elementInfo="elementInfo"
    ></component>

    </div>
</template>

<script setup lang="ts">
import { ElementTypes } from '@/types/slides';
import TextElement from '@/views/components/element/TextElement/index.vue'
import { computed } from 'vue';

const props =  defineProps({
    elementInfo:{
      type:Object
    }
})

const currentElementComponent = computed(()=>{
    const elementTypeMap:any = {
        [ElementTypes.TEXT]: TextElement,
    }
    return elementTypeMap[props.elementInfo?.type] || null
})

console.log(props.elementInfo,'EditableElement接收到的参数');


</script>

<style lang="scss" scoped></style>