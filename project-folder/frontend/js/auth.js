document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Verhindert die Standardaktion des Formulars

    // Formulardaten erfassen
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // API-Anfrage zum Backend senden
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.needsPasswordChange) {
          // Benutzer muss Passwort ändern
          alert(data.message);
          window.location.href = "/views/change-password.html"; // Beispiel-Weiterleitung zum Passwortänderungsformular
        } else {
          alert(data.message);
          window.location.href = "/dashboard.html"; // Beispiel-Weiterleitung zum Dashboard
        }
      } else {
        // Fehler anzeigen
        alert(data.message);
      }
    } catch (error) {
      console.error("Fehler beim Einloggen:", error.message);
      alert(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  });
});
