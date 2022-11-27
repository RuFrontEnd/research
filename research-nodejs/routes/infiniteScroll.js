var express = require("express");
var router = express.Router();
let axios = require("axios");

/* GET users listing. */
router.post("/", function (req, res, next) {
  axios.get("https://jsonplaceholder.typicode.com/photos").then((response) => {
    const page = req.body.page;
    const Items = response.data;
    const photos = [];
    Items.forEach((Item, index) => {
      if (index + 1 <= page * 10) {
        photos.push(Item);
      }
    });
    res.json(photos);
  });
});

module.exports = router;
