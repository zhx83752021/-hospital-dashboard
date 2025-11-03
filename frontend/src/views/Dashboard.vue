<template>
  <div class="dashboard-container">
    <!-- 顶部标题栏 -->
    <PageHeader title="医院运营指挥中心" />

    <!-- 主体内容 -->
    <div class="dashboard-content">
      <!-- 左侧列 -->
      <div class="left-column">
        <OperationStats />
        <DepartmentChart />
        <EquipmentStatus />
      </div>

      <!-- 中间列 -->
      <div class="center-column">
        <PatientTrend />
        <BedStatus />
        <RevenueChart />
      </div>

      <!-- 右侧列 -->
      <div class="right-column">
        <RealTimeAlerts />
        <ResourceMonitor />
        <PerformanceRanking />
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import OperationStats from '@/components/OperationStats.vue'
import DepartmentChart from '@/components/DepartmentChart.vue'
import EquipmentStatus from '@/components/EquipmentStatus.vue'
import PatientTrend from '@/components/PatientTrend.vue'
import BedStatus from '@/components/BedStatus.vue'
import RevenueChart from '@/components/RevenueChart.vue'
import RealTimeAlerts from '@/components/RealTimeAlerts.vue'
import ResourceMonitor from '@/components/ResourceMonitor.vue'
import PerformanceRanking from '@/components/PerformanceRanking.vue'
</script>

<style lang="scss" scoped>
// 定义图表配色变量 - 参照智慧工地监测云平台
.dashboard-container {
  // 主色调变量
  --bg-primary: #0a1429;
  --bg-secondary: rgba(10, 25, 50, 0.85);
  --bg-card: rgba(12, 28, 58, 0.8);
  
  // 边框颜色
  --border-primary: #1a5c9e;
  --border-light: rgba(42, 130, 228, 0.4);
  --border-glow: rgba(0, 212, 255, 0.6);
  
  // 图表配色
  --chart-orange: #ff9843;
  --chart-yellow: #ffc107;
  --chart-cyan: #00d4ff;
  --chart-blue: #1890ff;
  --chart-green: #13c2c2;
  --chart-teal: #1de9b6;
  
  // 文字颜色
  --text-primary: #e6f7ff;
  --text-secondary: #91d5ff;
  --text-highlight: #40a9ff;
  --text-warning: #faad14;
  
  width: 100vw;
  height: 100vh;
  padding: 1.2vh 0.5vw;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  box-sizing: border-box;
  background: url('@/assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}

.dashboard-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.7fr 1fr;
  gap: 1.2vw;
  overflow: hidden;
  min-height: 0;
  margin-top: 1vh;
  padding: 1.2vh 1.6vw;
}

.left-column,
.center-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  min-height: 0;
  padding-bottom:3vh;

  // 卡片样式 - 深色背景，无阴影，细边框
  > :deep(.dashboard-card) {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: none !important;
    padding: 2.5vh 1vw;
  }
}

// 左侧和右侧列使用 left-bg.png
.left-column,
.right-column {
  > :deep(.dashboard-card) {
    background: url('@/assets/images/left-bg.png') no-repeat center center;
    background-size: 100% 100%;
  }
}

// 中间列使用 left-bg.png
.center-column {
  > :deep(.dashboard-card) {
    background: url('@/assets/images/mid-bg.png') no-repeat center center;
    background-size: 100% 100%;
  }
}

// 全局卡片样式覆盖 - 去除所有阴影
:deep(.el-card), 
:deep(.ant-card), 
:deep(.v-card),
:deep(.card-panel) {
  box-shadow: none !important;
  border: none !important;
  background: url('@/assets/images/left-bg.png') no-repeat center center !important;
  background-size: cover !important;
}

// 图表标题样式
:deep(.card-title),
:deep(.panel-title) {
  color: var(--text-primary);
  font-size: clamp(13px, 1.1vw, 16px);
  font-weight: 500;
  padding-left:20px;
  margin-bottom: 0.5vh;
  margin-top:-15px;
}

// 字体全局设置
.dashboard-header, 
.dashboard-content {
  color: var(--text-primary);
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

// 数字/数值高亮样式
:deep(.number-highlight) {
  color: var(--chart-cyan);
  font-weight: bold;
  font-family: 'DIN Alternate', 'Arial', sans-serif;
}

// 状态颜色
:deep(.status-pending) { color: var(--chart-orange); }
:deep(.status-processing) { color: var(--chart-yellow); }
:deep(.status-completed) { color: var(--chart-cyan); }
:deep(.status-success) { color: var(--chart-green); }
</style>

