// import { PORT, num } from "./env";
const { PORT } = require("./env")
require("./db")
// import "./db";
const app = require("./server")
// import app from "./server";


console.log("@@@", "3000")
function handleListening() {
    console.log("서버 킴 localhost :3000")
}

app.listen(3000, handleListening);