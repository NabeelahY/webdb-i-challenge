const knex = require("knex");
const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  createAccount,
  updateAccount,
  deleteAccount
};

function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts").where({ id });
}

function createAccount({ name, budget }) {
  return db("accounts").insert({ name, budget });
}

function updateAccount(id, { name, budget }) {
  return db("accounts")
    .where({ id })
    .update({ name, budget });
}

function deleteAccount(id) {
  // DELETE FROM users WHERE id = id;
  return db("accounts")
    .where({ id })
    .del();
}
