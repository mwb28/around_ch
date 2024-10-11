document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const school = document.getElementById("school").value;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, school }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("User registered successfully");
        window.location.href = "login.html";
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
