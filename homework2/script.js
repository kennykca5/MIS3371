// script.js for Homework 2

function reviewForm() {
  // validate passwords first
  if (!validatePasswords()) {
    return;  // cancel if password fails
  }

  // validate DOB range
  const dob = document.querySelector('input[name="dob"]').value;
  const dobParts = dob.split("/");
  if (dobParts.length === 3) {
    const month = parseInt(dobParts[0], 10);
    const day = parseInt(dobParts[1], 10);
    const year = parseInt(dobParts[2], 10);

    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    const oldest = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

    if (dobDate > today) {
      alert("Date of birth cannot be in the future.");
      return;
    }
    if (dobDate < oldest) {
      alert("Date of birth cannot be more than 120 years ago.");
      return;
    }
  }

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

  // slider value update
  const slider = document.querySelector('input[name="health"]');
  const output = document.getElementById('healthValue');
  output.textContent = slider.value;
  slider.addEventListener('input', () => {
    output.textContent = slider.value;
  });
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
