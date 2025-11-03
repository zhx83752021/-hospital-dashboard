<template>
  <div class="dashboard-card equipment-status">
    <h3 class="card-title">医疗设备状态</h3>
    <div class="equipment-list">
      <div class="equipment-item" v-for="item in displayEquipment" :key="item.id">
        <div class="equipment-icon" :style="{ background: item.iconBg }">
          {{ item.icon }}
        </div>
        <div class="equipment-info">
          <div class="equipment-name">{{ item.name }}</div>
          <div class="equipment-location">📍 {{ item.location }}</div>
        </div>
        <div class="equipment-status">
          <span class="status-badge" :class="item.status">
            {{ getStatusText(item.status) }}
          </span>
          <div class="usage-rate">使用率: {{ item.usageRate }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

// 默认模拟数据
const defaultEquipment = [
  { 
    id: 1, 
    name: 'CT扫描仪-1', 
    location: '影像科1楼',
    status: 'success',
    usageRate: 92,
    icon: '🔬',
    iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    id: 2, 
    name: 'MRI核磁共振', 
    location: '影像科2楼',
    status: 'success',
    usageRate: 66,
    icon: '🏥',
    iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  { 
    id: 3, 
    name: 'X光机-A', 
    location: '放射科',
    status: 'danger',
    usageRate: 0,
    icon: '📡',
    iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  { 
    id: 4, 
    name: '超声诊断仪-3', 
    location: 'B超室',
    status: 'success',
    usageRate: 78,
    icon: '🔊',
    iconBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  { 
    id: 5, 
    name: '心电图机-2', 
    location: '心内科',
    status: 'success',
    usageRate: 85,
    icon: '💓',
    iconBg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  { 
    id: 6, 
    name: '呼吸机-5', 
    location: 'ICU',
    status: 'success',
    usageRate: 94,
    icon: '🫁',
    iconBg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  { 
    id: 7, 
    name: '血液透析机', 
    location: '透析室',
    status: 'success',
    usageRate: 72,
    icon: '💉',
    iconBg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  { 
    id: 8, 
    name: '麻醉机-1', 
    location: '手术室',
    status: 'warning',
    usageRate: 88,
    icon: '⚕️',
    iconBg: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)'
  }
]

const displayEquipment = computed(() => {
  const data = dataStore.equipmentData
  const equipmentList = (data && data.length > 0) ? data : defaultEquipment
  // 显示所有8个设备
  return equipmentList.slice(0, 8)
})

const getStatusText = (status) => {
  const statusMap = {
    success: '✓ 正常',
    warning: '⚠ 维护',
    danger: '✗ 故障',
    info: '○ 空闲'
  }
  return statusMap[status] || '未知'
}
</script>

<style lang="scss" scoped>
.equipment-status {
  .equipment-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(6px, 0.8vh, 10px);
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    min-height: 0;
    padding-right: 0.3vw;
    
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(24, 144, 255, 0.3);
      border-radius: 2px;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(24, 144, 255, 0.5);
      }
    }
  }

  .equipment-item {
    display: flex;
    align-items: center;
    gap: clamp(6px, 0.8vw, 10px);
    padding: clamp(6px, 0.8vh, 10px) clamp(6px, 0.7vw, 10px);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    transition: all 0.3s ease;
    overflow: hidden;
    min-width: 0;
    min-height: clamp(42px, 5vh, 60px);

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .equipment-icon {
      width: clamp(28px, 2.5vw, 36px);
      height: clamp(28px, 2.5vw, 36px);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(14px, 1.2vw, 18px);
      flex-shrink: 0;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    .equipment-info {
      flex: 1;
      min-width: 0;
      overflow: hidden;

      .equipment-name {
        font-size: clamp(11px, 0.9vw, 13px);
        color: #fff;
        font-weight: 600;
        margin-bottom: clamp(2px, 0.3vh, 3px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .equipment-location {
        font-size: clamp(9px, 0.75vw, 11px);
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .equipment-status {
      text-align: right;
      flex-shrink: 0;
      min-width: 0;
      max-width: 35%;

      .status-badge {
        display: inline-block;
        padding: clamp(2px, 0.3vh, 4px) clamp(6px, 0.6vw, 8px);
        border-radius: 4px;
        font-size: clamp(9px, 0.75vw, 11px);
        font-weight: 600;
        white-space: nowrap;

        &.success {
          background: rgba(82, 196, 26, 0.2);
          color: #52c41a;
          border: 1px solid rgba(82, 196, 26, 0.4);
        }

        &.warning {
          background: rgba(250, 173, 20, 0.2);
          color: #faad14;
          border: 1px solid rgba(250, 173, 20, 0.4);
        }

        &.danger {
          background: rgba(245, 34, 45, 0.2);
          color: #f5222d;
          border: 1px solid rgba(245, 34, 45, 0.4);
          animation: blink 2s ease-in-out infinite;
        }

        &.info {
          background: rgba(24, 144, 255, 0.2);
          color: #1890ff;
          border: 1px solid rgba(24, 144, 255, 0.4);
        }
      }

      .usage-rate {
        font-size: clamp(8px, 0.7vw, 10px);
        color: rgba(255, 255, 255, 0.5);
        margin-top: clamp(2px, 0.3vh, 3px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>


