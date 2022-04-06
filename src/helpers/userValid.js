import Joi from "joi"
const PostUserSchema = {

    PostUser: async (req, res, next) => {
        const body = req.body;

        const userSchema = Joi.object().keys({
            userEmail: Joi.string().email().min(3).required(),
            nickName: Joi.string().min(3).max(30).alphanum().required(),
            password: Joi.string().min(4).required(),
            confirmPassword: Joi.ref('password'),
        })
        try {
            await userSchema.validateAsync(body)
        } catch (error) {
            return res.send({ 'msg': "닉네임은 최소 3글자 이상 비밀번호도 최소 4글자 이상 입력해주세요 " })
        }
        next();
    }
}





export default PostUserSchema
