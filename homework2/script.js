// script.js for Homework 2

function reviewForm() {
  // collect form values
  function reviewForm() {
  if (!validatePasswords()) {
    return;  // cancel if password fails
  }

  // existing review code here
}
  let firstName = document.querySelector('input[name="firstName"]').value;
  let lastName = document.querySelector('input[name="lastName"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let dob = document.querySelector('input[name="dob"]').value;

  let reviewContent = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Date of Birth:</strong> ${dob}</p>
  `;

  document.getElementById('reviewContent').innerHTML = reviewContent;
}

// hook up the Review button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reviewBtn').addEventListener('click', reviewForm);
});

// password validator
function validatePasswords() {
  const password = document.querySelector('input[name="password"]').value;
  const verifyPassword = document.querySelector('input[name="verifyPassword"]').value;
  const userID = document.querySelector('input[name="userID"]').value;

  // Password regex
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
