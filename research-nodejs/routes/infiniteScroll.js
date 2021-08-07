var express = require("express");
var router = express.Router();
let axios = require("axios");

/* GET users listing. */
router.post("/", function (req, res, next) {
  axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
    const page = req.body.page;
    const Items = response.data;
    const todos = [];
    Items.forEach((Item, index) => {
      if (index + 1 > page * 10 - 10 && index + 1 <= page * 10) {
        todos.push(Item);
      }
    });
    res.json(todos);
  });
});

module.exports = router;
