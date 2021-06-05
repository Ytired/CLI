#!/usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommand = require('./lib/core/create')

// 获取package.json中的版本
program.version(require('./package.json').version)
// 输入-v也能打印出版本号
program.version(require('./package.json').version, '-v, --version')

/* 
调用:
   帮助和可选信息
   创建命令
*/
helpOptions()
createCommand()

// 把node的进程参数传过去
program.parse(process.argv)
