

// function sign_up() {
//     const nickname = $("#inputNickname").val();
//     const email = $("#inputEmail").val();
//     const password1 = $("#inputPassword1").val();
//     const password2 = $("#inputPassword2").val();

//     $.ajax({
//       type: "POST",
//       url: "/api/users",
//       data: {
//         nickname: nickname,
//         email: email,
//         password: password1,
//         confirmPassword: password2,
//       },
//       success: function (response) {
//         customAlert("회원가입을 축하드립니다!", function () {
//           window.location.replace("/");
//         });
//       },
//       error: function (error) {
//         customAlert(error.responseJSON.errorMessage);
//       },
//     });
//   }
//   function customAlert(text, confirmCallback) {
//     $("#alertText").text(text);
//     $("#alertModal").modal("show");
//     if (confirmCallback) {
//       $("#alertModal .btn-confirm").click(confirmCallback);
//     }
//   }


function joinBoard() {
    const userEmail = $("#userEmail").val()
    const nickName = $("#nickName").val()
    const password = $("#password").val()
    const confirmPassword = $("#confirmPassword").val()
    console.log("join")

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
                window.location.href = '/board'
            }
            else {
                alert(response['msg'])
            }
        }
    })
}
