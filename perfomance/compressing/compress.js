const fs = require('fs');
const UglifyJS = require('uglify-es');

// 读取原始的 JavaScript 文件内容
const originalCode = fs.readFileSync('script.js', 'utf8');

// 对代码进行压缩
const minifiedCode = UglifyJS.minify(originalCode);

// 将压缩后的代码写入一个新文件
fs.writeFileSync('output.min.js', minifiedCode.code, 'utf8');