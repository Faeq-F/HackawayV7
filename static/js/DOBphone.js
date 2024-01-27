document.addEventListener("DOMContentLoaded", function () {
  // Simulate slow motion effect for country dropdown
  var countries = [
    "United States (+1)",
    "Canada (+1)",
    "United Kingdom (+44)",
    "Australia (+61)",
    "Germany (+49)",
    "France (+33)",
    "China (+86)",
    "India (+91)",
    "Japan (+81)",
    "Brazil (+55)",
    "Mexico (+52)",
    "Argentina (+54)",
    "Spain (+34)",
    "Italy (+39)",
    "South Korea (+82)",
    "Russia (+7)",
    "Netherlands (+31)",
    "Turkey (+90)",
    "Indonesia (+62)",
    "Saudi Arabia (+966)",
    "Switzerland (+41)",
    "Sweden (+46)",
    "Norway (+47)",
    "Belgium (+32)",
    "Poland (+48)",
    "Denmark (+45)",
    "Finland (+358)",
    "Greece (+30)",
    "Portugal (+351)",
    "Austria (+43)",
    "Ukraine (+380)",
    // Add more countries as needed
  ];
  var countrySelect = document.getElementById("country");
  countries.forEach(function (country) {
    var option = document.createElement("option");
    option.text = country;
    option.value = country.split(" ")[1].slice(1, -1); // Extract the country code
    countrySelect.add(option);
  });

  // Simulate slow motion effect for digit dropdowns
  var digitSelects = document.querySelectorAll("[id^=digit]");
  digitSelects.forEach(function (digitSelect) {
    var options = [];
    for (var i = 0; i <= 9; i++) {
      options.push(i);
    }
    options = shuffleArray(options); // Randomly shuffle options
    options.forEach(function (option) {
      var optionElem = document.createElement("option");
      optionElem.text = option;
      optionElem.value = option;
      digitSelect.add(optionElem);
    });
  });

  // Update range slider values for date of birth
  var daySlider = document.getElementById("day");
  var monthSlider = document.getElementById("month");
  var yearSlider = document.getElementById("year");
  var dayValue = document.getElementById("dayValue");
  var monthValue = document.getElementById("monthValue");
  var yearValue = document.getElementById("yearValue");

  daySlider.addEventListener("input", function () {
    dayValue.textContent = this.value;
  });

  monthSlider.addEventListener("input", function () {
    monthValue.textContent = this.value;
  });

  yearSlider.addEventListener("input", function () {
    yearValue.textContent = this.value;
  });
});

document
  .getElementById("mobileNumberForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //alert(message);
  });

// Function to shuffle array elements randomly
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
