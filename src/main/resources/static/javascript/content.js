let cur_username;

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getComments();
})


function getQuerystring(paramName) {
    let _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
    let _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기

    for (let i = 0; _tempArray.length; i++) {
        let _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기
        if (_keyValuePair[0] === paramName) { // _keyValuePair[0] : 파라미터 명 // _keyValuePair[1] : 파라미터 값
            return _keyValuePair[1];
        }
    }
}

function getComments(){
// 1. 기존 메모 내용을 지웁니다.
    let cur_id = getQuerystring("id");
    $('#comment-list').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: `/api/comments?id= ${cur_id}`,
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                console.log(response);
                let message = response[i];
                let id = message['id'];
                let contents = message['contents'];
                let username = message['username'];
                let comment = message['comment'];
                let modifiedAt = message['modifiedAt'];

                console.log(contents);

                addHTML(id, username, comment, modifiedAt);
            }
        }
    })

}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, username, comment, modifiedAt) {
    let temp_html;
    if (username === cur_username){
        temp_html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="${username}-card-editor" style="float: right">
                            <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onClick="editPost('${id}')">
                            <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onClick="deleteOne('${id}')">
                            <img id="${id}-done" class="icon-delete" src="images/done.png" alt="" onClick="doneOne('${id}')" style="display: none">
                        </div>
                        <div>
                            <strong style="font-family: 'Stylish', sans-serif; color:gray;">${username}</strong>
                            <span id="${id}-comment" style="font-family: 'Noto Serif KR', serif; color:black;">${comment}</span>
                        </div>
                        <div style="clear: both"></div>
                        <input id="${id}-edit-text-box" type="text" class="form-control" style="display: none">
                    </div>`
    }
    else{
        temp_html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="${username}-card-editor" style="float: right">
                        </div>
                        <div>
                            <strong style="font-family: 'Stylish', sans-serif; color:gray;">${username}</strong>
                            <span style="font-family: 'Noto Serif KR', serif; color:black;">${comment}</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>`
    }

    // 2. #cards-box 에 HTML을 붙인다.
    $('#comment-list').append(temp_html);
}

function onclickCommentRegistor(){
    if (cur_username === "guest")
    {
        if (window.confirm('로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?'))
        {
            window.location.href = "/user/login"
            return
        }
        else
        {
            return
            // They clicked no
        }
    }

    let cur_comment = $('#comment-comment').val();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(cur_comment) === false) {
        return;
    }

    let cur_id = getQuerystring("id");

    let data = {
        "username": cur_username,
        "comment" : cur_comment
    }
    $.ajax({
        type: "POST",
        url: `/api/comments?id=${cur_id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}

function getCurUsername(username){
    cur_username = username;
}

function editPost(id) {
    //수정 input, 아이콘 삭제 및 생성
    showEdits(id);

    //현재 댓글을 가져와서 수정란에 넣기
    let cur_comment = $(`#${id}-comment`).text().trim();
    $(`#${id}-edit-text-box`).val(cur_comment);
}

function showEdits(id) {
    $(`#${id}-edit`).hide();
    $(`#${id}-delete`).hide();
    $(`#${id}-done`).show();
    $(`#${id}-edit-text-box`).show();
}

function doneOne(id){
    let cur_comment = $(`#${id}-edit-text-box`).val();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(cur_comment) === false) {
        return;
    }

    // // 3. 전달할 data JSON으로 만듭니다.
    let data = {
        "comment": cur_comment
    }
    // // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/comments/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });

}

// 메모를 삭제합니다.
function deleteOne(id) {
    if (window.confirm('정말 삭제하시겠습니까?'))
    {
        // They clicked no
        $.ajax({
            type: "DELETE",
            url: `/api/comments/${id}`,
            success: function (response) {
                alert('메시지 삭제에 성공하였습니다.');
                window.location.reload();
            }
        })
    }
    else
    {
        // They clicked no
    }
}

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