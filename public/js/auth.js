

//로그인
function authBoard() {
    let userEmail = $("#userEmail").val();
    let password = $("#password").val();
    $.ajax({
        type: "POST",
        url: "/users/auth",
        data: {
            userEmail: userEmail,
            password: password,
        },
        success: function (response) {
            if (response['success'] === true) {
                localStorage.setItem("token", response['token']);
                alert(response['msg'])
                window.location.replace("/board");
            } else {
                alert(response['msg'])
            }

        },

    });
}





