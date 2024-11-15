document.addEventListener("DOMContentLoaded", async () => {
  const sportClassList = document.getElementById("sportClassList");
  const deleteSelectedClassesButton = document.getElementById(
    "deleteSelectedClasses"
  );

  // Fetch sport classes from the backend
  async function loadSportClasses() {
    sportClassList.innerHTML = "<p>Sportklassen werden geladen...</p>";
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/unusedclasses"
      );
      const sportClasses = await response.json();

      sportClassList.innerHTML = "";
      sportClasses.forEach((sportClass) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = sportClass.id;
        checkbox.id = `sportClass-${sportClass.id}`;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = sportClass.name;

        const container = document.createElement("div");
        container.appendChild(checkbox);
        container.appendChild(label);

        sportClassList.appendChild(container);
      });
    } catch (error) {
      sportClassList.innerHTML = "<p>Fehler beim Laden der Sportklassen.</p>";
    }
  }

  // Delete selected sport classes
  deleteSelectedClassesButton.addEventListener("click", async () => {
    const selectedClasses = Array.from(
      sportClassList.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);

    if (selectedClasses.length === 0) {
      alert("Bitte wähle mindestens eine Sportklasse aus.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/statistics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedClasses }),
        }
      );

      if (response.ok) {
        alert("Sportklasse(n) erfolgreich gelöscht.");
        loadSportClasses(); // Aktualisiere die Liste nach dem Löschen
      } else {
        alert("Fehler beim Löschen der Sportklasse(n).");
      }
    } catch (error) {
      alert("Ein Fehler ist aufgetreten.");
    }
  });

  // Lade die Sportklassen bei Initialisierung
  await loadSportClasses();
});
