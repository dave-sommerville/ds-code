// Blank entry
if (input.value.trim() === "") {
  alert("This field is required");
  return false;
}

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(emailInput.value)) {
  alert("Please enter a valid email address");
  return false;
}

// Password requirements
if (passwordInput.value.length < 8) {
  alert("Password must be at least 8 characters long");
  return false;
}

// Matching passwords
if (passwordInput.value !== confirmPasswordInput.value) {
  alert("Passwords do not match");
  return false;
}

// Age check
const age = parseInt(ageInput.value);
if (isNaN(age) || age < 18 || age > 120) {
  alert("Enter a valid age between 18 and 120");
  return false;
}