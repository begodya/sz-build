#! /usr/bin/env node

const program = require('commander'); // 解析用户输入的命令
const download = require('download-git-repo'); // 拉取 github 上的文件
const chalk = require('chalk'); // 改变输出文字的颜色
const ora = require('ora'); // 小图标

program
  .version('0.1.0')
  .option('-i, init [name]', '初始化 sz-cli 项目')
  .parse(process.argv);

if (program.init) {
  const spinner = ora('正在从 github 下载 sz-cli').start();
  download('begodya/sz-cli', program.init, function (err) {
    if (!err) {
      // 可以输出一些项目成功的信息
      console.info(chalk.blueBright('下载成功'));
    } else {
      // 可以输出一些项目失败的信息
    }
  })
}