let id = document.querySelector('#id');
let error=document.querySelectorAll('.error_next_box');
let pw1 =document.querySelector('#psw1');
let pwImg1=document.querySelector('#pswd1_img1');
let pwMsg = document.querySelector('#alertTxt')
let pw2=document.querySelector('#pswd2');
let pwImg2=document.querySelector('#pswd2_img1')
let username=document.querySelector('#name');
let yy = document.querySelector("#yy");
let mm = document.querySelector("#mm");
let dd = document.querySelector("#dd");
let gender=document.querySelector("#gender")
let email=document.querySelector('#email');
let mobile=document.querySelector('#phoneNo');

console.log(error)


// id.addEventListener('focusout',function(){
//    //이밴트 핸들러
// }

id.addEventListener('focusout',checkId)
pw1.addEventListener('focusout',checkPw)
pw2.addEventListener('focusout',comparePw)
username.addEventListener('focusout',checkName)
yy.addEventListener('focusout',isBirthCompleted)
mm.addEventListener('focusout',isBirthCompleted)
dd.addEventListener('focusout',isBirthCompleted)
gender.addEventListener('focusout',function(){
    if(gender.value == "성별"){
        error[5].style.display="block";
    }else{
        error[5].style.display="none";
    }
})
email.addEventListener('focusout',isEmailCorrect)
mobile.addEventListener('focusout',checkPhoneNum)
//error[0].innerHTML="글자수정"


function checkId(){
  var idPattern = /^[a-zA-Z0-9_-]{5,20}$/;
  console.log(idPattern.test(id.value))
  if(id.value === ""){
    error[0].innerHTML="필주 정보입니다."
    error[0].style.display="block";
    error[0].style.color="#f00";
  }else if(!idPattern.test(id.value)){
    error[0].innerHTML="5~20자의 영문 소문자, 대문자,숫자와 특수기호(_),(-)만 사용가능합니다."
    error[0].style.display="block";
  }else{
    error[0].innerHTML="멋진 아이디네요";
    error[0].style.color="#80a600";
    error[0].style.display="block";
  }
}

function checkPw(){
    let pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/;

    if(pw1.value === ""){
        error[1].innerHTML="필수 정보입니다.";
        error[1].style.display="block";
        pwImg1.src="img/m_icon_not_use.png";
        pwMsg.style.display="none"
    }else if(!pwPattern.test(pw1.value)){
        error[1].innerHTML="8~16자 영문, 대소문자, 숫자, 특수문자를 사용하세요";
        error[1].style.display="block";
        pwMsg.style.display="block"
        pwImg1.src="img/m_icon_not_use.png";
        pwMsg.innerHTML="사용불가";
        pwMsg.style.color="#f00";
    }else{
        error[1].style.display="none"
        pwMsg.innerHTML="안전";
        pwMsg.style.display="block";
        pwMsg.style.color="#03c75a";
        pwImg1.src="img/m_icon_safe.png"
    }

}

function comparePw(){
  if(pw2.value === pw1.value &&  pw2.value != ""){
    pwImg2.src="img/m_icon_check_enable.png"
    error[2].style.display="none"
  }else if(pw2.value !== pw1.value){
    pwImg2.src="img/m_icon_check_disable.png"
    error[2].style.display="block"
    error[2].innerHTML="비밀번호가 일치하지 않습니다.";
  }
  if(pw2.value == ""){
    error[2].innerHTML="필수 정보입니다.";
    error[2].style.display="block";
  }
}

function checkName(){
    let namePattern=/^[a-zA-Z가-힣]*$/;

    if(username.value == ""){
        error[3].innerHTML="필수 정보입니다.";
        error[3].style.display="block";
    }else if(!namePattern.test(username.value) || username.value.indexOf(" ")>-1){
        error[3].innerHTML="한글과 영문 대소문자를 이용하세요(특수기호, 공백 사용 불가)";
        error[3].style.display="block";
    }else{
        error[3].style.display="none";
    }
}

function isBirthCompleted(){
    let yearPattern=/[0-9]{4}/;
    if(!yearPattern.test(yy.value)){
        error[4].innerHTML="태어난 년도 4자리를 정확하게 입력하세요."
        error[4].style.display="block";
    }else{
        error[4].style.display="none"; 
        //년도가 맞다면 월을 체크한다
        isMonthCompleted();
    }

    function isMonthCompleted(){
        console.log(mm.value)
        if(mm.value == "월"){
            error[4].innerHTML="태어난 월을 선택하세요"
            error[4].style.display="block";
        }else{
            //월까지 제대로 선택했다면 생일을 체크하기
            isDateCompleted();
        }
    }

    function isDateCompleted(){
        console.log(dd.value)
        if(dd.value == ""){
            error[4].innerHTML="태어난 일(날짜) 2자리를 정확하게 입력하세요."
            error[4].style.display="block";
        }else{
            //생일날짜를 1~31일 사이에 오도록 체크하기
            isBirthRight();
        }
    }

    function isBirthRight(){
        let datePattern = /\d{1,2}/;
        console.log(typeof(dd.value))//typeof 자료형검사//string(문자),number(숫자)..
        if(!datePattern.test(dd.value) || Number(dd.value)<1 ||Number(dd.value)>31){
            error[4].innerHTML="생년월일을 다시 확인해 주세요"
            error[4].style.display="block";
        }else{
            checkAge();
        }
    }

    function checkAge(){
        if(Number(yy.value)<1920){
            error[4].innerHTML="년도를 다시입력하세요";
            error[4].style.display="block";
        } else if(Number(yy.value)>2023){
            error[4].innerHTML="년도를 다시입력하세요";
            error[4].style.display="block";
        }else{
            error[4].style.display="none"; 
        }

        if(Number(yy.value)>2010 && Number(yy.value)<=2023){
            error[4].innerHTML="만 14세 미만의 어린이는 보호자 동의가 필요합니다.";
            error[4].style.display="block"; 
        }
    }

}


function isEmailCorrect(){
    var emailPattern=/[a-zA-Z0-9_]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/;
    if(email.value == ""){
        error[6].style.display="none";
    }else if(!emailPattern.test(email.value)){
        error[6].style.display="block";
        email.value = null;
        email.focus();
    }else{
        error[6].style.display="none";
    }
}


function checkPhoneNum(){
    let isPhoneNum=/^([01]{2})([01679]{1})([0-9]{3,4})([0-9]{4})$/;
    if(mobile.value == ""){
        error[7].innerHTML="필수 정보입니다."
        error[7].style.display="block";
    }else if(!isPhoneNum.test(mobile.value)){
        error[7].innerHTML="형식에 맞지 않는 번호입니다."
        error[7].style.display="block";
    }else{
        error[7].style.display="none";
    }
}