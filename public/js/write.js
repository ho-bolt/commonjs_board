function writeBoard() {
    let title = $('#title').val();
    let userName = $('#userName').val()
    let password = $('#password').val()
    let content = $('#content').val()

    if (title == "" || userName == "" || password == "" || content == "") {
        alert("다 작성해주세요")
        return
    }
    console.log(1)
    $.ajax({
        type: "POST",
        url: "/board/write",
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

function updateBoard(boardId) {
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

function deleteBoard(boardId) {
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