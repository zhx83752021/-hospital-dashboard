<template>
  <header class="dashboard-header">
    <div class="header-left">
      <GlobalNav />
    </div>
    <div class="header-center">
      <h1 class="title">{{ title }}</h1>
    </div>
    <div class="header-right">
      <div class="datetime">{{ currentTime }}</div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import GlobalNav from '@/components/GlobalNav.vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const currentTime = ref('')
let timer = null

const updateTime = () => {
  currentTime.value = dayjs().format('YYYY年MM月DD日 HH:mm')
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5vh 2vw;
  background: transparent;
  border: none;
  border-radius: 8px;
  backdrop-filter: none;
  flex-shrink: 0;
  box-shadow: none;

  .header-left {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    margin-top: 0.5vh;
  }
  
  .header-center {
    display: flex;
    justify-content: center;
    margin-right: 200px;
    flex: 1;
    
    .title {
      font-size: clamp(22px, 2.2vw, 38px);
      font-weight: bold;
      color: #ffffff;
      white-space: nowrap;
      letter-spacing: 2px;
      margin-top:-10px;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    margin-top: 1.4vh;
    
    .datetime {
      font-size: clamp(14px, 1.3vw, 20px);
      color: var(--text-secondary);
      font-weight: 400;
      white-space: nowrap;
    }
  }
}
</style>

