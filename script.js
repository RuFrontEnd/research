new Promise((resolve) => {
  setTimeout(() => {
    console.log("already wait for 100");
    resolve();
  }, 100);
}).then(() => {
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("already wait for 2000");
      resolve();
    }, 2000);
  }).then(() => {
    setTimeout(() => {
      console.log("already wait for 3000");
    }, 3000);
  });
});
