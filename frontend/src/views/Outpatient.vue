<template>
  <div class="outpatient-container">
    <!-- 顶部标题栏 -->
    <PageHeader title="门诊患者服务大屏" />

    <div class="outpatient-content">
      <div class="calling-section dashboard-top-card">
        <h2 class="calling-title">正在叫号</h2>
        <div class="calling-info">
          <div class="calling-number">A108</div>
          <div class="calling-room">请到 <span class="room-highlight">3号诊室</span></div>
        </div>
      </div>

      <div class="info-grid">
        <div class="dashboard-card">
          <h3 class="card-title">
            各科室等候情况
          </h3>
          <div class="department-queue">
            <div class="dept-item" v-for="dept in departments" :key="dept.name">
              <div class="dept-info">
                <div class="dept-name">{{ dept.name }}</div>
                <div class="dept-doctor">👨‍⚕️ {{ dept.doctor }}</div>
              </div>
              <div class="dept-waiting">
                <div class="waiting-count" :class="getWaitingClass(dept.waiting)">
                  {{ dept.waiting }}人
                </div>
                <div class="avg-time">⏱ {{ dept.avgTime }}分钟</div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <h3 class="card-title">
            医生出诊信息
          </h3>
          <div class="doctor-schedule">
            <div class="doctor-item" v-for="doc in doctors" :key="doc.id">
              <div class="doctor-avatar">{{ doc.name[0] }}</div>
              <div class="doctor-details">
                <div class="doctor-name">{{ doc.name }}</div>
                <div class="doctor-dept">{{ doc.department }}</div>
                <div class="doctor-title">{{ doc.title }}</div>
              </div>
              <div class="doctor-status" :class="doc.status">
                {{ doc.status === 'working' ? '✓ 出诊中' : '休息' }}
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <h3 class="card-title">
            就医流程指引
          </h3>
          <div class="process-steps">
            <div class="step-item" v-for="(step, index) in processSteps" :key="index">
              <div class="step-left">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-line" v-if="index < processSteps.length - 1"></div>
              </div>
              <div class="step-content">
                <div class="step-header">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-time">⏱ {{ step.time }}</div>
                </div>
                <div class="step-desc">{{ step.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <h3 class="card-title">
            健康宣教
          </h3>
          <div class="health-tips">
            <div class="tip-item" v-for="(tip, index) in healthTips" :key="index">
              <div class="tip-icon">{{ tip.icon }}</div>
              <div class="tip-content">
                <div class="tip-title">{{ tip.title }}</div>
                <div class="tip-desc">{{ tip.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

const departments = ref([
  { name: '心内科', doctor: '王主任', waiting: 15, avgTime: 12 },
  { name: '骨科', doctor: '李主任', waiting: 8, avgTime: 15 },
  { name: '消化科', doctor: '张医生', waiting: 23, avgTime: 10 },
  { name: '呼吸科', doctor: '刘医生', waiting: 5, avgTime: 8 },
  { name: '神经内科', doctor: '陈主任', waiting: 12, avgTime: 14 },
  { name: '内分泌科', doctor: '赵医生', waiting: 6, avgTime: 9 }
])

const doctors = ref([
  { id: 1, name: '王建国', department: '心内科', title: '主任医师', status: 'working' },
  { id: 2, name: '李明', department: '骨科', title: '副主任医师', status: 'working' },
  { id: 3, name: '张华', department: '消化科', title: '主治医师', status: 'working' },
  { id: 4, name: '刘芳', department: '呼吸科', title: '主任医师', status: 'rest' },
  { id: 5, name: '陈静', department: '神经内科', title: '副主任医师', status: 'working' }
])

const processSteps = ref([
  { title: '预约挂号', desc: '通过微信、APP或现场挂号', time: '3-5分钟' },
  { title: '候诊等待', desc: '关注叫号信息，按时就诊', time: '10-30分钟' },
  { title: '医生诊疗', desc: '配合医生进行检查和诊断', time: '10-15分钟' },
  { title: '缴费取药', desc: '在收费处缴费，药房取药', time: '5-10分钟' },
  { title: '检查治疗', desc: '按医嘱进行相关检查治疗', time: '15-60分钟' },
  { title: '复诊随访', desc: '按要求定期复诊随访', time: '根据病情' }
])

const healthTips = ref([
  { icon: '🦠', title: '预防感染', desc: '勤洗手、戴口罩，保持社交距离' },
  { icon: '💊', title: '合理用药', desc: '遵医嘱用药，不随意增减剂量' },
  { icon: '🏃', title: '适量运动', desc: '每天30分钟中等强度运动' },
  { icon: '🥗', title: '均衡饮食', desc: '多吃蔬菜水果，少油少盐少糖' }
])

const getWaitingClass = (count) => {
  if (count >= 20) return 'high'
  if (count >= 10) return 'medium'
  return 'low'
}
</script>

<style lang="scss" scoped>
.outpatient-container {
  // 主色调变量
  --bg-primary: #0a1429;
  --bg-secondary: rgba(10, 25, 50, 0.85);
  --bg-card: rgba(12, 28, 58, 0.8);
  
  // 边框颜色
  --border-primary: #1a5c9e;
  --border-light: rgba(42, 130, 228, 0.4);
  --border-glow: rgba(0, 212, 255, 0.6);
  
  // 图表配色
  --chart-orange: #ff9843;
  --chart-yellow: #ffc107;
  --chart-cyan: #00d4ff;
  --chart-blue: #1890ff;
  --chart-green: #13c2c2;
  --chart-teal: #1de9b6;
  
  // 文字颜色
  --text-primary: #e6f7ff;
  --text-secondary: #91d5ff;
  --text-highlight: #40a9ff;
  --text-warning: #faad14;
  
  width: 100vw;
  height: 100vh;
  padding: 1.2vh 1.2vw;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  box-sizing: border-box;
  background: url('@/assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}

.outpatient-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  min-height: 0;
  padding:1vh 0.5vw 3vh;
}

.calling-section {
  padding: 2.5vh 2vw;
  text-align: center;
  background: url('@/assets/images/left-bg.png') no-repeat center center;
  background-size: 100% 100%;
  border: none;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: none;

  .calling-title {
    font-size: clamp(16px, 1.5vw, 24px);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1vh;
    font-weight: 500;
  }

  .calling-info {
    .calling-number {
      font-size: clamp(48px, 5vw, 80px);
      font-weight: bold;
      color: #40e0d0;
      margin-bottom: 1vh;
      text-shadow: 0 0 30px rgba(54, 207, 201, 0.6);
      letter-spacing: 0.1em;
      animation: pulse 2s ease-in-out infinite;
    }

    .calling-room {
      font-size: clamp(20px, 2vw, 36px);
      color: #fff;

      .room-highlight {
        color: #1890ff;
        font-weight: bold;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.info-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(6px, 0.8vw, 20px);
  overflow: hidden;
  min-height: 0;
  
}

.department-queue .dept-info .dept-name,
.doctor-details .doctor-name,
.tip-title,
.step-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dept-waiting .waiting-count,
.dept-waiting .avg-time,
.doctor-status,
.tip-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doctor-item, .tip-item, .step-item {
  min-width: 0;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-size: clamp(13px, 1.1vw, 18px);
  font-weight: 600;
  margin-bottom: 1vh;
  color: #d6e4ff;
  padding-left:20px;

  .title-icon {
    font-size: clamp(14px, 1.2vw, 20px);
  }
}

// 卡片样式 - 使用 left-bg.png 背景
.dashboard-top-card {
  background: url('@/assets/images/mid-bg1.png') no-repeat center center;
  background-size: 100% 100%;
  border: none;
  border-radius: 8px;
  padding: 1.5vh 1vw;
  box-shadow: none !important;
}
.dashboard-card {
  background: url('@/assets/images/left-bg2.png') no-repeat center center;
  background-size: 100% 100%;
  border: none;
  border-radius: 8px;
  padding: 1.5vh 1vw;
  box-shadow: none !important;
}

.department-queue {
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  overflow: hidden;
  padding-top:2vh;

  .dept-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1vw;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(10, 23, 49, 0.6);
      border-color: rgba(24, 144, 255, 0.45);
    }

    .dept-info {
      .dept-name {
        font-size: clamp(13px, 1.1vw, 17px);
        color: #fff;
        font-weight: bold;
        margin-bottom: 0.3vh;
      }

      .dept-doctor {
        font-size: clamp(11px, 0.9vw, 14px);
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .dept-waiting {
      text-align: right;

      .waiting-count {
        font-size: clamp(16px, 1.5vw, 22px);
        font-weight: bold;
        margin-bottom: 0.2vh;

        &.high {
          color: #ff4d4f;
        }

        &.medium {
          color: #ffb02e;
        }

        &.low {
          color: #66f460;
        }
      }

      .avg-time {
        font-size: clamp(10px, 0.85vw, 13px);
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}

.doctor-schedule {
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  overflow: hidden;padding-top:2vh;

  .doctor-item {
    display: flex;
    align-items: center;
    gap: 1vw;
    padding: 1vh 1vw;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(10, 23, 49, 0.6);
      border-color: rgba(24, 144, 255, 0.45);
      transform: translateX(5px);
    }

    .doctor-avatar {
      width: clamp(35px, 3.5vw, 50px);
      height: clamp(35px, 3.5vw, 50px);
      background: linear-gradient(135deg, #1890ff, #36cfc9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(14px, 1.5vw, 20px);
      font-weight: bold;
      color: #fff;
      flex-shrink: 0;
      box-shadow: 0 2px 10px rgba(24, 144, 255, 0.3);
    }

    .doctor-details {
      flex: 1;

      .doctor-name {
        font-size: clamp(12px, 1vw, 16px);
        color: #fff;
        font-weight: bold;
        margin-bottom: 0.2vh;
      }

      .doctor-dept {
        font-size: clamp(11px, 0.9vw, 14px);
        color: rgba(255, 255, 255, 0.75);
        margin-bottom: 0.1vh;
      }

      .doctor-title {
        font-size: clamp(10px, 0.8vw, 12px);
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .doctor-status {
      padding: 0.4vh 1vw;
      border-radius: 4px;
      font-size: clamp(10px, 0.85vw, 13px);
      font-weight: 500;

      &.working {
        background: rgba(82, 196, 26, 0.22);
        color: #66f460;
        border: 1px solid rgba(82, 196, 26, 0.45);
      }

      &.rest {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
    }
  }
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  padding-top: 2vh;

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 1vw;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      transform: translateX(5px);

      .step-number {
        transform: scale(1.1);
      }
    }

    .step-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex-shrink: 0;

      .step-number {
        width: clamp(28px, 2.5vw, 36px);
        height: clamp(28px, 2.5vw, 36px);
        background: linear-gradient(135deg, #1890ff, #36cfc9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(12px, 1.1vw, 16px);
        font-weight: bold;
        color: #fff;
        flex-shrink: 0;
        box-shadow: 0 2px 10px rgba(24, 144, 255, 0.3);
        transition: transform 0.3s ease;
        position: relative;
        z-index: 2;
      }

      .step-line {
        width: 2px;
        height: clamp(35px, 4vh, 45px);
        background: linear-gradient(180deg, 
          rgba(24, 144, 255, 0.8) 0%, 
          rgba(54, 207, 201, 0.4) 100%);
        position: relative;
        z-index: 1;
        
        &::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: 6px;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(24, 144, 255, 0.3) 0%, 
            rgba(54, 207, 201, 0.1) 100%);
          transform: translateX(-50%);
          filter: blur(2px);
        }
      }
    }

    .step-content {
      flex: 1;
      padding-top: 0.3vh;
      padding-bottom: 1.5vh;

      .step-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.3vh;
        gap: 1vw;

        .step-title {
          font-size: clamp(12px, 1vw, 16px);
          color: #fff;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-time {
          font-size: clamp(10px, 0.85vw, 13px);
          color: #40a9ff;
          background: rgba(24, 144, 255, 0.15);
          padding: 0.3vh 0.8vw;
          border-radius: 4px;
          border: 1px solid rgba(24, 144, 255, 0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }
      }

      .step-desc {
        font-size: clamp(10px, 0.85vw, 13px);
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.4;
      }
    }
  }
}

.health-tips {
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  overflow: hidden;
  padding-top:2vh;

  .tip-item {
    display: flex;
    align-items: flex-start;
    gap: 1vw;
    padding: 1vh 1vw;
    background: rgba(82, 196, 26, 0.12);
    border: 1px solid rgba(82, 196, 26, 0.3);
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(82, 196, 26, 0.18);
      border-color: rgba(82, 196, 26, 0.45);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(82, 196, 26, 0.2);
    }

    .tip-icon {
      font-size: clamp(20px, 2vw, 32px);
      flex-shrink: 0;
    }

    .tip-content {
      flex: 1;

      .tip-title {
        font-size: clamp(12px, 1vw, 16px);
        color: #fff;
        font-weight: bold;
        margin-bottom: 0.3vh;
      }

      .tip-desc {
        font-size: clamp(10px, 0.85vw, 13px);
        color: rgba(255, 255, 255, 0.75);
        line-height: 1.4;
      }
    }
  }
}
</style>

