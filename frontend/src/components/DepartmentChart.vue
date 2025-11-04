<template>
  <div class="dashboard-card department-chart">
    <h3 class="card-title">科室工作负荷分布</h3>
    <v-chart :option="chartOption" style="height: 280px;" autoresize />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

const chartOption = computed(() => {
  // 确保 departments 是数组
  const departments = Array.isArray(dataStore.departmentData) 
    ? dataStore.departmentData 
    : []
  
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(15, 30, 55, 0.95)',
      borderColor: 'rgba(42, 130, 228, 0.4)',
      borderWidth: 1,
      textStyle: {
        color: '#e6f7ff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: departments.map(d => d.name),
      axisLabel: {
        color: '#91d5ff',
        fontSize: 11,
        rotate: 25,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(42, 130, 228, 0.4)'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#91d5ff',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(42, 130, 228, 0.4)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(42, 130, 228, 0.2)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '工作负荷',
        type: 'bar',
        data: departments.map(d => d.workload),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00d4ff' },
              { offset: 1, color: '#1890ff' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          color: '#e6f7ff',
          fontSize: 11
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.department-chart {
  min-height: 360px;
}
</style>

