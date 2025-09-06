// --- Utility: Show alert with nice styling (you can improve with SweetAlert later)
function showMessage(msg) {
  alert(msg);
}

// --- Password Strength Check ---
function isStrongPassword(password) {
  const upperCase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
  return (
    password.length >= 6 &&
    upperCase.test(password) &&
    number.test(password) &&
    specialChar.test(password)
  );
}

/* ===========================
   SIGNUP PAGE LOGIC
=========================== */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (username.length < 3) {
      showMessage("Username must be at least 3 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      showMessage(
        "Password must be at least 6 characters, contain 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    // Save user in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      showMessage("Email is already registered.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Signup successful! Please login.");
    window.location.href = "index.html";
  });
}

/* ===========================
   LOGIN PAGE LOGIC
=========================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let validUser = users.find((u) => u.email === email && u.password === password);

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      showMessage("Login successful! Redirecting...");
      window.location.href = "welcome.html"; // Redirect to dashboard
    } else {
      showMessage("Invalid email or password.");
    }
  });
}

/* ===========================
   FORGOT PASSWORD PAGE LOGIC
=========================== */
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((u) => u.email === email);

    if (!user) {
      showMessage("No account found with this email.");
      return;
    }

    // Simulate sending reset link
    localStorage.setItem("resetEmail", email);
    showMessage("Password reset link sent to " + email + " (simulated).");
    window.location.href = "reset.html"; // Redirect to reset password page
  });
}

/* ===========================
   RESET PASSWORD PAGE LOGIC
=========================== */
const resetForm = document.getElementById("resetForm");
if (resetForm) {
  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!isStrongPassword(newPassword)) {
      showMessage(
        "Password must be at least 6 characters, contain 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      showMessage("Session expired. Please request reset again.");
      window.location.href = "forgot.html";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u =>
      u.email === email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("resetEmail");

    showMessage("Password reset successful! Please login.");
    window.location.href = "index.html";
  });
}

/* ===========================
   GOOGLE LOGIN / SIGNUP DUMMY
=========================== */
const googleLogin = document.getElementById("googleLogin");
if (googleLogin) {
  googleLogin.addEventListener("click", () => {
    showMessage("Google Login Clicked! (Integrate Firebase here)");
  });
}

const googleSignup = document.getElementById("googleSignup");
if (googleSignup) {
  googleSignup.addEventListener("click", () => {
    showMessage("Google Signup Clicked! (Integrate Firebase here)");
  });
}
