const passwordDiv = document.getElementById("repeatPassword");
const firstButton = document.getElementById("firstPasswordSubmit");
const titleArr = [
  "Please enter your password again",
  "Please enter your password once more",
  "Sorry, but we need to confirm you are human; please enter the password again",
  "Sorry we lied, we need the password again",
  "Last time!",
];
let times = Math.round(Math.random() * (5 - 3) + 3);
let curr = 0;

let passwordEntered = "";

function reEnterPassword() {
  firstButton.removeEventListener("click", reEnterPassword);
  if (curr == 0) {
    passwordEntered = document.getElementById("passwordField").value;
  } else {
    if (
      document.getElementById("reEnterPasswordField").value != passwordEntered
    ) {
      alert("The password did not match");
      curr = 0;
    }
  }
  if (curr < times) {
    passwordDiv.innerHTML =
      `
        <br><p class="inputInstruction">` +
      titleArr[curr] +
      `
      </p>
      <br>
        <input
        id="reEnterPasswordField"
        type="password"
        class="textFields"
        value=""
        onselectstart="return false"
        oncut="return false"
        oncopy="return false"
        onpaste="return false"
        ondrag="return false"
        ondrop="return false" />
        <br />
        <button id="verifyPassword" class="GradBtn">
        Verify password
        </button>
    `;
  } else {
    passwordDiv.innerHTML = `<br><p class="inputInstruction">Your password has been verified</p>`;
  }
  curr += 1;
  document
    .getElementById("verifyPassword")
    .addEventListener("click", reEnterPassword);
}

firstButton.addEventListener("click", reEnterPassword);
