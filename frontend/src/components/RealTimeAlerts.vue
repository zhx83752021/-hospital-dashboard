<template>
  <div class="dashboard-card realtime-alerts">
    <h3 class="card-title">实时消息预警</h3>
    <div class="alerts-list">
      <div 
        class="alert-item fade-in" 
        v-for="(alert, index) in displayAlerts" 
        :key="index"
        :class="alert.level"
      >
        <div class="alert-icon">{{ getAlertIcon(alert.level) }}</div>
        <div class="alert-content">
          <div class="alert-title">{{ alert.title }}</div>
          <div class="alert-time">{{ alert.time }}</div>
        </div>
      </div>
      <div v-if="displayAlerts.length === 0" class="no-alerts">
        暂无预警消息
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/data'
import dayjs from 'dayjs'

const dataStore = useDataStore()

const displayAlerts = computed(() => {
  return dataStore.realtimeMessages.slice(0, 8).map(msg => ({
    ...msg,
    time: dayjs(msg.timestamp).format('HH:mm:ss')
  }))
})

const getAlertIcon = (level) => {
  const icons = {
    danger: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
    success: '✅'
  }
  return icons[level] || 'ℹ️'
}
</script>

<style lang="scss" scoped>
.realtime-alerts {
  min-height: 380px;

  .alerts-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 320px;
    overflow-y: auto;
  }

  .alert-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 6px;
    border-left: 3px solid;
    transition: all 0.3s ease;

    &.danger {
      background: rgba(245, 34, 45, 0.1);
      border-color: #f5222d;
    }

    &.warning {
      background: rgba(250, 173, 20, 0.1);
      border-color: #faad14;
    }

    &.info {
      background: rgba(24, 144, 255, 0.1);
      border-color: #1890ff;
    }

    &.success {
      background: rgba(82, 196, 26, 0.1);
      border-color: #52c41a;
    }

    &:hover {
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .alert-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .alert-content {
      flex: 1;

      .alert-title {
        font-size: 13px;
        color: #fff;
        margin-bottom: 4px;
      }

      .alert-time {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.55);
      }
    }
  }

  .no-alerts {
    text-align: center;
    padding: 40px 20px;
    color: rgba(255, 255, 255, 0.45);
    font-size: 14px;
  }
}
</style>

