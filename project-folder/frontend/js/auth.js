document.addEventListener("DOMContentLoaded", () => {
  // Login-Formular
  const loginForm = document.getElementById("loginForm");

  // Check if the loginForm exists before adding the event listener
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Formulardaten erfassen
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        // API-Anfrage zum Backend senden
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          if (data.needsPasswordChange) {
            // Benutzer muss Passwort ändern
            alert(data.message);
            window.location.href = "/views/change-password.html";
          } else {
            alert(data.message);
            window.location.href = "/views/dashboard.html"; // Beispiel-Weiterleitung zum Dashboard
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
  }

  // Registrierungsformular
  const passwordResetForm = document.getElementById("passwordResetForm");

  // Check if the passwordResetForm exists before adding the event listener
  if (passwordResetForm) {
    // Checkbox zum Anzeigen des Passworts
    const showPasswordCheckbox = document.getElementById("showPassword");
    const oldPasswordField = document.getElementById("oldPassword");
    const newPasswordField = document.getElementById("newPassword");
    const repeatPasswordField = document.getElementById("repeatPassword");

    if (showPasswordCheckbox) {
      // Event Listener für die Checkbox zum Anzeigen des Passworts
      showPasswordCheckbox.addEventListener("change", () => {
        const passwordType = showPasswordCheckbox.checked ? "text" : "password";
        oldPasswordField.type = passwordType;
        newPasswordField.type = passwordType;
        repeatPasswordField.type = passwordType;
      });
    }

    // Event Listener für das Formular
    passwordResetForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Formulardaten erfassen
      const email = document.getElementById("email").value;
      const oldPassword = oldPasswordField.value;
      const newPassword = newPasswordField.value;
      const repeatPassword = repeatPasswordField.value;
      if (newPassword !== repeatPassword) {
        alert(
          "Die neuen Passwörter stimmen nicht überein. Bitte versuchen Sie es erneut."
        );
        return;
      }

      try {
        // API-Anfrage zum Backend senden, um das Passwort zu ändern
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/changePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              oldPassword,
              newPassword,
              repeatPassword,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Das Passwort wurde erfolgreich geändert.");
          window.location.href = "/views/login.html"; // Beispiel-Weiterleitung zurück zum Login
        } else {
          // Fehler anzeigen
          alert(data.message);
        }
      } catch (error) {
        console.error("Fehler beim Ändern des Passworts:", error.message);
        alert(
          "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
        );
      }
    });
  }
});
