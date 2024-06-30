const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberMeInput = document.getElementById("remember-me");
const loginStatusElement = document.getElementById("login-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  // Validate username and password
  if (!validateUsername(username) || !validatePassword(password)) {
    return;
  }

  // Send request to server
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      rememberMe: rememberMeInput.checked,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loginStatusElement.textContent = "Login successful!";
        // Redirect to dashboard or other page
        window.location.href = "/dashboard";
      } else {
        loginStatusElement.textContent = "Invalid username or password";
      }
    })
    .catch((error) => {
      console.error(error);
      loginStatusElement.textContent = "Error logging in";
    });
});

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    document.getElementById("username-error").textContent = "Invalid username";
    return false;
  }
  return true;
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("password-error").textContent = "Invalid password";
    return false;
  }
  return true;
}
