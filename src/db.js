import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const DB = process.env.DB_URL;
console.log("#######", DB)

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/spa_blog', { ignoreUndefined: true }).catch((err) => {
        console.log(err)
    });
    console.log("DB 연결! ")
};

//app.js로 실행했을 때 사용할 수 있게 내보냄 
module.exports = connect;