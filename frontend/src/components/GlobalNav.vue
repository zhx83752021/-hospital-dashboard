<template>
  <div class="global-nav">
    <router-link to="/" class="nav-btn" :class="{ active: isActive('/') }">
      <span>首页</span>
    </router-link>
    <router-link to="/emergency" class="nav-btn" :class="{ active: isActive('/emergency') }">
      <span>急诊看板</span>
    </router-link>
    <router-link to="/outpatient" class="nav-btn" :class="{ active: isActive('/outpatient') }">
      <span>门诊大屏</span>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = (path) => {
  return computed(() => route.path === path)
}
</script>

<style lang="scss" scoped>
.global-nav {
  display: flex;
  gap: 1vw;
  
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6vh 1.5vw;
    background: url('@/assets/images/menu-bg.png') no-repeat center center;
    background-size: 100% 100%;
    border: none;
    border-radius: 6px;
    color: #36cfc9;
    text-decoration: none;
    font-size: clamp(12px, 1vw, 16px);
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      filter: none;
      transform: none;
      box-shadow: none;
    }

    &.active {
      filter: none;
      color: #fff;
      box-shadow: none;
    }
  }
}
</style>

