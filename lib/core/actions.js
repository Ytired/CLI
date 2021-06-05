const { promisify } = require('util')
const path = require('path')

// 将download包裹成promise的形式
const download = promisify(require('download-git-repo'))
const open = require('open')
const ora = require('ora')
const chalk = require('chalk')
const ls = require('log-symbols')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

// 把异步任务使用async变成同步任务
const createProject = async (project, others) => {
  // 使用ora加载动画
  const spinner = ora(`正在下载项目模板，源地址：${vueRepo}`)
  spinner.start()

  // 克隆项目
  await download(vueRepo, project, { clone: true }, err => {
    if (err) {
      spinner.fail() // 报错
      console.log(ls.error, chalk.red(`克隆失败:`))
      console.log(ls.error, chalk.red(err))
    } else {
      spinner.succeed() // 成功
      console.log(ls.success, chalk.green('克隆成功'))
    }
  })

  // 执行 npm install
  // 判断操作系统是否为windows
  let command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 执行 npm run serve  异步执行不阻塞主进程
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 打开浏览器   但是测试的时候windows不调用open()也会通过webpack配置的 --open参数 自动打开
  open('http://localhost:8080/')

  // 停止动画
  spinner.stop()
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 编译ejs模板
  const result = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() })
  // 将result写入到.vue文件里面
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

// 添加组件和路由的action
const addPageAndRoute = async (name, dest) => {
  // 编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)

  // 写入文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, `router.js`)
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async (name, dest) => {
  //编译
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 写入文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`)
    const targetRoutePath = path.resolve(targetDest, `types.js`)
    writeToFile(targetPagePath, storeResult)
    writeToFile(targetRoutePath, typesResult)
  }
}

module.exports = {
  createProject,
  addComponentAction,
  addPageAndRoute,
  addStoreAction,
}
