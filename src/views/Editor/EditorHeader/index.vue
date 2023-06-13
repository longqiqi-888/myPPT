<template>
    <div class="editor-header">
        <div class="left">
            <Dropdown :trigger="['click']">
                <div class="menu-item"><span class="text">文件</span></div>
                <template #overlay>
                <Menu>
                  <FileInput accept="application/vnd.openxmlformats-officedocument.presentationml.presentation">
                    <MenuItem>导入 pptx 文件（demo）</MenuItem>
                  </FileInput>
                  <MenuItem>导出文件</MenuItem>
                </Menu>
                </template>
            </Dropdown>
        </div>

        <div class="right">
          <Tooltip :mouseLeaveDelay="0" title="导出">
            <div class="menu-item">导出</div>
          </Tooltip>
          <Tooltip :mouseLeaveDelay="0" title="幻灯片放映">
            <div class="menu-item" @click="">
              幻灯片放映
            </div>
          </Tooltip>
          <a href="https://github.com/pipipi-pikachu/PPTist" target="_blank">
            <div class="menu-item">github</div>
          </a>
        </div>
        <!-- 帮助的快捷键 -->
        <Drawer
          width="320"
          placement="right"
          :closable="false"
          >

        </Drawer>
        <!-- 导入显示 -->
        <FullscreenSpin></FullscreenSpin>
    </div>
</template>

<script setup lang="ts">

import {
  Dropdown,
  Menu,
  MenuItem,
  Tooltip,
  Drawer
} from 'ant-design-vue'
import FileInput from '@/components/FileInput.vue';
import FullscreenSpin from '@/components/FullscreenSpin.vue'
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.left, .right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;

  .text {
    margin-left: 4px;
  }
}

.left .menu-item:hover {
  background-color: #f9f9f9;
}
</style>