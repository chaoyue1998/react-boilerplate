const path = require('path');
var projectName = process.env.npm_package_name;
// 生成项目的根目录
var root = '../../';
// 线上测试环境目录
var betaRoot = path.join(root, 'www_beta');
// 线上正式环境目录
var wwwRoot = path.join(root, 'www');
module.exports = {
  betaRoot: betaRoot,
  wwwRoot: wwwRoot,
  projectName: projectName,
  dev: {
    env: '"development"',
    productionSourceMap: true
  },
  build: {
    env: '"production"',
    productionSourceMap: true
  }
}
