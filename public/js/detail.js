

function comment(boardId) {
    let content = $("#content").val();

    $.ajax({
        type: "POST",
        url: "/board/comment",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            boardId,
            content,
        },

        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}


function delete_comment(commentId, boardId) {
    $.ajax({

        type: "DELETE",
        url: "/board/comment/" + commentId,
        data: {},

        success: function (response) {
            if (response['success'] === true) {
                alert(response['msg'])
                window.location.href = '/board/' + boardId
            } else {
                alert(response['msg'])
            }
        }
    })


}

function sendId(commentId) {
    localStorage.setItem("commentId", commentId);

}
function getCommentId() {
    let cid = localStorage.getItem("commentId")
    changeContet(cid);
}

function open_input() {
    $("#input_update_comment").toggle();
}



function changeContet(cid) {
    let content = $("#comment-content").val()
    $.ajax({
        type: "PATCH",
        url: "/board/comment/" + cid,
        data: {
            content,
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