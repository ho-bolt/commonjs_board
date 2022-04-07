// import * as dotenv from 'dotenv'

const express = require("express")
// import express from "express";
const connect = require("./db")
// import connect from "./db"
const helmet = require("helmet")
// import helmet from "helmet";
const cors = require("cors")
// import cors from "cors";
const swaggerUi = require("swagger-ui-express")
// import swaggerUi from "swagger-ui-express";
const swaggerFile = require("./swagger-output.json")
// import swaggerFile from "./swagger-output";
require('dotenv').config()

const app = express()

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
app.use(helmet({ contentSecurityPolicy: false }))
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: true }))
// app.use('/static', express.static(path.join(__dirname, '../static')));
app.use("/board", [boardRouter])
app.use("/users", [userRouter])

// app.use('/ejs에서접근할경로', express.static(path.join(__dirname, ' /실제위치한디렉토리경로')));  


//  /로 들어오면 /board로 가게 해라
app.get("/", (req, res) => {
    res.redirect('/board')
})

module.exports = app;
// export default app;