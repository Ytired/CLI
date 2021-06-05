const program = require('commander')

// 封装help参数
const helpOptions = () => {
  // 增加自己的命令行options
  program.option('-y --yyj', '一个yyj的cli')
  // 保存的目标地址
  program.option('-d --dest <dest>', '要保存的目标地址, 例如: -d /src/components')

  // 输入--help
  program.on('--help', function () {
    console.log('')
    console.log('Other')
    console.log('other options~')
  })
}

// 导出
module.exports = helpOptions
