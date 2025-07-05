// script.js for Homework 2

function reviewForm() {
  // collect values from the form and display them in the review area
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
