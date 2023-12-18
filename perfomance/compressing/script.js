// 模拟一个非常繁琐的逻辑
function complexLogic(inputArray) {
    let result = 0;

    // 对输入数组进行操作
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] > 10) {
            result += inputArray[i] * 2;
        } else if (inputArray[i] > 5) {
            result += inputArray[i] * 3;
        } else {
            result += inputArray[i];
        }
    }

    // 执行更多的条件判断
    if (result % 2 === 0) {
        result *= 2;
    } else {
        result -= 5;
    }

    // 更复杂的处理
    const tempArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] % 2 === 0) {
            tempArray.push(inputArray[i]);
        }
    }

    // 返回处理后的结果
    return {
        total: result,
        evens: tempArray,
        message: "Complex logic executed successfully!"
    };
}

// 使用示例
const input = [3, 7, 12, 5, 8, 4, 11, 6];
const output = complexLogic(input);
console.log(output);