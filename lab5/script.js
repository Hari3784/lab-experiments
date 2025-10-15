document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const inputs = form.querySelectorAll("input");
  const successMessage = document.getElementById("successMessage");

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Check each input on input event
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.value.trim();
      const errorMsg = input.nextElementSibling;

      // Reset messages
      errorMsg.textContent = "";
      input.classList.remove("valid", "invalid");

      if (!value) {
        errorMsg.textContent = "This field is required";
        input.classList.add("invalid");
        return;
      }

      if (input.id === "email" && !validateEmail(value)) {
        errorMsg.textContent = "Invalid email format";
        input.classList.add("invalid");
      } else if (input.id === "password" && !validatePassword(value)) {
        errorMsg.textContent =
          "Weak password: use at least 8 chars & one special symbol";
        input.classList.add("invalid");
      } else if (input.id === "phone" && !validatePhone(value)) {
        errorMsg.textContent = "Phone number must be 10 digits";
        input.classList.add("invalid");
      } else {
        input.classList.add("valid");
      }
    });
  });

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.classList.contains("valid")) {
        isValid = false;
        input.classList.add("invalid");
      }
    });

    if (isValid) {
      successMessage.textContent = "✅ Registration Successful!";
      form.reset();
      inputs.forEach((input) => input.classList.remove("valid"));
    } else {
      successMessage.textContent = "";
    }
  });
});
