const express = require("express")
const moment = require("moment")
const bcrypt = require('bcrypt')
const Joi = require("joi")
const User = require("../models/users");
//게시판 모델
const Boards = require("../models/board");



//라우터 생성
const router = express.Router();




//유저관련

//회원가입 페이지
router.get("/users/join", async (req, res) => {
    res.render('join')
})


const postUsersSchema = Joi.object({
    userEmail: Joi.string().required(),
    nickName: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
})


router.post("/users/join", async (req, res) => {
    try {

        const { userEmail, nickName, password, confirmPassword } = await postUsersSchema.validateAsync(req.body);
        console.log(userEmail, nickName, password, confirmPassword)

        if (password !== confirmPassword) {
            res.status(400).json({
                success: false, msg: "비밀번호가 일치하지 않습니다."
            });
            return;
        }
        const existUsers = await User.find({
            $or: [{ userEmail }, { nickName }],
        });
        if (existUsers.length) {
            res.status(400).json({
                success: false, msg: "이미 가입된 이메일이나 닉네임이 있습니다."
            });
            return
        }
        const user = new User({ userEmail, nickName, password });
        await user.save()
        res.status(201).json({ success: true, msg: "회원가입 완료!" });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false, msg: "요청한 값이 틀립니다."
        });
    };
});







//로그인 페이지
router.get("/users/login", async (req, res) => {
    res.render('login')
})







// /board가 들어온다

// 전체 게시글 조회 
router.get("/", async (req, res) => {
    const boards = await Boards.find().sort({ date: -1 })
    res.status(200).render('board', { boards })

});

//작성페이지
router.get("/write", async (req, res) => {
    res.render('write')
});



//게시글 작성 
router.post("/write", async (req, res) => {
    const { title, content, userName, password } = req.body;
    // const maxboardId = await Boards.findOne().sort('-postId').exec();
    // const boardId = maxboardId ? maxboardId.boardId + 1 : 1;
    console.log(title, content, userName, password)

    const date = moment().format("YYYY-MM-DD HH:mm");

    const hashedPw = bcrypt.hashSync(password, 10);
    const createBoards = await Boards.create({
        title,
        content,
        userName,
        password: hashedPw,
        date,
    });

    res.status(201).json({ success: true, msg: "작성 완료!" })
});





// //게시글 삭제
router.delete("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { password } = req.body;
    const [board] = await Boards.find({ boardId: Number(boardId) })

    if (bcrypt.compareSync(password, board.password)) {
        await Boards.deleteOne({ boardId: Number(boardId) })
        return res.status(200).json({ msg: "게시글 삭제완료!", success: true })
    } else {
        return res.json({ msg: "비밀번호가 틀립니다", success: false })
    }

});


// //게시글 상세 조회 
router.get("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    //프론트에서 넘어온것
    const [board] = await Boards.find({ boardId: Number(boardId) })

    res.status(200).render('detail', {
        success: true,
        board
    });
});




// //수정하기로 가기 
router.get("/write/:boardId", async (req, res) => {
    const { boardId } = req.params
    const [board] = await Boards.find({ boardId: Number(boardId) })
    res.render('write', { board })
});


//게시글 수정 
router.put("/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { title, content, userName, password } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm");
    const [existBoard] = await Boards.find({ boardId: Number(boardId) })

    if (bcrypt.compareSync(password, existBoard.password)) {
        await Boards.updateOne({ boardId: Number(boardId) }, { $set: { title, content, userName, date } })
        return res.status(201).json({ msg: "수정 완료!", success: true })
    } else {
        return res.json({ msg: "비밀번호가 틀립니다!", success: false })
    }

});


module.exports = router;