
...

<tr><td>Desired Salary</td><td>$${parseInt(salary).toLocaleString()}</td><td>✅</td></tr>
  // date of birth validation
const dobField = document.querySelector('input[name="dob"]');
const dobError = document.createElement("div");
dobError.style.color = "red";
dobError.style.fontSize = "0.9em";
dobError.id = "dobError";
dobField.parentNode.appendChild(dobError);

dobField.addEventListener("blur", function() {
    const value = dobField.value;
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;

    if (!pattern.test(value)) {
        dobError.textContent = "Date of birth must be in MM/DD/YYYY format.";
        return;
    }

    // validate reasonable date
    const [month, day, year] = value.split("/").map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    const oldest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

    if (dobDate > today) {
        dobError.textContent = "Date of birth cannot be in the future.";
    } else if (dobDate < oldest) {
        dobError.textContent = "Date of birth cannot be more than 120 years ago.";
    } else {
        dobError.textContent = "";
    }
});

// validate sex radio
if (!document.querySelector('input[name="sex"]:checked')) {
  alert("Please select your sex.");
  return;
}

// validate vaccinated radio
if (!document.querySelector('input[name="vaccinated"]:checked')) {
  alert("Please indicate if you are vaccinated.");
  return;
}

// validate insurance radio
if (!document.querySelector('input[name="insurance"]:checked')) {
  alert("Please indicate if you have insurance.");
  return;
}

// validate language radio
if (!document.querySelector('input[name="language"]:checked')) {
  alert("Please select your language preference.");
  return;
}

  // validate at least one checkbox for conditions
const checkedConditions = document.querySelectorAll('input[name="conditions"]:checked');
if (checkedConditions.length === 0) {
  alert("Please select at least one condition (check at least one box).");
  return;
}
  
  // SSN / ID validation
const ssnField = document.querySelector('input[name="ssn"]');
const ssnError = document.createElement("div");
ssnError.style.color = "red";
ssnError.style.fontSize = "0.9em";
ssnError.id = "ssnError";
ssnField.parentNode.appendChild(ssnError);

ssnField.addEventListener("input", function() {
    let value = ssnField.value.replace(/\D/g, ""); // strip non-digits
    if (value.length > 9) value = value.slice(0,9);

    // add formatting
    if (value.length > 5) {
        value = value.replace(/(\d{3})(\d{2})(\d{0,4})/, "$1-$2-$3");
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{0,2})/, "$1-$2");
    }
    ssnField.value = value;
});

ssnField.addEventListener("blur", function() {
    const digitsOnly = ssnField.value.replace(/\D/g, "");
    if (digitsOnly.length !== 9) {
        ssnError.textContent = "SSN/ID must be exactly 9 digits.";
    } else {
        ssnError.textContent = "";
    }
});
  
  // collect ALL form values
  let firstName = document.querySelector('input[name="firstName"]').value;
  let lastName = document.querySelector('input[name="lastName"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let userID = document.querySelector('input[name="userID"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  let sex = document.querySelector('input[name="sex"]:checked')?.value || "Not answered";
  let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "Not answered";
  let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "Not answered";
  let address = document.querySelector('input[name="address"]').value;
  let city = document.querySelector('input[name="city"]').value;
  let state = document.querySelector('select[name="state"]').value;
  let zip = document.querySelector('input[name="zip"]').value;
  let language = document.querySelector('input[name="language"]:checked')?.value || "Not answered";
  let health = document.querySelector('input[name="health"]').value;
  let conditions = Array.from(document.querySelectorAll('input[name="conditions"]:checked')).map(el => el.value).join(", ") || "None";
  let passwordMasked = document.querySelector('input[name="password"]').value.replace(/./g, "*");

  // build review table
  let reviewContent = `
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr><th>Field</th><th>Value</th><th>Status</th></tr>
      <tr><td>First Name</td><td>${firstName}</td><td>✅</td></tr>
      <tr><td>Last Name</td><td>${lastName}</td><td>✅</td></tr>
      <tr><td>User ID</td><td>${userID}</td><td>✅</td></tr>
      <tr><td>Password</td><td>${passwordMasked}</td><td>✅</td></tr>
      <tr><td>Email</td><td>${email}</td><td>✅</td></tr>
      <tr><td>Phone</td><td>${phone}</td><td>✅</td></tr>
      <tr><td>Date of Birth</td><td>${dob}</td><td>✅</td></tr>
      <tr><td>Sex</td><td>${sex}</td><td>✅</td></tr>
      <tr><td>Vaccinated</td><td>${vaccinated}</td><td>✅</td></tr>
      <tr><td>Insurance</td><td>${insurance}</td><td>✅</td></tr>
      <tr><td>Address</td><td>${address}</td><td>✅</td></tr>
      <tr><td>City</td><td>${city}</td><td>✅</td></tr>
      <tr><td>State</td><td>${state}</td><td>✅</td></tr>
      <tr><td>Zip</td><td>${zip}</td><td>✅</td></tr>
      <tr><td>Language</td><td>${language}</td><td>✅</td></tr>
      <tr><td>Health (1–10)</td><td>${health}</td><td>✅</td></tr>
      <tr><td>Conditions</td><td>${conditions}</td><td>✅</td></tr>
    </table>
  `;

  document.getElementById('reviewContent').innerHTML = reviewContent;
}

// hook up the Review button AND the slider
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reviewBtn').addEventListener('click', reviewForm);
  
// userID field validation
const userIDField = document.querySelector('input[name="userID"]');
const userIDError = document.createElement("div");
userIDError.style.color = "red";
userIDError.style.fontSize = "0.9em";
userIDError.id = "userIDError";
userIDField.parentNode.appendChild(userIDError);

userIDField.addEventListener("blur", function() {
    const value = userIDField.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;

    if (!pattern.test(value)) {
        userIDError.textContent = "User ID must be 5–20 characters, start with a letter, only letters/numbers/dash/underscore, no spaces.";
    } else {
        userIDError.textContent = ""; // clear error
    }
});

  // first name validation
const firstNameField = document.querySelector('input[name="firstName"]');
const firstNameError = document.createElement("div");
firstNameError.style.color = "red";
firstNameError.style.fontSize = "0.9em";
firstNameError.id = "firstNameError";
firstNameField.parentNode.appendChild(firstNameError);

firstNameField.addEventListener("blur", function() {
    const value = firstNameField.value;
    const pattern = /^[A-Za-z'-]{1,30}$/;

    if (!pattern.test(value)) {
        firstNameError.textContent = "First name must be 1–30 characters, letters, apostrophes, or dashes only.";
    } else {
        firstNameError.textContent = "";
    }
});

  // middle initial validation
const middleInitialField = document.querySelector('input[name="middleInitial"]');
const middleInitialError = document.createElement("div");
middleInitialError.style.color = "red";
middleInitialError.style.fontSize = "0.9em";
middleInitialError.id = "middleInitialError";
middleInitialField.parentNode.appendChild(middleInitialError);

middleInitialField.addEventListener("blur", function() {
    const value = middleInitialField.value;
    const pattern = /^[A-Za-z]?$/;

    if (value && !pattern.test(value)) {
        middleInitialError.textContent = "Middle initial must be a single letter or left blank.";
    } else {
        middleInitialError.textContent = "";
    }
});
  
  // last name validation
const lastNameField = document.querySelector('input[name="lastName"]');
const lastNameError = document.createElement("div");
lastNameError.style.color = "red";
lastNameError.style.fontSize = "0.9em";
lastNameError.id = "lastNameError";
lastNameField.parentNode.appendChild(lastNameError);

lastNameField.addEventListener("blur", function() {
    const value = lastNameField.value;
    const pattern = /^[A-Za-z2-5'-]{1,30}$/;

    if (!pattern.test(value)) {
        lastNameError.textContent = "Last name must be 1–30 characters, letters, apostrophes, dashes, or numbers 2–5 only.";
    } else {
        lastNameError.textContent = "";
    }d
  
});

  // DOB validation
const dobField = document.querySelector('input[name="dob"]');
const dobError = document.createElement("div");
dobError.style.color = "red";
dobError.style.fontSize = "0.9em";
dobError.id = "dobError";
dobField.parentNode.appendChild(dobError);

dobField.addEventListener("blur", function() {
    const value = dobField.value;
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;

    if (!pattern.test(value)) {
        dobError.textContent = "Use MM/DD/YYYY format.";
        return;
    }

    const [month, day, year] = value.split("/").map(x => parseInt(x, 10));
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    const oldest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

    if (dobDate > today) {
        dobError.textContent = "Date of birth cannot be in the future.";
    } else if (dobDate < oldest) {
        dobError.textContent = "Date of birth cannot be more than 120 years ago.";
    } else {
        dobError.textContent = "";
    }
});

  // SSN validation with formatting
const ssnField = document.querySelector('input[name="ssn"]');
const ssnError = document.createElement("div");
ssnError.style.color = "red";
ssnError.style.fontSize = "0.9em";
ssnError.id = "ssnError";
ssnField.parentNode.appendChild(ssnError);

ssnField.addEventListener("input", function() {
    let digits = ssnField.value.replace(/\D/g, ""); // remove non-numbers
    if (digits.length > 9) digits = digits.slice(0,9);

    let formatted = "";
    if (digits.length > 5) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3,5)}-${digits.slice(5)}`;
    } else if (digits.length > 3) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
    } else {
        formatted = digits;
    }
    ssnField.value = formatted;
});

ssnField.addEventListener("blur", function() {
    const pattern = /^\d{3}-\d{2}-\d{4}$/;
    if (!pattern.test(ssnField.value)) {
        ssnError.textContent = "SSN must be 9 digits in format XXX-XX-XXXX.";
    } else {
        ssnError.textContent = "";
    }
});
  
  // address line 1 validation
const addressField = document.querySelector('input[name="address"]');
const addressError = document.createElement("div");
addressError.style.color = "red";
addressError.style.fontSize = "0.9em";
addressError.id = "addressError";
addressField.parentNode.appendChild(addressError);

addressField.addEventListener("blur", function() {
    const value = addressField.value.trim();
    const pattern = /^[A-Za-z0-9\s.,'-]{2,30}$/;

    if (!pattern.test(value)) {
        addressError.textContent = "Address must be 2–30 characters: letters, numbers, spaces, . , ' - only.";
    } else {
        addressError.textContent = "";
    }
});

  // address line 2 validation
const address2Field = document.querySelector('input[name="address2"]');
if (address2Field) {  // in case you add it later
  const address2Error = document.createElement("div");
  address2Error.style.color = "red";
  address2Error.style.fontSize = "0.9em";
  address2Error.id = "address2Error";
  address2Field.parentNode.appendChild(address2Error);

  address2Field.addEventListener("blur", function() {
      const value = address2Field.value.trim();
      const pattern = /^[A-Za-z0-9\s.,'-]{2,30}$/;

      if (value.length > 0 && !pattern.test(value)) {
          address2Error.textContent = "Address Line 2 must be 2–30 characters if provided.";
      } else {
          address2Error.textContent = "";
      }
  });
}
  
  // city validation
const cityField = document.querySelector('input[name="city"]');
const cityError = document.createElement("div");
cityError.style.color = "red";
cityError.style.fontSize = "0.9em";
cityError.id = "cityError";
cityField.parentNode.appendChild(cityError);

cityField.addEventListener("blur", function() {
    const value = cityField.value.trim();
    const pattern = /^[A-Za-z\s'-]{2,30}$/;

    if (!pattern.test(value)) {
        cityError.textContent = "City must be 2–30 characters, letters, spaces, apostrophes, or dashes only.";
    } else {
        cityError.textContent = "";
    }
});

  // state validation
const stateField = document.querySelector('select[name="state"]');
const stateError = document.createElement("div");
stateError.style.color = "red";
stateError.style.fontSize = "0.9em";
stateError.id = "stateError";
stateField.parentNode.appendChild(stateError);

stateField.addEventListener("blur", function() {
    if (stateField.value === "") {
        stateError.textContent = "Please select a valid state.";
    } else {
        stateError.textContent = "";
    }
});

  // zip code validation
const zipField = document.querySelector('input[name="zip"]');
const zipError = document.createElement("div");
zipError.style.color = "red";
zipError.style.fontSize = "0.9em";
zipError.id = "zipError";
zipField.parentNode.appendChild(zipError);

zipField.addEventListener("blur", function() {
    const value = zipField.value;
    const pattern = /^\d{5}(-\d{4})?$/;

    if (!pattern.test(value)) {
        zipError.textContent = "ZIP code must be 5 digits or ZIP+4 format (e.g., 77002 or 77002-1234).";
    } else {
        zipError.textContent = "";
    }
});

  // email validation
const emailField = document.querySelector('input[name="email"]');
const emailError = document.createElement("div");
emailError.style.color = "red";
emailError.style.fontSize = "0.9em";
emailError.id = "emailError";
emailField.parentNode.appendChild(emailError);

emailField.addEventListener("blur", function() {
    const value = emailField.value.toLowerCase();
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!pattern.test(value)) {
        emailError.textContent = "Please enter a valid email address like name@domain.com.";
    } else {
        emailError.textContent = "";
    }
});

  // phone number validation
const phoneField = document.querySelector('input[name="phone"]');
const phoneError = document.createElement("div");
phoneError.style.color = "red";
phoneError.style.fontSize = "0.9em";
phoneError.id = "phoneError";
phoneField.parentNode.appendChild(phoneError);

phoneField.addEventListener("blur", function() {
    const value = phoneField.value;
    const pattern = /^\d{3}-\d{3}-\d{4}$/;

    if (!pattern.test(value)) {
        phoneError.textContent = "Phone number must be in format 000-000-0000.";
    } else {
        phoneError.textContent = "";
    }
});

  // address line 1 validation
const addressField = document.querySelector('input[name="address"]');
const addressError = document.createElement("div");
addressError.style.color = "red";
addressError.style.fontSize = "0.9em";
addressError.id = "addressError";
addressField.parentNode.appendChild(addressError);

addressField.addEventListener("blur", function() {
    const value = addressField.value.trim();

    if (value.length < 2 || value.length > 30) {
        addressError.textContent = "Address must be 2–30 characters.";
    } else {
        addressError.textContent = "";
    }
});

  // address line 2 validation
// (assuming you add name="address2" in your HTML if you need it)
const address2Field = document.querySelector('input[name="address2"]');
if (address2Field) {
    const address2Error = document.createElement("div");
    address2Error.style.color = "red";
    address2Error.style.fontSize = "0.9em";
    address2Error.id = "address2Error";
    address2Field.parentNode.appendChild(address2Error);

    address2Field.addEventListener("blur", function() {
        const value = address2Field.value.trim();
        if (value && (value.length < 2 || value.length > 30)) {
            address2Error.textContent = "Address line 2 must be 2–30 characters if entered.";
        } else {
            address2Error.textContent = "";
        }
    });
}
  // sex radio button validation
const sexError = document.createElement("div");
sexError.style.color = "red";
sexError.style.fontSize = "0.9em";
sexError.id = "sexError";
document.querySelector('input[name="sex"]').parentNode.appendChild(sexError);

function validateSex() {
    const selected = document.querySelector('input[name="sex"]:checked');
    if (!selected) {
        sexError.textContent = "Please select your sex.";
        return false;
    } else {
        sexError.textContent = "";
        return true;
    }
}
document.querySelectorAll('input[name="sex"]').forEach(radio => {
    radio.addEventListener("change", validateSex);
});

  // vaccinated radio button validation
const vaccinatedError = document.createElement("div");
vaccinatedError.style.color = "red";
vaccinatedError.style.fontSize = "0.9em";
vaccinatedError.id = "vaccinatedError";
document.querySelector('input[name="vaccinated"]').parentNode.appendChild(vaccinatedError);

function validateVaccinated() {
    const selected = document.querySelector('input[name="vaccinated"]:checked');
    if (!selected) {
        vaccinatedError.textContent = "Please indicate your vaccination status.";
        return false;
    } else {
        vaccinatedError.textContent = "";
        return true;
    }
}
document.querySelectorAll('input[name="vaccinated"]').forEach(radio => {
    radio.addEventListener("change", validateVaccinated);
});

  // insurance radio button validation
const insuranceError = document.createElement("div");
insuranceError.style.color = "red";
insuranceError.style.fontSize = "0.9em";
insuranceError.id = "insuranceError";
document.querySelector('input[name="insurance"]').parentNode.appendChild(insuranceError);

function validateInsurance() {
    const selected = document.querySelector('input[name="insurance"]:checked');
    if (!selected) {
        insuranceError.textContent = "Please indicate if you have insurance.";
        return false;
    } else {
        insuranceError.textContent = "";
        return true;
    }
}
document.querySelectorAll('input[name="insurance"]').forEach(radio => {
    radio.addEventListener("change", validateInsurance);
});

  // language radio button validation
const languageError = document.createElement("div");
languageError.style.color = "red";
languageError.style.fontSize = "0.9em";
languageError.id = "languageError";
document.querySelector('input[name="language"]').parentNode.appendChild(languageError);

function validateLanguage() {
    const selected = document.querySelector('input[name="language"]:checked');
    if (!selected) {
        languageError.textContent = "Please select your language preference.";
        return false;
    } else {
        languageError.textContent = "";
        return true;
    }
}
document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener("change", validateLanguage);
});
  
  
  // slider value update
  const slider = document.querySelector('input[name="health"]');
  const output = document.getElementById('healthValue');
  output.textContent = slider.value;
  slider.addEventListener('input', () => {
    output.textContent = slider.value;
  });
});

// health slider validation
const healthSlider = document.querySelector('input[name="health"]');
const healthError = document.createElement("div");
healthError.style.color = "red";
healthError.style.fontSize = "0.9em";
healthError.id = "healthError";
healthSlider.parentNode.appendChild(healthError);

healthSlider.addEventListener("input", function() {
  const value = parseInt(healthSlider.value, 10);
  document.getElementById("healthValue").textContent = value;
  
  if (value < 1 || value > 10) {
    healthError.textContent = "Health must be between 1 and 10.";
  } else {
    healthError.textContent = "";
  }
});

let comments = document.querySelector('textarea[name="comments"]').value.trim();

// comments textarea validation
const commentsField = document.querySelector('textarea[name="comments"]');
const commentsError = document.createElement("div");
commentsError.style.color = "red";
commentsError.style.fontSize = "0.9em";
commentsError.id = "commentsError";
commentsField.parentNode.appendChild(commentsError);

commentsField.addEventListener("blur", function() {
    const value = commentsField.value.trim();
    // optional, but if they typed something, check for printable characters
    if (value.length > 0 && !/^[\w\s.,'\"!?-]{2,300}$/.test(value)) {
        commentsError.textContent = "Comments may only contain letters, numbers, punctuation, and be 2–300 characters.";
    } else {
        commentsError.textContent = "";
    }
});

// desired salary slider
const salarySlider = document.querySelector('input[name="salary"]');
const salaryOutput = document.getElementById('salaryValue');
salaryOutput.textContent = `$${parseInt(salarySlider.value).toLocaleString()}`;

salarySlider.addEventListener('input', () => {
  salaryOutput.textContent = `$${parseInt(salarySlider.value).toLocaleString()}`;
});

// password validator function — OUTSIDE the DOMContentLoaded
function validatePasswords() {
  const password = document.querySelector('input[name="password"]').value;
  const verifyPassword = document.querySelector('input[name="verifyPassword"]').value;
  const userID = document.querySelector('input[name="userID"]').value;

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\\/><.,`~]).{8,30}$/;

  if (!passwordPattern.test(password)) {
    alert("Password must be 8–30 characters, include uppercase, lowercase, number, and a special character (no quotes).");
    return false;
  }
  if (password.includes('"') || password.includes("'")) {
    alert("Password cannot contain quotes.");
    return false;
  }
  if (password.toLowerCase().includes(userID.toLowerCase())) {
    alert("Password cannot contain your user ID.");
    return false;
  }
  if (password !== verifyPassword) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
}
