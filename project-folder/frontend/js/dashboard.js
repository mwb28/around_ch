document.addEventListener("DOMContentLoaded", () => {
  loadUserName();
  loadActiveChallenges();
  loadStatistics();
  loadSelectableChallenges();
  loadCreatableChallenges();
});

async function loadUserName() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/users/current");
    if (!response.ok) throw new Error("Fehler beim Laden des Benutzernamens");
    const user = await response.json();
    document.getElementById(
      "userNameContainer"
    ).textContent = `Angemeldet als: ${user.name}`;
  } catch (error) {
    console.error("Fehler beim Laden des Benutzernamens:", error);
  }
}

async function loadActiveChallenges() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/public"
    );
    if (!response.ok) throw new Error("Fehler beim Laden der Challenges");

    const challenges = await response.json();
    const activeChallengesContainer =
      document.getElementById("active-challenges");

    activeChallengesContainer.innerHTML = "";
    challenges.forEach((challenge) => {
      const challengeCard = document.createElement("div");
      challengeCard.classList.add("largecard");

      const mapContainer = document.createElement("div");
      mapContainer.classList.add("map-container");
      mapContainer.style.width = "100%";
      mapContainer.style.height = "250px";
      challengeCard.appendChild(mapContainer);

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      const title = document.createElement("h3");
      title.textContent = challenge.name_der_challenge;
      const description1 = document.createElement("p");
      description1.textContent = challenge.description;
      const description2 = document.createElement("p");
      description2.textContent =
        "Startzeitpunkt: " +
        new Date(challenge.startzeitpunkt).toLocaleString("de-CH");
      const description3 = document.createElement("p");
      description3.textContent =
        "Endzeitpunkt: " +
        new Date(challenge.endzeitpunkt).toLocaleString("de-CH");
      const description4 = document.createElement("p");
      description4.textContent = "Total Meter: " + challenge.total_meter;

      const link = document.createElement("a");
      link.href =
        "./views/einzel-challenge.html?challengeId=" + challenge.challenge_id;
      link.textContent = " Einzel Challenge";
      link.classList.add("challenge-link");

      cardContent.appendChild(title);
      cardContent.appendChild(description1);
      cardContent.appendChild(description2);
      cardContent.appendChild(description3);
      cardContent.appendChild(description4);
      cardContent.appendChild(link);

      challengeCard.appendChild(cardContent);

      activeChallengesContainer.appendChild(challengeCard);
      const switzerlandBounds = [
        [45.818, 5.956], // Südwestlicher Punkt der Schweiz
        [47.808, 10.492], // Nordöstlicher Punkt der Schweiz
      ];

      // Initialize Leaflet map
      const map = L.map(mapContainer).setView(
        [47.1, 7.2],

        6 // Zoom level
      );
      map.setMaxBounds(switzerlandBounds);
      map.fitBounds(switzerlandBounds);
      // Set OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 6,
        maxZoom: 15,
      }).addTo(map);

      if (challenge.geojson_daten) {
        const geoJsonLayer = L.geoJSON(challenge.geojson_daten, {
          style: function (feature) {
            return {
              color: "blue",
              weight: 2,
              opacity: 0.7, // Transparenz
            };
          },
        }).addTo(map);

        // Passe den Kartenausschnitt so an, dass die gesamte GeoJSON-Linie sichtbar ist
        map.fitBounds(geoJsonLayer.getBounds());
        // alle Instanzen der Challenge anzeigen
      } else {
        console.warn(
          `Keine GeoJSON-Daten für Challenge mit ID ${challenge.challenge_id} vorhanden.`
        );
      }

      // Zukünftige Möglichkeit:
      // onEachFeature könnte verwendet werden, um interaktive Elemente hinzuzufügen,
      // wie Popups, die wichtige Sehenswürdigkeiten oder besondere Orte hervorheben.

      // Optional: Karten nur rendern, wenn sie im Viewport sind
    });
  } catch (error) {
    console.error("Fehler beim Laden der Challenges:", error);
  }
}

async function loadStatistics() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/statistics"
    );
    if (!response.ok) throw new Error("Fehler beim Laden der Statistik");
    const stats = await response.json();
    document.getElementById("totalKm").textContent = stats.totalKm;
    document.getElementById("totalHours").textContent = stats.totalHours;
    document.getElementById("mySportClasses").textContent =
      stats.sportClasses.join(", ");
  } catch (error) {
    console.error("Fehler beim Laden der Statistik:", error);
  }
}

function logout() {
  fetch("http://localhost:5000/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/index.html";
      }
    })
    .catch((error) => {
      console.error("Fehler beim Logout:", error);
    });
}
