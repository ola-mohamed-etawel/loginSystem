var usernameInput = document.getElementById("usernameInput");
var userEmailInput = document.getElementById("userEmailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var signupBtn = document.getElementById("signupBtn");

var usersinfo;

if (localStorage.getItem("users") == null) {
  //law awl mara yfta7
  usersinfo = [];
} //LAW KAN FATE7 ABL KEDA HATLT EL DATA
else {
  usersinfo = JSON.parse(localStorage.getItem("users"));
}
function signUp() {
  // EL SIGN UP MSH hait3ml law dol mat7aaoosh
  userInputsValidation();
  isExist(); //if mail mawgood? la msh mawgood

  if (userInputsValidation() == true && isExist() == false) {
    var user = {
      name: usernameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };

    usersinfo.push(user); //array of object
    localStorage.setItem("users", JSON.stringify(usersinfo)); // 3LSHAN A7WEL L STRING !! EL GET W EL SET BTA5OD STRING
    //confirmMsg
    var confirmMsg = document.getElementById("confirmMsg"); //success
    confirmMsg.classList.replace("d-none", "d-block");
    //signIn btn
    var signin = document.getElementById("signin");
    signin.classList.replace("d-none", "d-block");
  } else {
    var tryAgainMsg = document.getElementById("tryAgainMsg"); //sign up faild ..try again
    tryAgainMsg.classList.replace("d-none", "d-block");
  }
}

//////////////////////////////////////////////////////////
// . ==> any char
// * ==> any num
// ^ ==> start
// $ ==> end

/////////////////////
//userNameInputValidation

function usernameValidation() {
  var usernameAlert = document.getElementById("usernameAlert");

  var regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/; //olamhmd or ola mhmd

  //\s? y3ny momken y3ml space w momken la
  // (?)... y3ny optinal a7to aw laa ...momken aktb second name w momken laa
  if (regex.test(usernameInput.value) == true && usernameInput.value != "") {
    usernameInput.classList.add("is-valid");
    usernameInput.classList.remove("is-invalid");
    //is-valid && I=is-invalid ... clasat bootstrap
    usernameAlert.classList.replace("d-block", "d-none");

    return true;
  } else {
    usernameInput.classList.add("is-invalid");
    usernameInput.classList.remove("is-valid");
    usernameAlert.classList.replace("d-none", "d-block");

    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////
//userPasswordValidation

function userPasswordValidation() {
  //.{5,15}...==> any char mn 5 l 15 mara
  var regex = /^.{5,15}$/;
  var userPasswordAlert = document.getElementById("userPasswordAlert");

  if (
    regex.test(userPasswordInput.value) == true &&
    userPasswordInput.value != ""
  ) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    userPasswordAlert.classList.replace("d-block", "d-none"); // EL VALIDITION DONE

    return true;
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
    userPasswordAlert.classList.replace("d-none", "d-block"); // EL VALIDITION  NOT DONE

    return false;
  }
}
///////////////////////////////////////////////////////////////////////
//userEmailValidation
function userEmailValidation() {
  var userEmailAlert = document.getElementById("userEmailAlert");

  var regex = /@[a-z]{5,10}(\.com)$/;
  if (regex.test(userEmailInput.value) == true && userEmailInput.value != "") {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    userEmailAlert.classList.replace("d-block", "d-none");

    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
    userEmailAlert.classList.replace("d-none", "d-block");

    return false;
  }
}
////////////////////////////////////////////////////
//userInputsValidation
function userInputsValidation() {
  usernameValidation();
  userEmailValidation();
  userPasswordValidation();

  if (
    usernameValidation() == true &&
    userEmailValidation() == true &&
    userPasswordValidation() == true
  ) {
    return true;
  } else {
    return false;
  }
}

//isExist..... 3mlaha 3lshan a3raf el email elle da5al mawgood abl keda wala la

function isExist() {
  var accountExistMsg = document.getElementById("accountExistMsg");

  for (var i = 0; i < usersinfo.length; i++) {
    if (
      usersinfo[i].name.toLowerCase() == usernameInput.value.toLowerCase() ||
      usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()
    ) {
      accountExistMsg.classList.replace("d-none", "d-block"); //This account is Exis ! try another one.
      usernameInput.classList.remove("is-valid"); //invalid
      userEmailInput.classList.remove("is-valid"); //invalid
      userPasswordInput.classList.remove("is-valid"); //invalid

      return true;
    }
  }
  return false; // msh exist .. el email msh mawgood
}

//login

var username = localStorage.getItem("sessionUsername");
function login() {
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("loginPassword");
  let loginBtn = document.getElementById("loginBtn");
  let wrongMsg = document.getElementById("wrongMsg");

  if(loginEmail.value == "" || loginPassword.value == "") //empty value
  {
      let fillMsg = document.getElementById("fillMsg");
      fillMsg.classList.replace("d-none", "d-block");
      return false
  }

  for(var i = 0; i < usersinfo.length; i++)
  {
      if(usersinfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() && usersinfo[i].password.toLowerCase() == loginPassword.value.toLowerCase())
      {
          
          localStorage.setItem('sessionUsername', usersinfo[i].name)
          loginBtn.setAttribute("href", "welcome.html");
      }
      else
      {
          wrongMsg.classList.replace("d-none", "d-block");
      }
  }
  
}

//WELCOME BAGE
function displayWelcomeUser()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;

}
//LOGOUT
function logout() {
    localStorage.removeItem('sessionUsername')
}
