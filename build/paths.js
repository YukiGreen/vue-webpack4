const path = require('path');
const appDir = process.cwd();

// 传入一个相对于项目根目录的相对路径，可得到一个绝对路径
const resolveApp = (relativePath) => {
  return path.resolve(appDir, relativePath);
}
module.exports = resolveApp;