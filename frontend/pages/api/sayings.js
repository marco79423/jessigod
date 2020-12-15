export default (req, res) => {
  const pageIndex = +req.query.pageIndex || 0
  const pageSize = +req.query.pageSize || 15

  const templates = [
    {
      name: 'Nabi姐',
      content: '你怎麼長這樣, 笑死'
    },
    {
      name: 'Nabi姐',
      content: '我不是在教你, 我是在打臉你'
    },
    {
      name: '威廉哥', content: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
  ]

  const sayings = []
  for(let i = 0; i < 1000; i++) {
    const index = Math.floor(Math.random() * templates.length)
    sayings.push({
      id: i.toString(),
      ...templates[index]
    })
  }

  res.json({
    data: sayings.slice(pageIndex * pageSize, (pageIndex+1) * pageSize),
    pagination: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalSize: sayings.length,
    },
  })
}
