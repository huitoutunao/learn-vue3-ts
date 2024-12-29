import Mock from 'mockjs'

const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i=0; i<queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      console.log(itemArr)
      if(itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}

const data = Mock.mock({
  username: 'hhh',
  'list|20-60': [
    {
      id: '@increment(1)',
      title: '@ctitle',
      content: '@cparagraph',
      addTime: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})

Mock.mock('/mock/demo', 'get', function() {
  return {
    type: 1,
    code: 200,
    msg: '前端获取mockjs 成功',
    data,
  }
})
