const express = require("express");
const accountRoutes = require("./accounts/account-routes");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/accounts", accountRoutes);

module.exports = server;
