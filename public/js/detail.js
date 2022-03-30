const { alternatives } = require("joi");


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
            if (response['success'] === true) {
                alert(response['msg'])
                window.location.href = "/board/" + boardId
            } else {
                alert(response['msg'])
            }
        },
        error: function (xhr, status, error) {
            if (status === 401) {
                alert("로그인 먼저 해주세요")
                window.location.href = "/user/auth"
            }
            else if (status === 400) {
                alert("로그인 먼저 해주세요!")

            }
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
function getCommentId(boardId) {
    let cid = localStorage.getItem("commentId")
    changeContet(cid, boardId);
}

function open_input() {
    $("#input_update_comment").toggle();
}



function changeContet(cid, boardId) {
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
                window.location.href = "/board/" + boardId
            } else {
                alert(response['msg'])
                localStorage.removeItem('commentId')
            }

        }

    })

}