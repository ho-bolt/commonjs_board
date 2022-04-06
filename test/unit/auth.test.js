const userController = require("../../src/controller/userController");
const userModel = require("../../src/models/users");

userModel.create = jest.fn();


describe("User Controller Create", () => {

    it("회원가입이 되는 가?", () => {
        expect(typeof userController.postJoin).toBe("function")
    })
    it("유저모델을 가져오는 가? ", async () => {
        try {
            userController.postJoin();
            expect(userModel.create).toBeCalled();
        } catch (error) {
            throw Error()
        }

    })

})