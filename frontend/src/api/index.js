import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default {
  // ========== Dashboard 主页相关 ==========
  
  // 获取运营数据
  getOperationData() {
    return instance.get('/operation/data')
  },

  // 获取床位数据
  getBedData() {
    return instance.get('/bed/data')
  },

  // 获取部门数据
  getDepartmentData() {
    return instance.get('/department/data')
  },

  // 获取设备数据
  getEquipmentData() {
    return instance.get('/equipment/data')
  },

  // 获取患者流量趋势
  getPatientTrend() {
    return instance.get('/patient/trend')
  },

  // ========== 门诊页面相关 ==========
  
  // 获取门诊综合数据
  getOutpatientData() {
    return instance.get('/outpatient/data')
  },

  // 获取叫号信息
  getCallingInfo() {
    return instance.get('/outpatient/calling')
  },

  // 获取科室等候情况
  getDepartmentQueue() {
    return instance.get('/outpatient/departments')
  },

  // 获取医生出诊信息
  getDoctorSchedule() {
    return instance.get('/outpatient/doctors')
  },

  // ========== 急诊页面相关 ==========
  
  // 获取急诊综合数据
  getEmergencyData() {
    return instance.get('/emergency/data')
  },

  // 获取急诊统计数据
  getEmergencyStats() {
    return instance.get('/emergency/stats')
  },

  // 获取急诊患者排队情况
  getEmergencyQueue() {
    return instance.get('/emergency/queue')
  },

  // 获取急救车辆追踪
  getVehicles() {
    return instance.get('/emergency/vehicles')
  },

  // 获取医护人员在岗状态
  getStaffStatus() {
    return instance.get('/emergency/staff')
  },

  // 获取危重症患者监控
  getCriticalPatients() {
    return instance.get('/emergency/critical')
  },

  // ========== 其他 ==========
  
  // 获取排队信息
  getQueueData() {
    return instance.get('/queue/data')
  }
}

