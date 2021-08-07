var express = require("express");
var router = express.Router();
let axios = require("axios");

/* GET users listing. */
router.get("/", function (req, res, next) {
  axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
    console.log("res", res.data);
  });
  res.send("respond with a resource");
});

module.exports = router;
