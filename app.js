const express = require("express");
const connect = require("./models")
const helmet = require("helmet")
const cors = require("cors")
const app = express();
require('dotenv').config()



//ejs 세팅 
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
// app.use('/static', express.static(__dirname + '/public'));

//db연결
connect();

//라우터
const boardRouter = require("./routes/board");



// request미들웨어
const requestMiddleware = (req, res, next) => {
    console.log("Request URL: ", req.originalUrl, "- ", new Date());
    next();
}

//미들웨어 

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(requestMiddleware);
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use('/static', express.static(path.join(__dirname, '../static')));
app.use("/board", [boardRouter])

// app.use('/ejs에서접근할경로', express.static(path.join(__dirname, ' /실제위치한디렉토리경로')));  


//  /로 들어오는 애들을 /board로 바꾼다.
app.get("/", (req, res) => {
    res.redirect('/board')
})


//3000포트 받음 
app.listen(process.env.PORT, () => {
    console.log("서버 킴")
})