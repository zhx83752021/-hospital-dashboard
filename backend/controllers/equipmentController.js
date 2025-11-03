import { generateRandomNumber } from '../utils/dataGenerator.js'

const statusList = ['success', 'warning', 'danger', 'info']

export const getEquipmentData = (req, res) => {
  const equipment = [
    { 
      id: 1, 
      name: 'CT扫描仪-1', 
      location: '影像科1楼',
      icon: '🔬',
      iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: 2, 
      name: 'MRI核磁共振', 
      location: '影像科2楼',
      icon: '🏥',
      iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      id: 3, 
      name: 'X光机-A', 
      location: '放射科',
      icon: '📡',
      iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      id: 4, 
      name: '超声诊断仪-3', 
      location: 'B超室',
      icon: '🔊',
      iconBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    { 
      id: 5, 
      name: '呼吸机-5', 
      location: 'ICU',
      icon: '🫁',
      iconBg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    { 
      id: 6, 
      name: '心电图机-2', 
      location: '心内科',
      icon: '💓',
      iconBg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    { 
      id: 7, 
      name: '血液透析机', 
      location: '透析室',
      icon: '💉',
      iconBg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    { 
      id: 8, 
      name: '麻醉机-1', 
      location: '手术室',
      icon: '⚕️',
      iconBg: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)'
    }
  ]

  const data = equipment.map(item => ({
    ...item,
    status: statusList[Math.floor(Math.random() * statusList.length)],
    usageRate: generateRandomNumber(40, 95)
  }))

  res.json(data)
}

