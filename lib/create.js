// 初始化创建步骤选项列表
const {
  inquirerList,
  inquirerPrecssList,
  options,
  dependencies
} = require('./store');
const inquirer = require('inquirer');

module.exports = async function () {
  const answersStep = [];
  const submenu = ['precss'];
  await inquirerBase(answersStep, submenu);
  await hasPrecss(answersStep);
  require('./creator')();
};

// 一级菜单 基本选项
function inquirerBase(answersStep, submenu) {
  return new Promise(resolve => {
    const inquirerOptions = inquirer.createPromptModule();
    inquirerOptions(inquirerList).then(answers => {
      submenu.forEach(item => {
        // 是否选择 precss
        if (answers.options.includes(item)) answersStep.push(item);
      });
      answers.options.forEach(item => {
        // 更改 store.js 中选择项值
        if (options[item] === false) options[item] = true;
        // 添加相应依赖包
        if (!answersStep.includes(item) && item in dependencies) {
          options.dependencies = [...options.dependencies, ...dependencies[item]];
        }
      });
      resolve();
    });
  });
}
// 二级子菜单 css 预处理器
function hasPrecss(answersStep) {
  return new Promise(resolve => {
    if (answersStep.includes('precss')) {
      const inquirerPrecss = inquirer.createPromptModule();
      inquirerPrecss(inquirerPrecssList).then(answers => {
        // 更换预处理器
        options.precss = answers.precss;
        // 添加相应依赖包
        options.dependencies = [...options.dependencies, ...dependencies[answers.precss]];
        resolve();
      });
    } else {
      resolve();
    }
  });
}