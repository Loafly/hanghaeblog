let cur_username;

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getContents();
    isLogin();

    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })
})

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

function isLogin(){
    if (cur_username === "guest"){
        console.log(cur_username)
        $('#login-after').hide();
        $('#login-pre').show();
    }
    else{
        $('#login-after').show();
        $('#login-pre').hide();
    }
}

function getCurUsername(username){
    cur_username = username;
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let username = $('#card-username').val();
    let title = $('#card-title').val();
    let content = $('#card-content').val();
    let category = $('#card-category').val();

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
    // // 3. 전달할 data JSON으로 만듭니다.
    let data = {
        "username": username,
        "title" : title,
        "content" : content,
        "category" : category
    }
    // // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/contents/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

// 수정 버튼을 눌렀을 경우 모달창을 띄워줌과 동시에 값을 넣어줍니다.
function editPost(id) {
    showEdits(id);
    let username = $(`#${id}-username`).text().trim();
    let category = $(`#${id}-category`).text().trim();
    let title = $(`#${id}-title`).text().trim();
    let content = $(`#${id}-content`).text().trim();

    $(`#card-username`).val(username.slice(5));
    $(`#card-category`).val(category.slice(1));
    $(`#card-title`).val(title);
    $(`#card-content`).val(content);
}

function showEdits(id) {
    $('#container').addClass('active');
    $('#btnModify').attr("onclick", `submitEdit(${parseInt(id)})`);
}

// 메모를 삭제합니다.
function deleteOne(id) {
    if (window.confirm('정말 삭제하시겠습니까?'))
    {
        // They clicked no
        $.ajax({
            type: "DELETE",
            url: `/api/contents/${id}`,
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

function searchContents(){
    let searchType = $('#searchType').val();
    let searchText = $('#searchText').val();
    $('#cards-box').empty();

    $.ajax({
        type: 'GET',
        url: '/api/contents',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id'];
                let username = message['username'];
                let title = message['title'];
                let content = message['content'];
                let category = message['category'];
                let modifiedAt = message['modifiedAt'];

                if (message[searchType].includes(searchText))
                {
                    addHTML(id, username, title, content, category, modifiedAt);
                }
            }
        }
    })
}

// 메모를 불러와서 보여줍니다.
function getContents(cur_category='none') {

    // 1. 기존 메모 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/contents',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id'];
                let username = message['username'];
                let title = message['title'];
                let content = message['content'];
                let category = message['category'];
                let modifiedAt = message['modifiedAt'];
                if (cur_category == 'none')
                {
                    addHTML(id, username, title, content, category, modifiedAt);
                }
                else
                {
                    if (category == cur_category)
                    {
                        addHTML(id, username, title, content, category, modifiedAt);
                    }
                }
            }
        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, username, title, content, category, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml;

    //현재 로그인되어있는 유저와 동일하다면 수정/삭제 기능 부여
    if (username == cur_username)
    {
        tempHtml = `<div class="card">
                        <div class="card-header">
                            <div class="card-header-is_closed" id="${username}-card-editor">
                                <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                                <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                            </div>
                        </div>
                        <div class="card-body" onclick=" location.href='/content?id=${id}'">
                            <div class="card-body-header">
                                <h1 id=${id}-title>${title}</h1>
                                <p class="card-body-hashtag" id=${id}-category>#${category}</p>
                                <p class="card-body-nickname" id=${id}-username>
                                    작성자: ${username}</p>
                            </div>
                            <p class="card-body-description" id=${id}-content>
                                ${content}
                            </p>
                
                            <div class="card-body-footer">
                                <hr style="margin-bottom: 8px; opacity: 0.5; border-color: #EF5A31">
                                <i class="reg_date"> ${modifiedAt} </i>
                            </div>
                        </div>
                    </div>`;
    }

    //현재 로그인되어있는 유저와 다르다면 수정/삭제 불가
    else{
        tempHtml = `<div class="card">
                        <div class="card-header">
                        </div>
                        <div class="card-body" onclick=" location.href='/content?id=${id}'">
                            <div class="card-body-header">
                                <h1 id=${id}-title>${title}</h1>
                                <p class="card-body-hashtag" id=${id}-category>#${category}</p>
                                <p class="card-body-nickname" id=${id}-username>
                                    작성자: ${username}</p>
                            </div>
                            <p class="card-body-description" id=${id}-content>
                                ${content}
                            </p>
                
                            <div class="card-body-footer">
                                <hr style="margin-bottom: 8px; opacity: 0.5; border-color: #EF5A31">
                                <i class="reg_date"> ${modifiedAt} </i>
                            </div>
                        </div>
                    </div>`;
    }

    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

function writeContent(){
    if (cur_username === "guest"){
        if (window.confirm('로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?'))
        {
            window.location.href = "/content/write"
        }
        else
        {
            // They clicked no
        }
    }
    else{
        window.location.href = "/content/write"
    }


}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
}
