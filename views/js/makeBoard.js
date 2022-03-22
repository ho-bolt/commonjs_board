//작성
function writeBoard() {
    let title = $('#title').val();
    let userName = $('#userName').val()
    let password = $('#password').val()
    let content = $('#content').val()

    $.ajax({
        type: "POST",
        url: "/board",
        data: {
            title: title,
            userName: userName,
            password: password,
            content: content
        },
        success: function (response) {
            alert(response['msg'])
            window.location.href = '/board'
        }
    })
}

//삭제
function deleteBoard() {
    let password = $('#password').val()
    $.ajax({

        type: "DELETE",
        url: "/board/" + boardId,
        data: { password },

        success: function (response) {
            if (response['success'] === true) {
                alert(response['msg'])
                window.location.href = '/board'
            } else {
                alert(response['msg'])
            }

        }

    })
}


//수정
function updateBoard() {
    let title = $('#title').val()
    let userName = $('#userName').val()
    let password = $('#password').val()
    let content = $('#content').val()


    $.ajax({
        type: "PUT",
        url: "/board/" + boardId,
        data: {

            title,
            userName,
            password,
            content
        },

        success: function (response) {
            if (response['success'] === true) {
                alert(response['msg'])
                window.location.href = "/board"
            } else {
                alert(response['msg'])
            }

        }

    })
}