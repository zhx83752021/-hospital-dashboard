// 图表配色方案 - 参照智慧工地监测云平台
export const chartColors = {
  // 主要配色 - 用于环形图、柱状图等
  primary: ['#ff9843', '#ffc107', '#00d4ff', '#1890ff', '#13c2c2', '#1de9b6'],
  
  // 状态配色
  status: {
    pending: '#ff9843',      // 待处理 - 橙色
    processing: '#ffc107',   // 进行中 - 黄色
    completed: '#00d4ff',    // 已完成 - 青色
    success: '#13c2c2',      // 成功 - 青绿色
    warning: '#faad14',      // 警告 - 橙黄色
    error: '#ff4d4f'         // 错误 - 红色
  },
  
  // 渐变配色
  gradients: {
    orange: ['#ff9843', '#ff7043'],
    yellow: ['#ffc107', '#ffb300'],
    cyan: ['#00d4ff', '#0099ff'],
    blue: ['#1890ff', '#096dd9'],
    green: ['#13c2c2', '#08979c'],
    teal: ['#1de9b6', '#00bfa5']
  },
  
  // 背景色
  background: {
    primary: '#0a1429',
    secondary: 'rgba(10, 25, 50, 0.85)',
    card: 'rgba(12, 28, 58, 0.8)',
    tooltip: 'rgba(15, 30, 55, 0.95)'
  },
  
  // 边框色
  border: {
    primary: '#1a5c9e',
    light: 'rgba(42, 130, 228, 0.4)',
    glow: 'rgba(0, 212, 255, 0.6)'
  },
  
  // 文字颜色
  text: {
    primary: '#e6f7ff',
    secondary: '#91d5ff',
    highlight: '#40a9ff',
    warning: '#faad14',
    disabled: '#434343'
  }
}

// ECharts 通用配置
export const echartTheme = {
  color: chartColors.primary,
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Microsoft YaHei, PingFang SC, Arial, sans-serif',
    color: chartColors.text.primary
  },
  title: {
    textStyle: {
      color: chartColors.text.primary,
      fontSize: 16,
      fontWeight: 500
    }
  },
  legend: {
    textStyle: {
      color: chartColors.text.secondary,
      fontSize: 12
    },
    itemWidth: 16,
    itemHeight: 10
  },
  tooltip: {
    backgroundColor: chartColors.background.tooltip,
    borderColor: chartColors.border.light,
    borderWidth: 1,
    textStyle: {
      color: chartColors.text.primary,
      fontSize: 12
    }
  },
  grid: {
    borderColor: chartColors.border.light,
    containLabel: true,
    left: '3%',
    right: '4%',
    top: '10%',
    bottom: '3%'
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: chartColors.border.light
      }
    },
    axisLabel: {
      color: chartColors.text.secondary,
      fontSize: 11
    },
    splitLine: {
      lineStyle: {
        color: chartColors.border.light,
        type: 'dashed'
      }
    }
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: chartColors.border.light
      }
    },
    axisLabel: {
      color: chartColors.text.secondary,
      fontSize: 11
    },
    splitLine: {
      lineStyle: {
        color: chartColors.border.light,
        type: 'dashed'
      }
    }
  }
}

// 圆环图配置
export const pieChartConfig = {
  radius: ['55%', '75%'],
  avoidLabelOverlap: false,
  label: {
    show: false
  },
  labelLine: {
    show: false
  },
  itemStyle: {
    borderRadius: 4,
    borderColor: chartColors.background.card,
    borderWidth: 2
  },
  emphasis: {
    label: {
      show: true,
      fontSize: 14,
      fontWeight: 'bold',
      color: chartColors.text.primary
    },
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 212, 255, 0.5)'
    }
  }
}

// 柱状图配置
export const barChartConfig = {
  itemStyle: {
    borderRadius: [4, 4, 0, 0],
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
  },
  barWidth: '60%'
}

// 折线图配置
export const lineChartConfig = {
  smooth: true,
  lineStyle: {
    width: 2
  },
  showSymbol: true,
  symbol: 'circle',
  symbolSize: 6,
  itemStyle: {
    borderWidth: 2,
    borderColor: chartColors.background.card
  },
  areaStyle: {
    opacity: 0.2
  }
}

export default {
  chartColors,
  echartTheme,
  pieChartConfig,
  barChartConfig,
  lineChartConfig
}

