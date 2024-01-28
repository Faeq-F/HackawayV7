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
  if (curr == 0) {
    passwordEntered = document.getElementById("passwordField").value;
    displayEmailAndDomain();
    if (
      document.getElementById("displayBox").innerHTML ==
      "Please include '@' in your email, select the Email Provider, and select a domain."
    ) {
      curr = 0;
      return;
    }
    firstButton.removeEventListener("click", reEnterPassword);
    firstButton.style.display = "none";
  } else {
    if (
      document.getElementById("reEnterPasswordField").value != passwordEntered
    ) {
      passwordEntered = "";
      curr = 0;
      alert("The password did not match");
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
    passwordDiv.innerHTML = `
    <br><p class="inputInstruction">Your password has been verified</p>
    <br><br>
        <form action="." method="POST">
    <input type="submit" class="GradBtn" id="finalButton" value="Continue">
    </form>
    `;
    document
      .getElementById("finalButton")
      .addEventListener("click", finalCheck);
  }
  curr += 1;
  document
    .getElementById("verifyPassword")
    .addEventListener("click", reEnterPassword);
}

firstButton.addEventListener("click", reEnterPassword);

function finalCheck() {
  // Get selected country code
  var country = document.getElementById("country").value;
  var countryCode = country;

  // Get phone number
  var digits = [];
  for (var i = 1; i <= 10; i++) {
    digits.push(document.getElementById("digit" + i).value);
  }
  var phoneNumber = digits.join("");

  // Get date of birth
  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var dob = day + "/" + month + "/" + year;

  // Display information
  var message =
    `
    Check your details:

    Your phone number:\n    ` +
    countryCode +
    " " +
    phoneNumber +
    "\n\n    Your Date of Birth:\n    " +
    dob +
    "\n\n    " +
    document
      .getElementById("displayBox")
      .innerHTML.replace("<strong>", "")
      .replace("</strong>", "");
  let goToGame = confirm(message);

  if (goToGame) {
    console.log("Flask time!");
  }
}
