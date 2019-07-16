const Accounts = require("../accounts/accountsDb");

module.exports = {
  validateId,
  validateBody
};

async function validateId(req, res, next) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ message: "IDs should be a numerical value" });
    }

    const account = await Accounts.getById(id);
    if (!Object.keys(account).length) {
      return res.status(404).json({ message: "Account ID does not exist" });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    return res.status(400).json({ message: "Sever error" });
  }
}

async function validateBody(req, res, next) {
  const { name, budget } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Missing account data" });
  }

  if (!name || !budget) {
    return res.status(400).json({ message: "Name and budget are required" });
  }
  next();
}
