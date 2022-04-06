import { PORT, num } from "./env";
import "./db";
import "./models/board"
import "./models/users"
import app from "./server";


console.log("@@@", PORT)
function handleListening() {
    console.log(`서버 킴 localhost :${PORT}`)
}

app.listen(PORT, handleListening);