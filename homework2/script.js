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

  // collect other form values
  let firstName = document.querySelector('input[name="firstName"]').value;
  let lastName = document.querySelector('input[name="lastName"]').value;
  let email = document.querySelector('input[name="email"]').value;

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
