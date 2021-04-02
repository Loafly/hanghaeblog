function onclickAdmin() {
    // Get the checkbox
    var checkBox = document.getElementById("admin-check");
    // Get the output text
    var box = document.getElementById("admin-token");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

function isValid(username,password, password_check) {
    if (username == '' ){
        alert('닉네임을 입력해주세요.');
        return false
    }

    if (password == ''){
        alert('패스워드를 입력해주세요.');
        return false
    }

    if(username.trim().length < 3){
        alert('닉네임을 3글자 이상으로 입력해주세요.');
        return false
    }

    if(password.trim().length < 4){
        alert('패스워드를 4글자 이상으로 입력해주세요.');
        return false
    }

    if(username.includes(password) || password.includes(username)){
        alert('패스워드가 아이디 일부분과 중복되는 부분이 있습니다.');
        return false
    }

    if (password !== password_check){
        alert('패스워드와 패스워드 확인이 다릅니다.');
        return false
    }

    console.log(password)

    return true;
}

function onclickSignup(){
    let username = $('#signup-username').val();
    let password = $('#signup-password').val();
    let password_check = $('#signup-password-check').val();

    let cur_form = $('#signup-form')

    if (isValid(username, password, password_check) === false){
        return
    }

    cur_form.attr("method", "POST")
    cur_form.attr("action", "/user/signup")

    console.log(cur_form);


}
