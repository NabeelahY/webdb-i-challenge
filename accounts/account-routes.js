const express = require("express");
const Accounts = require("./accountsDb");
const { validateId, validateBody } = require("../middleware");
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

router.get("/:id", validateId, async (req, res) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.json(account[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the accounts"
    });
  }
});

router.post("/", validateBody, async (req, res) => {
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

router.put("/:id", validateId, validateBody, async (req, res) => {
  const { id } = req.params;
  try {
    await Accounts.updateAccount(id, req.body);
    const editedAccount = await Accounts.getById(id);
    res.status(200).json(editedAccount);
  } catch {
    res.status(500).json({
      message: err.toString()
    });
  }
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  try {
    await Accounts.deleteAccount(id);
    res.status(200).json({ deleted_account: req.account });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the account"
    });
  }
});

module.exports = router;
