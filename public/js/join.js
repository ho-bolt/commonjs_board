



function joinBoard() {
    const userEmail = $("#userEmail").val()
    const nickName = $("#nickName").val()
    const password = $("#password").val()
    const confirmPassword = $("#confirmPassword").val()
    console.log("join")
    if (password.search(nickName) > -1) return alert('비밀번호에 닉네임이 포함되어 있습니다.')
    if (password.search(userEmail) > -1) return alert('비밀번호에 이메일 아이디가 포함되어 있습니다.')

    $.ajax({
        type: "POST",
        url: "/users/join",
        data: {
            userEmail: userEmail,
            nickName: nickName,
            password: password,
            confirmPassword: confirmPassword,
        },
        success: function (response) {
            console.log("eee")
            if (response['success'] === true) {
                alert(response['msg'])
                window.location.href = '/users/auth'
            }
            else {
                alert(response['msg'])
            }
        }
    })
}
