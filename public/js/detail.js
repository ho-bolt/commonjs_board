

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

// function writeBoard() {


//     let title = $('#title').val();
//     let content = $('#content').val()

//     if (title == "" || content == "") {
//         alert("다 작성해주세요")
//         return
//     }

//     $.ajax({
//         type: "POST",
//         url: "/board/write",
//         headers: {
//             authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         data: {

//             title: title,
//             content: content
//         },

//         success: function (response) {
//             alert(response['msg'])
//             window.location.href = '/board'
//         }
//     })
// }
