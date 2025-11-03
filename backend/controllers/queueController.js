export const getQueueData = (req, res) => {
  const data = {
    current: 'A108',
    waiting: [
      { number: 'A109', department: '内科', status: 'waiting' },
      { number: 'A110', department: '外科', status: 'waiting' },
      { number: 'A111', department: '儿科', status: 'waiting' }
    ]
  }

  res.json(data)
}

