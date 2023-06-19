<template>
    <div>
        <!-- 需把moke的样式用svg渲染出来 渲染组件 -->
        <component :elementInfo="elementInfo" >
            
        </component>
    </div>

</template>

<script setup lang="ts">

const props = defineProps({
    elementInfo:{
        type:Object as any,
        default:{}
    }

})

console.log(props.elementInfo,'props获取到elementInfo')

</script>
