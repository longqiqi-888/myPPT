import { defineConfig } from 'vite'
import { resolve } from 'path'
// import { URL, fileURLToPath } from "node:url";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    // 设置别名
    alias:{
      // "@":fileURLToPath(new URL('./src',import.meta.url))
      '@': resolve(__dirname,'./src')
    }
  },
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss";',
        javascriptEnabled: true
      }
    }
  },
  server:{
    open:true
  }
  
})
