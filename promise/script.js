// return results in argument orders of run function, and if the invoke time is up to concurrency, resolve the result
function run(promiseFactories, concurrency) {
  return new Promise((resolve) => {
    let results = new Array(promiseFactories.length);
    let counter = 0;

    promiseFactories.forEach((pf, idx) => {
      pf().then((result) => {
        results[idx] = result;
        counter++;

        if (counter === concurrency) {
          resolve(results);
        }
      });
    });
  });
}

function delay(data, delay) {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(data);
      }, delay * 1000)
    );
}

run(
  [
    delay("a", 1),
    delay("b", 2),
    delay("c", 4),
    delay("d", 2),
    delay("e", 3),
    delay("f", 2),
    delay("g", 1),
  ],
  3
).then((data) => {
  data.forEach((dataItem) => {
    console.log("dataItem", dataItem);
  });
});


// console.log after 100 then 2000 then 3000 ms
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
