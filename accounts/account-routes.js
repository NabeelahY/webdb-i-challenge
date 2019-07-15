const express = require("express");
const Accounts = require("./accountsDb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.get();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the accounts"
    });
  }
});

module.exports = router;
