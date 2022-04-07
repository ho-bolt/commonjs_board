function writeBoard() {


    let title = $('#title').val();
    let content = $('#content').val()

    if (title == "" || content == "") {
        alert("다 작성해주세요")
        return
    }

    $.ajax({
        type: "POST",
        url: "/board/write",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {

            title: title,
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
    let content = $('#content').val()


    $.ajax({
        type: "PUT",
        url: "/board/" + boardId,
        data: {
            title,
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
    $.ajax({

        type: "DELETE",
        url: "/board/" + boardId,
        data: {},

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



