// 模擬可能導致主線程阻塞的腳本
function blockMainThread() {
    // 創建一個非常大的數字
    const iterations = 1000000000; // 10億次迴圈
  
    // 循環計算數字，模擬複雜的計算
    for (let i = 0; i < iterations; i++) {
      // 沒有效果的計算，僅為示例
      const result = Math.sqrt(i);
    }
  }
  
  // 執行可能導致主線程阻塞的函數
  blockMainThread();