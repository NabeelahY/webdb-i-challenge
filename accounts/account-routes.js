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

router.post("/", async (req, res) => {
  try {
    const newAccountId = await Accounts.createAccount(req.body);
    const newAccount = await Accounts.getById(newAccountId[0]);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    });
  }
});

module.exports = router;
