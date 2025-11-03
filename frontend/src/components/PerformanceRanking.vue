<template>
  <div class="dashboard-card performance-ranking">
    <h3 class="card-title">科室绩效排名</h3>
    <v-chart :option="chartOption" style="height: 380px;" autoresize />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const rankings = [
  { department: '心血管内科', score: 98 },
  { department: '骨科', score: 95 },
  { department: '神经外科', score: 92 },
  { department: '消化内科', score: 89 },
  { department: '呼吸内科', score: 86 },
  { department: '泌尿外科', score: 84 },
  { department: '妇产科', score: 82 },
  { department: '儿科', score: 80 }
]

const chartOption = computed(() => {
  // 反转数据，让第一名显示在最上方
  const reversedData = [...rankings].reverse()
  
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      borderColor: '#1890ff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: (params) => {
        const data = params[0]
        return `${data.name}<br/>绩效分数: <strong>${data.value}</strong>`
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: reversedData.map(item => item.department),
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 12,
        fontWeight: 500
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '绩效分数',
        type: 'bar',
        data: reversedData.map((item, index) => ({
          value: item.score,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: getBarColor(rankings.length - 1 - index)
            },
            borderRadius: [0, 8, 8, 0]
          }
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 13,
          fontWeight: 'bold',
          formatter: '{c}',
          distance: 5
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(24, 144, 255, 0.5)'
          }
        }
      }
    ]
  }
})

// 根据排名返回不同的渐变色
const getBarColor = (index) => {
  const colors = [
    [
      { offset: 0, color: '#1890ff' },
      { offset: 1, color: '#36cfc9' }
    ],
    [
      { offset: 0, color: '#722ed1' },
      { offset: 1, color: '#b37feb' }
    ],
    [
      { offset: 0, color: '#eb2f96' },
      { offset: 1, color: '#f759ab' }
    ],
    [
      { offset: 0, color: '#13c2c2' },
      { offset: 1, color: '#5cdbd3' }
    ],
    [
      { offset: 0, color: '#52c41a' },
      { offset: 1, color: '#95de64' }
    ],
    [
      { offset: 0, color: '#fa8c16' },
      { offset: 1, color: '#ffc53d' }
    ],
    [
      { offset: 0, color: '#faad14' },
      { offset: 1, color: '#ffd666' }
    ],
    [
      { offset: 0, color: '#1890ff' },
      { offset: 1, color: '#69c0ff' }
    ]
  ]
  return colors[index % colors.length]
}
</script>

<style lang="scss" scoped>
.performance-ranking {
  min-height: 400px;
}
</style>

