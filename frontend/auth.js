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
        alert(data.error?.message || "Login failed");
      } else {
        // ✅ Success
        console.log("JWT Token:", data.token);

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        // ✅ Now request the protected home route
        const homeResponse = await fetch("/api/user/home", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.token}`
          }
        });

        if (homeResponse.ok) {
          // Load the protected home.html content
          const html = await homeResponse.text();
          document.open();
          document.write(html);
          document.close();
        } else {
          alert("Failed to load protected page");
        }
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      alert("Server error. Please try again later.");
    }
  });
});
