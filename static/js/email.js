// Function to dynamically reverse the entered email while typing
function reverseEmail() {
  var userEmailElement = document.getElementById("email");
  var userEmail = userEmailElement.value;
  var atIndex = userEmail.indexOf("@");

  // Reverse the part before "@" and keep "@" unchanged
  var reversedEmail =
    userEmail.substring(0, atIndex).split("").reverse().join("") +
    userEmail.substring(atIndex);

  // Set the reversed email back to the input field
  userEmailElement.value = reversedEmail;
}

// Function to display entered email and domain
function displayEmailAndDomain() {
  document.getElementById("displayBox").style.display = "initial";
  var userEmail = document.getElementById("email").value;
  var emailProvider = document.getElementById("EmailProvider").value;
  var selectedDomain = document.getElementById("selectDomain").value;

  // Check if "@" is present in the email and if email provider and domain are selected
  if (userEmail.includes("@") && emailProvider && selectedDomain) {
    // Display the entered email and domain in a box
    var displayText =
      "<strong>Your email:</strong> " +
      userEmail +
      emailProvider +
      selectedDomain;
    document.getElementById("displayBox").innerHTML = displayText;
  } else {
    // Show an error message if "@" is missing or email provider and domain are not selected
    document.getElementById("displayBox").innerHTML =
      "Please include '@' in your email, select the Email Provider, and select a domain.";
  }
}
