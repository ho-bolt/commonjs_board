const express = require("express");
const connect = require("./models")
const helmet = require("helmet")
const cors = require("cors")
const app = express();
require('dotenv').config()
const port = 3000;


//ejs 세팅 
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
// app.use('/static', express.static(__dirname + '/public'));

//db연결
connect();

//라우터
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user")


// request미들웨어
const requestMiddleware = (req, res, next) => {
    console.log("Request URL: ", req.originalUrl, "- ", new Date());
    next();
}



//미들웨어 
app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(requestMiddleware);
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.urlencoded({ extended: false }))
// app.use('/static', express.static(path.join(__dirname, '../static')));
app.use("/board", [boardRouter])
app.use("/users", [userRouter])


// app.use('/ejs에서접근할경로', express.static(path.join(__dirname, ' /실제위치한디렉토리경로')));  


//  /로 들어오면 /board로 가게 해라
app.get("/", (req, res) => {
    res.redirect('/board')
})



app.listen(port, () => {
    console.log("서버 킴")
})