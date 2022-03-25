const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect(process.env.DB_URL, { ignoreUndefined: true }).catch((err) => {
        console.log(err)
    });
    console.log("DB 연결! ")
};

//app.js로 실행했을 때 사용할 수 있게 내보냄 
module.exports = connect;