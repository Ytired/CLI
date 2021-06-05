const program = require('commander')
const { createProject, addComponentAction, addPageAndRoute, addStoreAction } = require('./actions')

// 创建命令
const createCommands = () => {
  program
    // 命令
    .command('create <project> [others...]')
    // 描述
    .description('从仓库克隆项目到你的文件夹')
    // 执行
    .action(createProject)

  // 添加模板
  program
    // 命令
    .command('addcpn <name>')
    // 描述
    .description('添加一个 Vue component，例如: yyj addcpn HellWorld [-d src/components]')
    // 执行
    .action(name => {
      addComponentAction(name, program.dest || 'src/components')
    })

  // 添加组件
  program
    // 命令
    .command('addpage <page>')
    // 描述
    .description('添加一个 Vue page，例如: yyj addpage Home [-d src/pages]')
    // 执行
    .action(page => {
      addPageAndRoute(page, program.dest || 'src/pages')
    })

  program
    // 命令
    .command('addstore <store>')
    // 描述
    .description('添加一个 Vue store，例如: yyj addstore Home [-d src/pages]')
    // 执行
    .action(store => {
      addStoreAction(store, program.dest || 'src/store/modules')
    })
}

module.exports = createCommands
