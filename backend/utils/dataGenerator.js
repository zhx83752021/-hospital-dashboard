/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成随机布尔值
 * @returns {boolean}
 */
export const generateRandomBoolean = () => {
  return Math.random() > 0.5
}

/**
 * 从数组中随机选择一个元素
 * @param {Array} array
 * @returns {*}
 */
export const randomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * 生成模拟时间序列数据
 * @param {number} length - 数据点数量
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {Array}
 */
export const generateTimeSeriesData = (length, min, max) => {
  return Array.from({ length }, () => generateRandomNumber(min, max))
}

