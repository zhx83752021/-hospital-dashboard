<template>
  <div class="dashboard-card revenue-chart">
    <h3 class="card-title">收入统计分析</h3>
    <v-chart :option="chartOption" style="height: 280px;" autoresize />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟近7天收入数据
const revenueData = ref([
  { date: '周一', revenue: 85.6, target: 80 },
  { date: '周二', revenue: 92.3, target: 80 },
  { date: '周三', revenue: 78.5, target: 80 },
  { date: '周四', revenue: 105.2, target: 80 },
  { date: '周五', revenue: 98.7, target: 80 },
  { date: '周六', revenue: 112.4, target: 80 },
  { date: '周日', revenue: 95.8, target: 80 }
])

const chartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#1890ff',
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    data: ['实际收入', '目标收入'],
    textStyle: {
      color: '#fff'
    },
    top: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: revenueData.value.map(d => d.date),
    axisLabel: {
      color: '#fff',
      fontSize: 11
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: '万元',
    nameTextStyle: {
      color: '#fff'
    },
    axisLabel: {
      color: '#fff',
      fontSize: 11
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  series: [
    {
      name: '实际收入',
      type: 'bar',
      data: revenueData.value.map(d => d.revenue),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#00d4ff' }, // 蓝青色顶部
            { offset: 1, color: '#1890ff' }  // 蓝色底部
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '50%'
    },
    {
      name: '目标收入',
      type: 'line',
      data: revenueData.value.map(d => d.target),
      itemStyle: {
        color: '#ffc107' // 依然采用黄橙色高亮
      },
      lineStyle: {
        width: 2,
        type: 'dashed'
      }
    }
  ]
}
</script>

<style lang="scss" scoped>
.revenue-chart {
  min-height: 360px;
}
</style>

