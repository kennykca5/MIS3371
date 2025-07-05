// script.js
document.addEventListener("DOMContentLoaded", () => {
  // utility to show/clear errors
  function setError(id, message) {
    document.getElementById(id).textContent = message;
  }

  // field validators
  function validateUserID() {
    const f = document.getElementById("userID");
    const re = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
    if (!re.test(f.value)) {
      setError("userIDError", "Must start with letter; 5–30 chars; letters, digits, dash/underscore only");
      return false;
    }
    setError("userIDError", "");
    return true;
  }

  function validatePassword() {
    const pw = document.getElementById("password").value;
    const id = document.getElementById("userID").value.toLowerCase();
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\\/><.,`~]).{8,32}$/;
    if (!re.test(pw)) {
      setError("passwordError", "8–32 chars; include upper, lower, digit, special");
      return false;
    }
    if (pw.toLowerCase().includes(id)) {
      setError("passwordError", "Cannot contain your User ID");
      return false;
    }
    setError("passwordError", "");
    return true;
  }

  function validateVerifyPassword() {
    const pw = document.getElementById("password").value;
    const vp = document.getElementById("verifyPassword").value;
    if (pw !== vp) {
      setError("verifyPasswordError", "Passwords do not match");
      return false;
    }
    setError("verifyPasswordError", "");
    return true;
  }

  function validateEmail() {
    const f = document.getElementById("email");
    if (f.value === "" || !f.checkValidity()) {
      setError("emailError", "Enter a valid email");
      return false;
    }
    setError("emailError", "");
    return true;
  }

  function validatePhone() {
    const f = document.getElementById("phone");
    if (f.value && !f.checkValidity()) {
      setError("phoneError", "000-000-0000 format");
      return false;
    }
    setError("phoneError", "");
    return true;
  }

  function validateName(id, errId) {
    const f = document.getElementById(id);
    if (!f.checkValidity()) {
      setError(errId, f.title);
      return false;
    }
    setError(errId, "");
    return true;
  }

  function validateDOB() {
    const f = document.getElementById("dob");
    const val = f.value;
    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    if (!re.test(val)) {
      setError("dobError", "Use MM/DD/YYYY");
      return false;
    }
    const [m,d,y] = val.split("/").map(Number);
    const dob = new Date(y,m-1,d);
    const today = new Date();
    const oldest = new Date(today.getFullYear()-120, today.getMonth(), today.getDate());
    if (dob>today) {
      setError("dobError","Cannot be in the future");
      return false;
    }
    if (dob<oldest) {
      setError("dobError","Cannot be >120 yrs ago");
      return false;
    }
    setError("dobError","");
    return true;
  }

  function validateRadio(name, errId) {
    if (!document.querySelector(`input[name="${name}"]:checked`)) {
      setError(errId, "Please select one");
      return false;
    }
    setError(errId, "");
    return true;
  }

  function validateCheckboxes() {
    const checked = document.querySelectorAll('input[name="conditions"]:checked');
    if (checked.length < 1) {
      setError("conditionsError", "Select at least one");
      return false;
    }
    setError("conditionsError", "");
    return true;
  }

  function validateSelect(id, errId) {
    const f = document.getElementById(id);
    if (!f.value) {
      setError(errId, "Please choose one");
      return false;
    }
    setError(errId, "");
    return true;
  }

  function validateText(id, errId, optional=false, min=0, max=999) {
    const f = document.getElementById(id);
    if (!optional && f.value.trim()==="") {
      setError(errId, "Required");
      return false;
    }
    if (f.value && (f.value.length < min || f.value.length > max)) {
      setError(errId, `Must be ${min}-${max} chars`);
      return false;
    }
    setError(errId, "");
    return true;
  }

  // slider displays
  const salary = document.getElementById("salary"),
        salaryValue = document.getElementById("salaryValue");
  salaryValue.textContent = `$${Number(salary.value).toLocaleString()}`;
  salary.addEventListener("input", () => {
    salaryValue.textContent = `$${Number(salary.value).toLocaleString()}`;
  });

  const health = document.getElementById("health"),
        healthValue = document.getElementById("healthValue");
  healthValue.textContent = health.value;
  health.addEventListener("input", () => {
    healthValue.textContent = health.value;
  });

  // wire up on-the-fly
  document.getElementById("userID").addEventListener("blur", validateUserID);
  document.getElementById("password").addEventListener("blur", validatePassword);
  document.getElementById("verifyPassword").addEventListener("blur", validateVerifyPassword);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document.getElementById("phone").addEventListener("blur", validatePhone);
  ["firstName","middleInitial","lastName"].forEach(id => {
    document.getElementById(id).addEventListener("blur", () =>
      validateName(id, id + "Error")
    );
  });
  document.getElementById("dob").addEventListener("blur", validateDOB);
  ["sex","vaccinated","insurance","language"].forEach(rname => {
    document.querySelectorAll(`input[name="${rname}"]`)
      .forEach(input => input.addEventListener("change", () => validateRadio(rname, rname + "Error")));
  });
  document.querySelectorAll('input[name="conditions"]').forEach(cb =>
    cb.addEventListener("change", validateCheckboxes)
  );
  document.getElementById("address").addEventListener("blur", () =>
    validateText("address", "addressError", false, 2, 30)
  );
  document.getElementById("address2").addEventListener("blur", () =>
    validateText("address2", "address2Error", true, 2, 30)
  );
  document.getElementById("city").addEventListener("blur", () =>
    validateText("city", "cityError", false, 2, 30)
  );
  document.getElementById("state").addEventListener("change", () =>
    validateSelect("state", "stateError")
  );
  document.getElementById("zip").addEventListener("blur", () =>
    validateText("zip", "zipError", false, 5, 10)
  );
  document.getElementById("comments").addEventListener("blur", () =>
    validateText("comments", "commentsError", true, 0, 500)
  );

  // Validate all then enable submit
  document.getElementById("validateBtn").addEventListener("click", () => {
    const checks = [
      validateUserID(),
      validatePassword(),
      validateVerifyPassword(),
      validateEmail(),
      validatePhone(),
      validateName("firstName","firstNameError"),
      validateName("middleInitial","middleInitialError"),
      validateName("lastName","lastNameError"),
      validateDOB(),
      validateRadio("sex","sexError"),
      validateText("ssn","ssnError",false,11,11),
      validateRadio("vaccinated","vaccinatedError"),
      validateRadio("insurance","insuranceError"),
      validateText("address","addressError",false,2,30),
      validateText("address2","address2Error",true,2,30),
      validateText("city","cityError",false,2,30),
      validateSelect("state","stateError"),
      validateText("zip","zipError",false,5,10),
      validateRadio("language","languageError"),
      validateCheckboxes(),
      // comments optional
      validateText("comments","commentsError",true,0,500)
    ];

    if (checks.every(v=>v===true)) {
      document.getElementById("submitBtn").disabled = false;
      // optionally reveal review pane
      document.getElementById("reviewArea").style.display = "block";
      // build a quick review table if desired...
    } else {
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("reviewArea").style.display = "none";
    }
  });

  // Prevent real submission if still invalid
  document.getElementById("intakeForm").addEventListener("submit", e => {
    if (document.getElementById("submitBtn").disabled) {
      e.preventDefault();
      alert("Fix errors before submitting.");
    }
  });
});
