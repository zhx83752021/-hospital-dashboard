# 图表配色使用指南

本项目采用智慧大屏统一配色方案，参照智慧工地监测云平台的视觉风格。

## 颜色变量

### 在组件中使用 CSS 变量

```vue
<style scoped>
.my-component {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
}

.status-text {
  color: var(--chart-cyan);
}
</style>
```

### 在 JavaScript 中使用配色

```javascript
import { chartColors, echartTheme } from '@/styles/chart-colors'

// 使用预定义颜色
const colors = chartColors.primary // ['#ff9843', '#ffc107', '#00d4ff', ...]

// 使用状态颜色
const statusColor = chartColors.status.completed // '#00d4ff'
```

## ECharts 图表配色

### 圆环图示例

```javascript
import { chartColors, pieChartConfig, echartTheme } from '@/styles/chart-colors'

const option = {
  ...echartTheme,
  series: [{
    type: 'pie',
    ...pieChartConfig,
    data: [
      { value: 35, name: '进行中', itemStyle: { color: chartColors.status.processing } },
      { value: 50, name: '已完成', itemStyle: { color: chartColors.status.completed } },
      { value: 15, name: '待处理', itemStyle: { color: chartColors.status.pending } }
    ]
  }]
}
```

### 折线图示例

```javascript
import { chartColors, lineChartConfig, echartTheme } from '@/styles/chart-colors'

const option = {
  ...echartTheme,
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'line',
    ...lineChartConfig,
    data: [120, 132, 101, 134, 90],
    lineStyle: {
      color: chartColors.primary[2] // 使用青色
    },
    itemStyle: {
      color: chartColors.primary[2]
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
          { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
        ]
      }
    }
  }]
}
```

### 柱状图示例

```javascript
import { chartColors, barChartConfig, echartTheme } from '@/styles/chart-colors'

const option = {
  ...echartTheme,
  xAxis: {
    type: 'category',
    data: ['内科', '外科', '儿科', '妇产科']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'bar',
    ...barChartConfig,
    data: [120, 200, 150, 80],
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: chartColors.primary[2] },
          { offset: 1, color: chartColors.primary[3] }
        ]
      }
    }
  }]
}
```

## 配色方案

### 主色调
- **橙色** `#ff9843` - 用于待处理状态、警告信息
- **黄色** `#ffc107` - 用于进行中状态
- **青色** `#00d4ff` - 用于已完成状态、主要数据展示
- **蓝色** `#1890ff` - 用于次要数据、图表辅助色
- **青绿** `#13c2c2` - 用于成功状态
- **青蓝** `#1de9b6` - 用于特殊标记

### 背景色
- **主背景** `#0a1429` - 整体页面背景
- **卡片背景** `rgba(12, 28, 58, 0.8)` - 卡片、面板背景
- **提示框背景** `rgba(15, 30, 55, 0.95)` - Tooltip 背景

### 边框色
- **主边框** `#1a5c9e` - 卡片、容器边框
- **淡边框** `rgba(42, 130, 228, 0.4)` - 分隔线、辅助边框
- **发光边框** `rgba(0, 212, 255, 0.6)` - 高亮、悬停效果

### 文字颜色
- **主文字** `#e6f7ff` - 标题、重要文字
- **次文字** `#91d5ff` - 说明文字、辅助信息
- **高亮文字** `#40a9ff` - 强调文字、链接

## 注意事项

1. **去除阴影**：所有卡片和组件均不使用 `box-shadow`，保持扁平化设计
2. **边框优先**：使用细边框（1px）来区分区域，而不是阴影
3. **透明背景**：卡片背景使用半透明色，增强层次感
4. **统一圆角**：使用 8px 圆角，保持一致性
5. **颜色语义**：橙色=待处理，黄色=进行中，青色=已完成

## 组件示例

### 卡片组件

```vue
<template>
  <div class="dashboard-card">
    <h3 class="card-title">卡片标题</h3>
    <div class="card-content">
      内容区域
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: 16px;
  box-shadow: none !important;
}

.card-title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  padding-left: 12px;
  border-left: 3px solid var(--chart-cyan);
  margin-bottom: 12px;
}
</style>
```

### 状态标签

```vue
<template>
  <span :class="['status-tag', status]">{{ text }}</span>
</template>

<style scoped>
.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.pending {
  background: rgba(255, 152, 67, 0.2);
  color: var(--status-pending);
  border: 1px solid var(--status-pending);
}

.status-tag.completed {
  background: rgba(0, 212, 255, 0.2);
  color: var(--status-completed);
  border: 1px solid var(--status-completed);
}
</style>
```

