const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const ls = require('log-symbols')
const chalk = require('chalk')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  // 路径拼接
  const tempPath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(tempPath, { data }, {}, (err, result) => {
      if (err) {
        console.log(ls.error, chalk.red(err))
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

// 判断路径存不存在  不存在就自动创建
const createDirSync = pathName => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 写入文件
const writeToFile = (path, content) => {
  // promise形式
  // 判断path是否存在 如果不存在就创建对应的文件夹
  return fs.promises.writeFile(path, content)
}

module.exports = { compile, writeToFile, createDirSync }
