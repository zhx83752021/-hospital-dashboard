<template>
  <div id="app" class="hospital-dashboard">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

onMounted(() => {
  // 初始化数据连接
  dataStore.initWebSocket()
  dataStore.fetchAllData()
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Microsoft YaHei', 'Arial', sans-serif;
}

.hospital-dashboard {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #0a1429 0%, #0d1b3a 100%);
  color: var(--text-primary, #e6f7ff);
}
</style>

