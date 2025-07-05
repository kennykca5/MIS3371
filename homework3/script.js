document.addEventListener("DOMContentLoaded", function() {

  // salary slider
  const salarySlider = document.querySelector('input[name="salary"]');
  const salaryOutput = document.getElementById('salaryValue');
  salaryOutput.textContent = `$${parseInt(salarySlider.value).toLocaleString()}`;
  salarySlider.addEventListener("input", function() {
    salaryOutput.textContent = `$${parseInt(salarySlider.value).toLocaleString()}`;
  });

  // health slider
  const healthSlider = document.querySelector('input[name="health"]');
  const healthOutput = document.getElementById('healthValue');
  healthOutput.textContent = healthSlider.value;
  healthSlider.addEventListener("input", function() {
    healthOutput.textContent = healthSlider.value;
  });

  // password validation function
  window.validatePasswords = function() {
    const password = document.querySelector('input[name="password"]').value;
    const verifyPassword = document.querySelector('input[name="verifyPassword"]').value;
    const userID = document.querySelector('input[name="userID"]').value;

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\\/><.,`~]).{8,30}$/;

    if (!pattern.test(password)) {
      alert("Password must be 8–30 chars, include uppercase, lowercase, number, and a special character (no quotes).");
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

  // dob validation
  const dobField = document.querySelector('input[name="dob"]');
  const dobError = document.createElement("div");
  dobError.style.color = "red";
  dobField.parentNode.appendChild(dobError);
  dobField.addEventListener("blur", function() {
    const value = dobField.value;
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    if (!pattern.test(value)) {
      dobError.textContent = "Use MM/DD/YYYY format.";
      return;
    }
    const [month, day, year] = value.split("/").map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    const oldest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    if (dobDate > today) {
      dobError.textContent = "Cannot be in the future.";
    } else if (dobDate < oldest) {
      dobError.textContent = "Cannot be more than 120 years ago.";
    } else {
      dobError.textContent = "";
    }
  });

  // SSN validation
  const ssnField = document.querySelector('input[name="ssn"]');
  const ssnError = document.createElement("div");
  ssnError.style.color = "red";
  ssnField.parentNode.appendChild(ssnError);
  ssnField.addEventListener("input", function() {
    let digits = ssnField.value.replace(/\D/g, "");
    if (digits.length > 9) digits = digits.slice(0, 9);
    if (digits.length > 5) {
      ssnField.value = `${digits.slice(0,3)}-${digits.slice(3,5)}-${digits.slice(5)}`;
    } else if (digits.length > 3) {
      ssnField.value = `${digits.slice(0,3)}-${digits.slice(3)}`;
    } else {
      ssnField.value = digits;
    }
  });
  ssnField.addEventListener("blur", function() {
    if (!/^\d{3}-\d{2}-\d{4}$/.test(ssnField.value)) {
      ssnError.textContent = "Use XXX-XX-XXXX format.";
    } else {
      ssnError.textContent = "";
    }
  });

  // review button handler
  document.getElementById("reviewBtn").addEventListener("click", function() {
    const salary = parseInt(salarySlider.value, 10);
    if (salary < 20000 || salary > 200000) {
      alert("Salary must be between $20,000 and $200,000.");
      return;
    }

    const sex = document.querySelector('input[name="sex"]:checked');
    if (!sex) {
      alert("Please select your sex.");
      return;
    }
    const vaccinated = document.querySelector('input[name="vaccinated"]:checked');
    if (!vaccinated) {
      alert("Please select vaccination status.");
      return;
    }
    const insurance = document.querySelector('input[name="insurance"]:checked');
    if (!insurance) {
      alert("Please indicate insurance.");
      return;
    }
    const language = document.querySelector('input[name="language"]:checked');
    if (!language) {
      alert("Please select language.");
      return;
    }
    const checkedConditions = document.querySelectorAll('input[name="conditions"]:checked');
    if (checkedConditions.length === 0) {
      alert("Select at least one condition.");
      return;
    }

    // build review
    const dob = dobField.value;
    const health = healthSlider.value;
    const password = document.querySelector('input[name="password"]').value.replace(/./g, "*");
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const userID = document.querySelector('input[name="userID"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const state = document.querySelector('select[name="state"]').value;
    const zip = document.querySelector('input[name="zip"]').value;
    const conditions = Array.from(checkedConditions).map(el => el.value).join(", ");

    let reviewContent = `
      <table border="1" style="width:100%;border-collapse:collapse;">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>First Name</td><td>${firstName}</td></tr>
        <tr><td>Last Name</td><td>${lastName}</td></tr>
        <tr><td>User ID</td><td>${userID}</td></tr>
        <tr><td>Password</td><td>${password}</td></tr>
        <tr><td>Email</td><td>${email}</td></tr>
        <tr><td>Phone</td><td>${phone}</td></tr>
        <tr><td>Date of Birth</td><td>${dob}</td></tr>
        <tr><td>Sex</td><td>${sex.value}</td></tr>
        <tr><td>Vaccinated</td><td>${vaccinated.value}</td></tr>
        <tr><td>Insurance</td><td>${insurance.value}</td></tr>
        <tr><td>Address</td><td>${address}</td></tr>
        <tr><td>City</td><td>${city}</td></tr>
        <tr><td>State</td><td>${state}</td></tr>
        <tr><td>Zip</td><td>${zip}</td></tr>
        <tr><td>Language</td><td>${language.value}</td></tr>
        <tr><td>Health</td><td>${health}</td></tr>
        <tr><td>Conditions</td><td>${conditions}</td></tr>
        <tr><td>Salary</td><td>$${salary.toLocaleString()}</td></tr>
      </table>
    `;
    document.getElementById("reviewContent").innerHTML = reviewContent;
  });
});
