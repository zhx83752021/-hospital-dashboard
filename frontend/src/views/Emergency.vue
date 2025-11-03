<template>
  <div class="emergency-container">
    <!-- 顶部标题栏 -->
    <PageHeader title="急诊科实时看板" />

    <div class="emergency-content">
      <div class="stats-row">
        <div class="stat-card">
          <img src="@/assets/images/mid-t1.png" class="stat-icon-img" alt="今日急诊">
          <div class="stat-info">
            <div class="stat-label">今日急诊</div>
            <div class="stat-value">286<span class="unit">人次</span></div>
          </div>
        </div>
        <div class="stat-card danger">
          <img src="@/assets/images/mid-t2.png" class="stat-icon-img" alt="等候患者">
          <div class="stat-info">
            <div class="stat-label">等候患者</div>
            <div class="stat-value">32<span class="unit">人</span></div>
          </div>
        </div>
        <div class="stat-card warning">
          <img src="@/assets/images/mid-t3.png" class="stat-icon-img" alt="危重症">
          <div class="stat-info">
            <div class="stat-label">危重症</div>
            <div class="stat-value">5<span class="unit">人</span></div>
          </div>
        </div>
        <div class="stat-card">
          <img src="@/assets/images/mid-t4.png" class="stat-icon-img" alt="床位占用">
          <div class="stat-info">
            <div class="stat-label">床位占用</div>
            <div class="stat-value">92<span class="unit">%</span></div>
          </div>
        </div>
        <div class="stat-card">
          <img src="@/assets/images/mid-t1.png" class="stat-icon-img" alt="已处理">
          <div class="stat-info">
            <div class="stat-label">已处理</div>
            <div class="stat-value">254<span class="unit">人</span></div>
          </div>
        </div>
        <div class="stat-card">
          <img src="@/assets/images/mid-t2.png" class="stat-icon-img" alt="平均等待">
          <div class="stat-info">
            <div class="stat-label">平均等待</div>
            <div class="stat-value">18<span class="unit">分钟</span></div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="left-panel">
          <div class="dashboard-card">
            <h3 class="card-title">
              急诊患者排队情况
            </h3>
            <div class="queue-list">
              <div class="queue-item" v-for="item in queueList" :key="item.id">
                <div class="queue-number">{{ item.number }}</div>
                <div class="patient-info">
                  <div class="name">{{ item.name }}</div>
                  <div class="level" :class="item.level">{{ item.levelText }}</div>
                </div>
                <div class="wait-time">⏱ {{ item.waitTime }}分钟</div>
              </div>
            </div>
          </div>

          <div class="dashboard-card">
            <h3 class="card-title">
              急救车辆追踪
            </h3>
            <div class="vehicle-list">
              <div class="vehicle-item" v-for="v in vehicles" :key="v.id">
                <div class="vehicle-icon">🚑</div>
                <div class="vehicle-info">
                  <div class="vehicle-name">{{ v.name }}</div>
                  <div class="vehicle-status">{{ v.status }}</div>
                </div>
                <div class="vehicle-location">📍 {{ v.location }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="dashboard-card">
            <h3 class="card-title">
              医护人员在岗状态
            </h3>
            <div class="staff-grid">
              <div class="staff-item" v-for="s in staff" :key="s.id">
                <div class="staff-avatar">{{ s.name[0] }}</div>
                <div class="staff-info">
                  <div class="staff-name">{{ s.name }}</div>
                  <div class="staff-role">{{ s.role }}</div>
                  <div class="staff-status" :class="s.status">
                    {{ s.status === 'online' ? '✓ 在岗' : '休息' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-card">
            <h3 class="card-title">
              危重症患者监控
            </h3>
            <div class="critical-list">
              <div class="critical-item" v-for="c in criticalPatients" :key="c.id">
                <div class="patient-basic">
                  <div class="name">{{ c.name }}</div>
                  <div class="age">{{ c.age }}岁</div>
                </div>
                <div class="vital-signs">
                  <span>💓 {{ c.heartRate }}</span>
                  <span>🩸 {{ c.bloodPressure }}</span>
                  <span>🌡️ {{ c.temperature }}℃</span>
                </div>
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

const queueList = ref([
  { id: 1, number: 'A001', name: '张**', level: 'critical', levelText: '危重', waitTime: 5 },
  { id: 2, number: 'A002', name: '李**', level: 'urgent', levelText: '紧急', waitTime: 12 },
  { id: 3, number: 'A003', name: '王**', level: 'normal', levelText: '普通', waitTime: 23 },
  { id: 4, number: 'A004', name: '赵**', level: 'urgent', levelText: '紧急', waitTime: 8 },
  { id: 5, number: 'A005', name: '刘**', level: 'normal', levelText: '普通', waitTime: 35 }
])

const vehicles = ref([
  { id: 1, name: '急救车1号', status: '出诊中', location: '距离医院2.3公里' },
  { id: 2, name: '急救车2号', status: '待命', location: '医院待命区' },
  { id: 3, name: '急救车3号', status: '维护中', location: '维修车间' },
  { id: 4, name: '急救车4号', status: '返回中', location: '距离医院0.8公里' },
  { id: 5, name: '急救车5号', status: '出诊中', location: '距离医院4.5公里' },
  { id: 6, name: '急救车6号', status: '待命', location: '医院待命区' }
])

const staff = ref([
  { id: 1, name: '王医生', role: '主任医师', status: 'online' },
  { id: 2, name: '李护士', role: '护士长', status: 'online' },
  { id: 3, name: '张医生', role: '主治医师', status: 'online' },
  { id: 4, name: '刘护士', role: '护士', status: 'offline' },
  { id: 5, name: '陈医生', role: '住院医师', status: 'online' },
  { id: 6, name: '赵护士', role: '护士', status: 'online' },
  { id: 7, name: '孙医生', role: '副主任医师', status: 'online' },
  { id: 8, name: '周护士', role: '护士', status: 'online' },
  { id: 9, name: '吴医生', role: '主治医师', status: 'offline' }
])

const criticalPatients = ref([
  { id: 1, name: '周**', age: 68, heartRate: 125, bloodPressure: '180/110', temperature: 38.5 },
  { id: 2, name: '吴**', age: 45, heartRate: 98, bloodPressure: '90/60', temperature: 36.8 },
  { id: 3, name: '郑**', age: 72, heartRate: 110, bloodPressure: '160/95', temperature: 37.2 },
  { id: 4, name: '钱**', age: 55, heartRate: 115, bloodPressure: '170/100', temperature: 38.2 },
  { id: 5, name: '孙**', age: 63, heartRate: 102, bloodPressure: '150/90', temperature: 37.8 },
  { id: 6, name: '李**', age: 58, heartRate: 108, bloodPressure: '165/95', temperature: 37.5 }
])
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'DS-Digital';
  src: url('@/assets/font/DS-DIGIT.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.emergency-container {
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
  padding: 1.2vh 0.5vw;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  box-sizing: border-box;
  background: url('@/assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}

.emergency-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  overflow: hidden;
  min-height: 0;
  margin-top: 1vh;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(10px, 1.2vw, 26px);
  flex-shrink: 0;
  padding: 0 1.5vw;

  .stat-card {
    display: flex;
    align-items: center;
    gap: 1.2vw;
    padding: 1.2vh 1.6vw; // 高度更小
    background: linear-gradient(135deg, rgba(26, 35, 50, 0.95) 0%, rgba(16, 28, 56, 0.9) 100%);
    border: 1px solid rgba(24, 144, 255, 0.35); // 边框统一蓝色
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.6), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 25px rgba(24, 144, 255, 0.45);
      border-color: rgba(24, 144, 255, 0.6);
      z-index: 1;

      &::before {
        opacity: 1;
      }
    }

    &.danger,
    &.warning {
      border-color: rgba(24, 144, 255, 0.35);
      
      &::before {
        background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.6), transparent);
      }
    }

    .stat-icon-img {
      width: clamp(36px, 3.2vw, 48px);
      height: clamp(36px, 3.2vw, 48px);
      flex-shrink: 0;
      filter: drop-shadow(0 2px 8px rgba(24, 144, 255, 0.3));
      transition: transform 0.3s ease;
    }

    &:hover .stat-icon-img {
      transform: scale(1.1);
    }

    .stat-info {
      flex: 1;

      .stat-label {
        font-size: clamp(12px, 1vw, 15px);
        color: rgba(255, 255, 255, 0.75);
        margin-bottom: 0.6vh;
        font-weight: 400;
        letter-spacing: 0.5px;
      }

      .stat-value {
        font-size: clamp(24px, 2.6vw, 40px);
        font-weight: bold;
        color: #40e0d0;
        line-height: 1;
        font-family: 'DS-Digital', 'DIN Alternate', 'Arial', sans-serif;
        text-shadow: 0 2px 10px rgba(64, 224, 208, 0.3);
        animation: numberGlow 2s ease-in-out infinite;

        .unit {
          font-size: clamp(13px, 1.1vw, 18px);
          margin-left: 0.4vw;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 400;
          font-family: 'Microsoft YaHei', sans-serif;
        }
      }
    }
  }
}

@keyframes numberGlow {
  0%, 100% {
    text-shadow: 0 2px 10px rgba(64, 224, 208, 0.3),
                 0 0 20px rgba(64, 224, 208, 0.2);
  }
  50% {
    text-shadow: 0 2px 15px rgba(64, 224, 208, 0.6),
                 0 0 30px rgba(64, 224, 208, 0.4),
                 0 0 40px rgba(64, 224, 208, 0.2);
  }
}

.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1vw;
  overflow: hidden;
  min-height: 0;
  padding: 0 1.5vw 3vh;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow: hidden;
  min-height: 0;
}

// 左侧面板改为网格布局，两个卡片高度相等
.left-panel {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1.2vh;
}

.dashboard-card {
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5vh 1vw;
  background: url('@/assets/images/mid-bg.png') no-repeat center center;
  background-size: 100% 100%;
  border: none;
  border-radius: 8px;
  box-shadow: none !important;
}

// 左侧和右侧面板的卡片高度统一
.left-panel > .dashboard-card,
.right-panel > .dashboard-card {
  height: 100%;
  min-height: 0;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-size: clamp(13px, 1.1vw, 18px);
  font-weight: 600;
  padding-left:20px;
  margin-top:-5px;
  margin-bottom: 1vh;
  color: #d6e4ff;

  .title-icon {
    font-size: clamp(14px, 1.2vw, 20px);
  }
}

.queue-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vh 1vw;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  padding:1vh 0.2vw;

  .queue-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5vh;
    padding: 1vh 0.8vw;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    border: 1px solid rgba(24, 144, 255, 0.3); // 统一蓝色边框
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      background: rgba(10, 23, 49, 0.6);
      border-color: rgba(24, 144, 255, 0.45);
      transform: translateY(-3px);
    }

    .queue-number {
      font-size: clamp(16px, 1.5vw, 24px);
      font-weight: bold;
      color: #2ea7ff;
      line-height: 1;
    }

    .patient-info {
      width: 100%;

      .name {
        font-size: clamp(12px, 1vw, 15px);
        color: #fff;
        margin-bottom: 0.4vh;
      }

      .level {
        display: inline-block;
        padding: 0.2vh 0.8vw;
        border-radius: 4px;
        font-size: clamp(10px, 0.85vw, 12px);
        font-weight: 500;

        &.critical {
          background: rgba(245, 34, 45, 0.25);
          color: #f5222d;
          border: 1px solid rgba(245, 34, 45, 0.4);
          animation: blink 2s ease-in-out infinite;
        }

        &.urgent {
          background: rgba(250, 173, 20, 0.25);
          color: #faad14;
          border: 1px solid rgba(250, 173, 20, 0.4);
        }

        &.normal {
          background: rgba(24, 144, 255, 0.18);
          color: #2ea7ff;
          border: 1px solid rgba(24, 144, 255, 0.35);
        }
      }
    }

    .wait-time {
      font-size: clamp(10px, 0.85vw, 13px);
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.3vh;
    }
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.vehicle-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vh 1vw;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  padding: 1vh 0.2vw;

  .vehicle-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5vh;
    padding: 0vh 0.8vw;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    border: 1px solid rgba(24, 144, 255, 0.3); // 统一蓝色边框
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      background: rgba(10, 23, 49, 0.6);
      border-color: rgba(24, 144, 255, 0.45);
      transform: scale(1.02);
      box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
    }

    .vehicle-icon {
      font-size: clamp(24px, 2.2vw, 32px);
      flex-shrink: 0;
    }

    .vehicle-info {
      width: 100%;

      .vehicle-name {
        font-size: clamp(12px, 1vw, 15px);
        color: #fff;
        font-weight: bold;
        margin-bottom: 0.3vh;
      }

      .vehicle-status {
        font-size: clamp(10px, 0.85vw, 13px);
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 0.3vh;
      }
    }

    .vehicle-location {
      font-size: clamp(10px, 0.85vw, 13px);
      color: #40e0d0;
    }
  }
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vh 1vw;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  padding-right: 0.5vw;
  padding:1vh 0.2vw;

  .staff-item {
    display: flex;
    align-items: center;
    gap: 1vw;
    padding: 1vh 1vw;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    border: 1px solid rgba(24, 144, 255, 0.3); // 统一蓝色边框
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      background: rgba(10, 23, 49, 0.6);
      border-color: rgba(24, 144, 255, 0.45);
      transform: translateY(-3px);
    }

    .staff-avatar {
      width: clamp(40px, 3.5vw, 50px);
      height: clamp(40px, 3.5vw, 50px);
      flex-shrink: 0;
      background: linear-gradient(135deg, #1890ff, #36cfc9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(14px, 1.4vw, 20px);
      font-weight: bold;
      color: #fff;
      box-shadow: 0 2px 10px rgba(24, 144, 255, 0.3);
    }

    .staff-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5vh;
      min-width: 0;
      padding-right: 1vw;
    }

    .staff-name {
      font-size: clamp(13px, 1.1vw, 16px);
      color: #fff;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .staff-role {
      font-size: clamp(11px, 0.9vw, 13px);
      color: rgba(255, 255, 255, 0.6);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .staff-status {
      position: absolute;
      top: 0.8vh;
      right: 0.8vw;
      padding: 0.3vh 0.8vw;
      border-radius: 4px;
      font-size: clamp(10px, 0.8vw, 12px);
      font-weight: 500;

      &.online {
      background: rgba(82, 196, 26, 0.22);
      color: #66f460;
      border: 1px solid rgba(82, 196, 26, 0.45);
      }

      &.offline {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
    }
  }
}

.critical-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vh 1vw;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  padding:1vh 0.2vw;

  .critical-item {
    padding: 1vh 0.8vw;
    background: rgba(245, 34, 45, 0.12);
    border: 1px solid rgba(245, 34, 45, 0.38);
    border-radius: 6px;
    transition: all 0.3s ease;
    animation: pulse-border-red 3s ease-in-out infinite;

    &:hover {
      background: rgba(245, 34, 45, 0.18);
      border-color: rgba(245, 34, 45, 0.55);
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(245, 34, 45, 0.2);
    }

    .patient-basic {
      display: flex;
      gap: 0.6vw;
      margin-bottom: 0.6vh;
      align-items: center;
      justify-content: center;

      .name {
        font-size: clamp(12px, 1vw, 15px);
        color: #fff;
        font-weight: bold;
      }

      .age {
        font-size: clamp(11px, 0.9vw, 13px);
        color: rgba(255, 255, 255, 0.7);
        padding: 0.2vh 0.6vw;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
    }

    .vital-signs {
      display: flex;
      flex-direction: column;
      gap: 0.5vh;
      font-size: clamp(10px, 0.85vw, 13px);
      color: rgba(255, 255, 255, 0.8);

      span {
        padding: 0.3vh 0.6vw;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
}

@keyframes pulse-border-red {
  0%, 100% {
    border-color: rgba(245, 34, 45, 0.35);
  }
  50% {
    border-color: rgba(245, 34, 45, 0.6);
  }
}

// 重要内容内部文本统一省略
.queue-item .name,
.vehicle-name, .vehicle-status, .vehicle-location,
.staff-name, .staff-role, .staff-status,
.patient-basic .name,
.patient-basic .age {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 自定义滚动条样式
.queue-list,
.vehicle-list,
.staff-grid,
.critical-list {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(24, 144, 255, 0.3);
    border-radius: 3px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(24, 144, 255, 0.5);
    }
  }
}
</style>



