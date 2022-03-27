

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
                console.log(response['token'])
                alert(response['msg'])
                window.location.replace("/board");
            } else {
                alert(response['msg'])
            }

        },

    });
}

// //토큰 검증
// function getSelf() {
//     $.ajax({
//         type: "GET",
//         url: "/users/auth/me",
//         headers: {
//             authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         success: function (response) {
//             console.log('me 왔다')
//             console.log(response.user);
//         },
//         error: function (xhr, status, error) {
//             if (status == 401) {
//                 alert("로그인이 필요합니다.");
//             } else {
//                 localStorage.clear();
//                 alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
//             }
//             window.location.href = "/";
//         },
//     });
// }




function logout() {
    localStorage.clear()
    window.location.href = "/board"
}