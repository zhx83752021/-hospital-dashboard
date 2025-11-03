<template>
  <div class="dashboard-card bed-status">
    <h3 class="card-title">床位使用情况</h3>
    
    <!-- 左右布局 -->
    <div class="bed-container">
      <!-- 左侧：床位统计（移除环形图） -->
      <div class="bed-left-section">
        <div class="bed-stats-vertical">
          <div class="bed-stat-item">
            <div class="label">总床位</div>
            <div class="value">{{ bedData.total }}</div>
          </div>
          <div class="bed-stat-item">
            <div class="label">已占用</div>
            <div class="value occupied">{{ bedData.occupied }}</div>
          </div>
          <div class="bed-stat-item">
            <div class="label">可用床位</div>
            <div class="value available">{{ bedData.available }}</div>
          </div>
          <div class="bed-stat-item">
            <div class="label">使用率</div>
            <div class="value rate">{{ bedData.rate }}%</div>
          </div>
        </div>
      </div>
      
      <!-- 右侧：科室床位分布 -->
      <div class="bed-right-section">
        <div class="department-beds">
          <div class="dept-bed-item" v-for="dept in departmentBeds" :key="dept.name">
            <div class="dept-info">
              <span class="dept-name">{{ dept.name }}</span>
              <span class="dept-rate">{{ dept.rate }}%</span>
            </div>
            <div class="dept-progress-bar">
              <div 
                class="dept-progress-fill" 
                :style="{ 
                  width: dept.rate + '%',
                  background: getProgressColor(dept.rate)
                }"
              ></div>
            </div>
            <div class="dept-count">
              <span class="occupied">{{ dept.occupied }}</span> / {{ dept.total }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

const bedData = computed(() => dataStore.bedData || {
  total: 800,
  occupied: 718,
  available: 82,
  rate: 90
})

// 科室床位分布数据
const departmentBeds = ref([
  { name: '内科', total: 180, occupied: 162, rate: 90 },
  { name: '外科', total: 150, occupied: 135, rate: 90 },
  { name: 'ICU', total: 50, occupied: 46, rate: 92 },
  { name: '妇产科', total: 120, occupied: 102, rate: 85 },
  { name: '儿科', total: 100, occupied: 88, rate: 88 },
  { name: '急诊科', total: 80, occupied: 72, rate: 90 }
])

// 根据占用率返回进度条颜色
const getProgressColor = (rate) => {
  if (rate >= 95) return 'linear-gradient(90deg, #ff9843 0%, #ff7043 100%)'
  if (rate >= 85) return 'linear-gradient(90deg, #ffc107 0%, #ffb300 100%)'
  if (rate >= 70) return 'linear-gradient(90deg, #00d4ff 0%, #1890ff 100%)'
  return 'linear-gradient(90deg, #13c2c2 0%, #08979c 100%)'
}

// 已移除环形图
</script>

<style lang="scss" scoped>
.bed-status {
  min-height: 320px;
  display: flex;
  flex-direction: column;

  .bed-container {
    display: flex;
    gap: 20px;
    align-items: stretch;
    flex: 1;

      .bed-left-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 240px;
      justify-content: center;

      .bed-stats-vertical {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        .bed-stat-item {
          background: rgba(10, 25, 50, 0.5);
          border-radius: 8px;
          border: 1px solid rgba(42, 130, 228, 0.22);
          padding: 10px 0 8px 14px;
          box-sizing: border-box;

          .label {
            color: var(--text-secondary, #91d5ff);
            margin-bottom: 3px;
            font-size: 11px;
          }

          .value {
            font-size: 20px;
            font-weight: bold;
            font-family: 'DIN Alternate', 'Arial', monospace;
            color: var(--text-primary, #e6f7ff);

            &.occupied {
              color: var(--chart-cyan, #00d4ff);
            }
            &.available {
              color: var(--chart-green, #13c2c2);
            }
            &.rate {
              color: var(--chart-yellow, #ffc107);
            }
          }
        }
      }
    }

    .bed-right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-left: 1px solid rgba(42, 130, 228, 0.2);
      padding-left: 20px;

      .department-beds {
        display: grid;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 4px;

        /* 自定义滚动条 */
        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
          background: var(--border-primary, #1a5c9e);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: var(--chart-cyan, #00d4ff);
        }

        .dept-bed-item {
          display: grid;
          grid-template-columns: 90px 1fr 70px;
          gap: 10px;
          align-items: center;
          padding: 6px 10px;
          background: rgba(10, 25, 50, 0.3);
          border-radius: 6px;
          border: 1px solid rgba(42, 130, 228, 0.2);
          transition: all 0.3s ease;

          &:hover {
            background: rgba(10, 25, 50, 0.5);
            border-color: rgba(0, 212, 255, 0.4);
          }

          .dept-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4px;

            .dept-name {
              font-size: 12px;
              color: var(--text-primary, #e6f7ff);
              font-weight: 500;
              white-space: nowrap;
            }

            .dept-rate {
              font-size: 11px;
              color: var(--chart-yellow, #ffc107);
              font-weight: bold;
              font-family: 'DIN Alternate', 'Arial', monospace;
            }
          }

          .dept-progress-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
            overflow: hidden;

            .dept-progress-fill {
              height: 100%;
              border-radius: 3px;
              transition: width 0.8s ease;
            }
          }

          .dept-count {
            font-size: 11px;
            color: var(--text-secondary, #91d5ff);
            text-align: right;
            font-family: 'DIN Alternate', 'Arial', monospace;
            white-space: nowrap;

            .occupied {
              color: var(--chart-cyan, #00d4ff);
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>

