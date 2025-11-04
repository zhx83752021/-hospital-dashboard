<template>
  <div class="dashboard-card patient-trend">
    <h3 class="card-title">患者流量趋势</h3>
    <v-chart :option="chartOption" style="height: 300px;" autoresize />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

const chartOption = computed(() => {
  // 确保 trend 是数组
  const trend = Array.isArray(dataStore.patientTrend) 
    ? dataStore.patientTrend 
    : []
  
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 30, 55, 0.95)',
      borderColor: 'rgba(42, 130, 228, 0.4)',
      borderWidth: 1,
      textStyle: {
        color: '#e6f7ff'
      }
    },
    legend: {
      data: ['门诊', '急诊', '住院'],
      textStyle: {
        color: '#91d5ff',
        fontSize: 12
      },
      top: 0,
      itemWidth: 16,
      itemHeight: 10
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
      boundaryGap: false,
      data: trend.map(t => t.time),
      axisLabel: {
        color: '#91d5ff',
        fontSize: 11
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
        name: '门诊',
        type: 'line',
        smooth: true,
        data: trend.map(t => t.outpatient),
        lineStyle: {
          width: 2,
          color: '#00d4ff'
        },
        itemStyle: {
          color: '#00d4ff',
          borderWidth: 2,
          borderColor: 'rgba(12, 28, 58, 0.8)'
        },
        symbol: 'circle',
        symbolSize: 6,
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
      },
      {
        name: '急诊',
        type: 'line',
        smooth: true,
        data: trend.map(t => t.emergency),
        lineStyle: {
          width: 2,
          color: '#ff9843'
        },
        itemStyle: {
          color: '#ff9843',
          borderWidth: 2,
          borderColor: 'rgba(12, 28, 58, 0.8)'
        },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 152, 67, 0.3)' },
              { offset: 1, color: 'rgba(255, 152, 67, 0.05)' }
            ]
          }
        }
      },
      {
        name: '住院',
        type: 'line',
        smooth: true,
        data: trend.map(t => t.inpatient),
        lineStyle: {
          width: 2,
          color: '#13c2c2'
        },
        itemStyle: {
          color: '#13c2c2',
          borderWidth: 2,
          borderColor: 'rgba(12, 28, 58, 0.8)'
        },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(19, 194, 194, 0.3)' },
              { offset: 1, color: 'rgba(19, 194, 194, 0.05)' }
            ]
          }
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.patient-trend {
  min-height: 380px;
}
</style>

