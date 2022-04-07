// import dotenv from "dotenv";
// dotenv.config();
require('dotenv').config()

const PORT = process.env.PORT;
const key = process.env.SECERTKEY;
const saltNum = process.env.SALTNUM;

module.exports = { PORT, key, saltNum }