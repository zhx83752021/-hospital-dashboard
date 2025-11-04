import { defineStore } from 'pinia'
import { ref } from 'vue'
import { io } from 'socket.io-client'
import api from '@/api'

export const useDataStore = defineStore('data', () => {
  // 运营监控数据
  const operationData = ref({
    outpatientCount: 0,
    emergencyCount: 0,
    inpatientCount: 0,
    surgeryCount: 0,
    revenue: 0
  })

  // 床位数据
  const bedData = ref({
    total: 0,
    occupied: 0,
    available: 0,
    rate: 0
  })

  // 部门数据
  const departmentData = ref([])

  // 设备数据
  const equipmentData = ref([])

  // 患者流量趋势
  const patientTrend = ref([])

  // 实时消息
  const realtimeMessages = ref([])

  // WebSocket 连接
  let socket = null

  // 初始化 WebSocket
  const initWebSocket = () => {
    // 使用环境变量配置 WebSocket 地址，生产环境需要配置 VITE_WS_BASE_URL
    const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'http://localhost:3000'
    
    // 如果是在生产环境且没有配置 WS URL，跳过 WebSocket 连接
    if (import.meta.env.PROD && !import.meta.env.VITE_WS_BASE_URL) {
      console.warn('生产环境未配置 WebSocket 地址，跳过实时数据连接')
      return
    }
    
    try {
      socket = io(WS_BASE_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      })

      socket.on('connect', () => {
        console.log('WebSocket connected')
      })

      socket.on('realtime-update', (data) => {
        updateRealtimeData(data)
      })

      socket.on('disconnect', () => {
        console.log('WebSocket disconnected')
      })

      socket.on('connect_error', (error) => {
        console.warn('WebSocket connection error:', error.message)
      })
    } catch (error) {
      console.warn('WebSocket 初始化失败:', error)
    }
  }

  // 更新实时数据
  const updateRealtimeData = (data) => {
    if (data.type === 'operation') {
      operationData.value = { ...operationData.value, ...data.payload }
    } else if (data.type === 'bed') {
      bedData.value = { ...bedData.value, ...data.payload }
    } else if (data.type === 'message') {
      realtimeMessages.value.unshift(data.payload)
      if (realtimeMessages.value.length > 20) {
        realtimeMessages.value.pop()
      }
    }
  }

  // 生成模拟数据作为后备方案
  const generateMockData = () => {
    // 模拟运营数据
    operationData.value = {
      outpatientCount: 1250,
      emergencyCount: 180,
      inpatientCount: 320,
      surgeryCount: 45,
      revenue: 2850000
    }

    // 模拟床位数据
    bedData.value = {
      total: 500,
      occupied: 380,
      available: 120,
      rate: 76
    }

    // 模拟部门数据
    departmentData.value = [
      { name: '内科', workload: 85 },
      { name: '外科', workload: 92 },
      { name: '儿科', workload: 78 },
      { name: '妇产科', workload: 88 },
      { name: '骨科', workload: 75 },
      { name: '心内科', workload: 90 },
      { name: '神经科', workload: 82 },
      { name: '急诊科', workload: 95 }
    ]

    // 模拟设备数据
    equipmentData.value = [
      { id: 1, name: 'CT扫描仪-1', location: '影像科1楼', status: 'success', usageRate: 92 },
      { id: 2, name: 'MRI核磁共振', location: '影像科2楼', status: 'success', usageRate: 66 },
      { id: 3, name: 'X光机-A', location: '放射科', status: 'success', usageRate: 78 },
      { id: 4, name: '超声诊断仪-3', location: 'B超室', status: 'success', usageRate: 85 },
      { id: 5, name: '心电图机-2', location: '心内科', status: 'success', usageRate: 73 },
      { id: 6, name: '呼吸机-5', location: 'ICU', status: 'success', usageRate: 94 },
      { id: 7, name: '血液透析机', location: '透析室', status: 'success', usageRate: 72 },
      { id: 8, name: '麻醉机-1', location: '手术室', status: 'warning', usageRate: 88 }
    ]

    // 模拟患者流量趋势数据
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    patientTrend.value = hours.map(time => ({
      time,
      outpatient: Math.floor(Math.random() * 200) + 150,
      emergency: Math.floor(Math.random() * 50) + 20,
      inpatient: Math.floor(Math.random() * 100) + 250
    }))
  }

  // 获取所有数据
  const fetchAllData = async () => {
    try {
      const [operation, bed, department, equipment, trend] = await Promise.all([
        api.getOperationData().catch(() => null),
        api.getBedData().catch(() => null),
        api.getDepartmentData().catch(() => null),
        api.getEquipmentData().catch(() => null),
        api.getPatientTrend().catch(() => null)
      ])

      // 如果 API 调用成功，使用真实数据；否则使用模拟数据
      if (operation) operationData.value = operation
      if (bed) bedData.value = bed
      if (department && department.length > 0) departmentData.value = department
      if (equipment && equipment.length > 0) equipmentData.value = equipment
      if (trend && trend.length > 0) patientTrend.value = trend

      // 如果所有 API 都失败，使用模拟数据
      if (!operation && !bed && (!department || department.length === 0) && 
          (!equipment || equipment.length === 0) && (!trend || trend.length === 0)) {
        console.warn('API 连接失败，使用模拟数据')
        generateMockData()
      } else {
        // 部分数据缺失时，补充模拟数据
        if (!department || department.length === 0) {
          departmentData.value = [
            { name: '内科', workload: 85 },
            { name: '外科', workload: 92 },
            { name: '儿科', workload: 78 },
            { name: '妇产科', workload: 88 },
            { name: '骨科', workload: 75 },
            { name: '心内科', workload: 90 },
            { name: '神经科', workload: 82 },
            { name: '急诊科', workload: 95 }
          ]
        }
        if (!trend || trend.length === 0) {
          const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
          patientTrend.value = hours.map(time => ({
            time,
            outpatient: Math.floor(Math.random() * 200) + 150,
            emergency: Math.floor(Math.random() * 50) + 20,
            inpatient: Math.floor(Math.random() * 100) + 250
          }))
        }
      }
    } catch (error) {
      console.error('获取数据失败，使用模拟数据:', error)
      generateMockData()
    }
  }

  return {
    operationData,
    bedData,
    departmentData,
    equipmentData,
    patientTrend,
    realtimeMessages,
    initWebSocket,
    fetchAllData
  }
})

