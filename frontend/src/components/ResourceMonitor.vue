<template>
  <div class="dashboard-card resource-monitor">
    <h3 class="card-title">资源使用监控</h3>
    <div class="circle-grid">
      <div class="circle-item" v-for="(item, idx) in resources" :key="item.name">
        <div class="circle-wrapper">
          <svg class="circle-svg" viewBox="0 0 120 120">
            <circle
              class="circle-bg"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              stroke-width="10"
            />
            <circle
              class="circle-progress"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              :stroke="getCircleColor(idx)"
              stroke-width="10"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="getStrokeDashoffset(item.value)"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="60"
              text-anchor="middle"
              dominant-baseline="middle"
              class="circle-text"
              :fill="getCircleColor(idx)"
            >
              {{ item.value }}%
            </text>
          </svg>
        </div>
        <div class="circle-label" :style="{ color: getCircleColor(idx) }">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 圆环配色，依次：蓝、青绿、黄、橙
const ringColors = ['#00d4ff', '#13c2c2', '#ffc107', '#ff9843']

const resources = ref([
  { name: '手术室占用率', value: 78 },
  { name: '病房占用率', value: 85 },
  { name: '急诊床位占用率', value: 92 },
  { name: 'ICU占用率', value: 68 }
])

const radius = 50
const circumference = computed(() => 2 * Math.PI * radius)

const getStrokeDashoffset = (value) => {
  return circumference.value - (value / 100) * circumference.value
}
// 改为根据index返回配色
const getCircleColor = (index) => ringColors[index]
</script>

<style lang="scss" scoped>
.resource-monitor {
  min-height: 300px;
  display: flex;
  flex-direction: column;

  .circle-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(12px, 1.5vw, 20px);
    padding: clamp(8px, 1vh, 16px) 0;
    flex: 1;
    align-content: center;
  }

  .circle-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(8px, 1vh, 12px);

    .circle-wrapper {
      width: 100%;
      max-width: clamp(80px, 10vw, 120px);
      aspect-ratio: 1;

      .circle-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 2px 8px rgba(24, 144, 255, 0.3));

        .circle-bg {
          transition: all 0.3s ease;
        }

        .circle-progress {
          transition: stroke-dashoffset 0.8s ease, stroke 0.3s ease;
        }

        .circle-text {
          font-size: clamp(16px, 1.8vw, 24px);
        font-weight: bold;
          transition: fill 0.3s ease;
        }
      }
    }

    .circle-label {
      font-size: clamp(11px, 0.9vw, 14px);
      color: rgba(255, 255, 255, 0.85);
      text-align: center;
      font-weight: 500;
      white-space: nowrap;
    }

    &:hover {
      .circle-svg {
        filter: drop-shadow(0 4px 12px rgba(24, 144, 255, 0.5));
        transform: scale(1.05);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>

