const fs = require('fs');
const UglifyJS = require('uglify-es');
const CleanCSS = require('clean-css');

function compressJS() {

    // 读取原始的 JavaScript 文件内容
    const originalCode = fs.readFileSync('script.js', 'utf8');

    // 对代码进行压缩
    const minifiedCode = UglifyJS.minify(originalCode);

    // 将压缩后的代码写入一个新文件
    fs.writeFileSync('output.min.js', minifiedCode.code, 'utf8');
}

function compressCSS() {

    // 读取要压缩的 CSS 文件

    const inputFileName = 'style.css';
    const outputFileName = 'output.min.css';

    fs.readFile(inputFileName, 'utf8', (err, css) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // 使用 clean-css 压缩 CSS
        const minifiedCSS = new CleanCSS().minify(css).styles;

        // 将压缩后的 CSS 写入输出文件
        fs.writeFile(outputFileName, minifiedCSS, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('CSS file has been minified and saved as', outputFileName);
        });
    });
}

compressJS()
compressCSS()




