import { generateRandomNumber, randomChoice } from './dataGenerator.js'

const alertLevels = ['danger', 'warning', 'info', 'success']

const alertMessages = [
  { level: 'danger', title: '急诊患者激增，请增派人手' },
  { level: 'warning', title: '药品库存不足，需要及时补货' },
  { level: 'info', title: '3号手术室已完成当日最后一台手术' },
  { level: 'success', title: '患者满意度调查结果优秀' },
  { level: 'warning', title: 'ICU床位占用率超过90%' },
  { level: 'danger', title: 'CT设备出现故障，维修人员正在处理' },
  { level: 'info', title: '新入院患者办理手续完成' },
  { level: 'success', title: '手术成功完成，患者生命体征平稳' }
]

/**
 * 启动实时数据推送
 * @param {Server} io - Socket.IO 服务器实例
 */
export const startRealtimeDataPush = (io) => {
  // 每3秒推送一次运营数据更新
  setInterval(() => {
    const operationUpdate = {
      type: 'operation',
      payload: {
        outpatientCount: generateRandomNumber(200, 400),
        emergencyCount: generateRandomNumber(50, 150),
        inpatientCount: generateRandomNumber(300, 600),
        surgeryCount: generateRandomNumber(10, 40),
        revenue: generateRandomNumber(500000, 1200000)
      }
    }
    io.emit('realtime-update', operationUpdate)
  }, 3000)

  // 每5秒推送一次床位数据更新
  setInterval(() => {
    const total = 800
    const occupied = generateRandomNumber(600, 750)
    const bedUpdate = {
      type: 'bed',
      payload: {
        total,
        occupied,
        available: total - occupied,
        rate: Math.round((occupied / total) * 100)
      }
    }
    io.emit('realtime-update', bedUpdate)
  }, 5000)

  // 每10秒推送一次消息预警
  setInterval(() => {
    const message = randomChoice(alertMessages)
    const messageUpdate = {
      type: 'message',
      payload: {
        ...message,
        timestamp: new Date().toISOString()
      }
    }
    io.emit('realtime-update', messageUpdate)
  }, 10000)

  console.log('✅ 实时数据推送已启动')
}

