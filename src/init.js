import "./db";
import "./models/board"
import "./models/users"
import app from "./server";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 3000;
console.log("@@@", PORT)
function handleListening() {
    console.log("서버 킴")
}

app.listen(PORT, handleListening);