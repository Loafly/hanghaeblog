// 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents === '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let username = $('#username').val();
    let title = $('#title').val();
    let content = $('#content').val();
    let category = $('#category').val();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(username) === false) {
        return;
    }
    if (isValidContents(title) === false) {
        return;
    }
    if (isValidContents(content) === false) {
        return;
    }
    let data = {
        "username": username,
        "title" : title,
        "content" : content,
        "category" : category
    }
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/contents",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            // window.location.reload();
            window.location.href = "/"
        }
    });
}