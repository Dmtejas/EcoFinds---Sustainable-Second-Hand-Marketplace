document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error
        alert(data.error?.message || "Login failed");
      } else {
        // Success
        alert(data.message);
        console.log("User data:", data.user);
        console.log("JWT Token:", data.token);

        // Optionally store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to dashboard or home page
        // window.location.href = "/dashboard.html";
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      alert("Server error. Please try again later.");
    }
  });
});
