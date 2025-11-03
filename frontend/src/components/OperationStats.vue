<template>
  <div class="dashboard-card operation-stats">
    <h3 class="card-title">实时运营数据</h3>
    <div class="stats-container">
      <transition name="slide">
        <div class="stats-grid" :key="currentPage">
          <div class="stat-item" v-for="stat in displayedStats" :key="stat.key">
            <div class="stat-icon" :style="{ background: stat.color }">
              {{ stat.icon }}
            </div>
            <div class="stat-info">
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-value">
                {{ stat.value }}
                <span class="stat-unit">{{ stat.unit }}</span>
              </div>
              <div class="stat-trend" :class="stat.trend > 0 ? 'up' : 'down'">
                <span class="trend-icon">{{ stat.trend > 0 ? '↑' : '↓' }}</span>
                {{ Math.abs(stat.trend) }}%
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="pagination-dots">
        <span 
          v-for="page in totalPages" 
          :key="page" 
          class="dot" 
          :class="{ active: currentPage === page - 1 }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

// 分页相关
const currentPage = ref(0)
const itemsPerPage = 4
let autoPlayTimer = null

const stats = computed(() => {
  const data = dataStore.operationData
  return [
    {
      key: 'outpatient',
      label: '门诊人次',
      value: data.outpatientCount || 262,
      unit: '人',
      icon: '🏥',
      color: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
      trend: 12.5
    },
    {
      key: 'emergency',
      label: '急诊人次',
      value: data.emergencyCount || 149,
      unit: '人',
      icon: '🚑',
      color: 'linear-gradient(135deg, #ff9843 0%, #ff7043 100%)',
      trend: 8.3
    },
    {
      key: 'inpatient',
      label: '住院人数',
      value: data.inpatientCount || 458,
      unit: '人',
      icon: '🛏️',
      color: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      trend: -2.1
    },
    {
      key: 'surgery',
      label: '手术台次',
      value: data.surgeryCount || 23,
      unit: '台',
      icon: '⚕️',
      color: 'linear-gradient(135deg, #13c2c2 0%, #08979c 100%)',
      trend: 15.7
    },
    {
      key: 'bed',
      label: '床位使用率',
      value: data.bedUsageRate || 87.5,
      unit: '%',
      icon: '🏨',
      color: 'linear-gradient(135deg, #1de9b6 0%, #00bfa5 100%)',
      trend: 3.2
    },
    {
      key: 'revenue',
      label: '今日收入',
      value: (data.revenue / 10000).toFixed(1) || '128.6',
      unit: '万',
      icon: '💰',
      color: 'linear-gradient(135deg, #ffc107 0%, #ffb300 100%)',
      trend: 18.9
    },
    {
      key: 'medicine',
      label: '药品使用',
      value: data.medicineUsage || 1847,
      unit: '次',
      icon: '💊',
      color: 'linear-gradient(135deg, #ff9843 0%, #ff7043 100%)',
      trend: 6.4
    },
    {
      key: 'equipment',
      label: '设备运行率',
      value: data.equipmentRate || 92.3,
      unit: '%',
      icon: '🔬',
      color: 'linear-gradient(135deg, #00d4ff 0%, #13c2c2 100%)',
      trend: -1.5
    }
  ]
})

// 总页数
const totalPages = computed(() => Math.ceil(stats.value.length / itemsPerPage))

// 当前显示的数据
const displayedStats = computed(() => {
  const start = currentPage.value * itemsPerPage
  const end = start + itemsPerPage
  return stats.value.slice(start, end)
})

// 自动轮播
const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    currentPage.value = (currentPage.value + 1) % totalPages.value
  }, 5000) // 每5秒切换
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style lang="scss" scoped>
.operation-stats {
  .stats-container {
    position: relative;
    overflow: hidden;
    min-height: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(8px, 1vh, 16px) clamp(8px, 1vw, 16px);
    min-height: 100%;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: clamp(8px, 1vh, 12px) clamp(6px, 0.8vw, 10px);
    background: rgba(10, 25, 50, 0.6);
    border-radius: 8px;
    border: 1px solid var(--border-light, rgba(42, 130, 228, 0.4));
    transition: all 0.3s ease;
    text-align: center;
    min-height: 0;
    overflow: hidden;
    box-shadow: none;

    &:hover {
      background: rgba(10, 25, 50, 0.8);
      border-color: var(--border-glow, rgba(0, 212, 255, 0.6));
      transform: translateY(-2px);
    }

    .stat-icon {
      width: clamp(35px, 3.5vw, 48px);
      height: clamp(35px, 3.5vw, 48px);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(18px, 1.8vw, 26px);
      flex-shrink: 0;
      margin-bottom: clamp(4px, 0.6vh, 8px);
      box-shadow: none;
    }

    .stat-info {
      width: 100%;
      overflow: hidden;

      .stat-label {
        font-size: clamp(10px, 0.85vw, 13px);
        color: var(--text-secondary, #91d5ff);
        margin-bottom: clamp(3px, 0.4vh, 6px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .stat-value {
        font-size: clamp(18px, 1.8vw, 28px);
        font-weight: bold;
        color: var(--chart-cyan, #00d4ff);
        line-height: 1.2;
        margin-bottom: clamp(3px, 0.4vh, 5px);
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'DIN Alternate', 'Arial', monospace;

        .stat-unit {
          font-size: clamp(10px, 0.85vw, 13px);
          font-weight: normal;
          color: var(--text-secondary, #91d5ff);
          margin-left: 2px;
        }
      }

      .stat-trend {
        font-size: clamp(9px, 0.75vw, 11px);
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;

        .trend-icon {
          font-size: clamp(10px, 0.85vw, 12px);
        }

        &.up {
          color: var(--chart-green, #13c2c2);
        }

        &.down {
          color: var(--chart-orange, #ff9843);
        }
      }
    }
  }

  // 分页指示器
  .pagination-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0; // 移除内联元素基线影响
    gap: 6px;
    margin-top: clamp(8px, 1vh, 12px);

    .dot {
      display: block; // 使用块级保证垂直尺寸稳定
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        width: 20px;
        height: 6px;
        border-radius: 3px;
        background: var(--chart-cyan, #00d4ff);
      }
    }
  }
}

// 切换动画（仅过渡 transform/opacity，避免布局抖动）
.slide-enter-active,
.slide-leave-active {
  position: absolute; // 叠放避免相互挤压引发布局变化
  left: 0;
  right: 0;
  width: 100%;
  transition: transform 0.45s ease, opacity 0.45s ease;
  will-change: transform, opacity;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0%);
}

.slide-leave-from {
  opacity: 1;
  transform: translateX(0%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

