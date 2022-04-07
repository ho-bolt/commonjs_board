// import { PORT, num } from "./env";
const { PORT } = require("./env")
require("./db")
// import "./db";
const app = require("./server")
// import app from "./server";


console.log("@@@", PORT)
function handleListening() {
    console.log(`서버 킴 localhost :${PORT}`)
}

app.listen(PORT, handleListening);