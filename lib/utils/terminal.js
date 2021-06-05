/*
 * 执行终端命令
 */
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  // 返回一个promise
  return new Promise((res, rej) => {
    const childProcess = spawn(...args)

    // 将下载信息从子进程展示到主进程的命令窗口上
    childProcess.stdout.pipe(process.stdout)

    // 将错误信息从子进程展示到主进程的命令窗口上
    childProcess.stderr.pipe(process.stderr)

    // 监听close事件是否执行完成
    childProcess.on('close', () => {
      res()
      // console.log('促进胃肠')
    })
  })
}

module.exports = {
  commandSpawn,
}
