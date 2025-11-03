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
    socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('realtime-update', (data) => {
      updateRealtimeData(data)
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })
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

  // 获取所有数据
  const fetchAllData = async () => {
    try {
      const [operation, bed, department, equipment, trend] = await Promise.all([
        api.getOperationData(),
        api.getBedData(),
        api.getDepartmentData(),
        api.getEquipmentData(),
        api.getPatientTrend()
      ])

      operationData.value = operation
      bedData.value = bed
      departmentData.value = department
      equipmentData.value = equipment
      patientTrend.value = trend
    } catch (error) {
      console.error('获取数据失败:', error)
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

