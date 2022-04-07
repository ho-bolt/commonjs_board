const jwt = require("jsonwebtoken")
const { User } = require("../../models")
const key = process.env.SECERTKEY

/*
    00:로그인 성공
    10:토큰없음 (로그인 정보 없음)
    11: 토큰에 담겨있는 정보와 맞는 db없음
*/


module.exports = async (req, res, next) => {

    const { authorization } = req.headers;


    //토큰 검증 
    //복호화 되면 유효한 토큰
    try {

        if (!authorization) {
            res.locals.authResult = "10"
        } else {
            try {
                const [tokenType, tokenValue] = authorization.split(' ');
                const { userNum, nickName } = jwt.verify(tokenValue, key);
                console.log("!!!!!!!!", userNum, nickName)
                //db에서 해당 userId와 맞는 유저 찾아서 그 유저를 locals에 넣어준다.
                const existUser = await User.findOne({ where: { userNum, nickName } });
                console.log("@@@@@@@@", existUser)
                if (!existUser) res.locals.authResult = "11";
                else {
                    res.locals.user = existUser;
                    res.locals.authResult = "00";
                }

            } catch (err) {
                console.log(err)

            }

        }
        next();
        //검증 실패시
    } catch {
        res.status(401).json({
            error: "로그인 먼저 해주세요!"
        });
        return;
    }

};