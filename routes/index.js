const express = require("express");
const router = express.Router();

// Render index.ejs
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

module.exports = router;
