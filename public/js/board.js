

if (localStorage.getItem("token")) {
    getSelf(function () {
        alert("이미 로그인이 되어있습니다. 상품 페이지로 이동합니다.");
        window.location.replace("/goods.html");
    });
}