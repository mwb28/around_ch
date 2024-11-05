const backendUrl = "https://localhost:5000/api/v1/"; // Passen Sie die URL an

// Allgemeine Funktion zur Initialisierung einer Karte
function initializeMap(elementId, center = [47.1, 7.2], zoom = 12) {
  const mapElement = document.getElementById(elementId);
  if (mapElement) {
    return L.map(elementId, {
      center: center,
      zoom: zoom,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }
  return null;
}

// Initialisierung der Karten
var smallMap = initializeMap("map-small");
var fullMap = initializeMap("map-full");

// Funktion, um aktive Challenges vom Backend zu laden
async function loadChallenges() {
  const challengeContainer = document.getElementById("active-challenges");
  if (challengeContainer) {
    try {
      const response = await fetch(backendUrl + "challenges/public");
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok");
      }
      const data = await response.json();
      data.challenges.forEach((challenge) => {
        const challengeElement = document.createElement("div");
        challengeElement.className = "challenge";
        challengeElement.innerHTML = `
          <h3>${challenge.challenge_id}</h3>
          <p>${challenge.description}</p>
        `;
        challengeContainer.appendChild(challengeElement);
      });
    } catch (error) {
      console.error("Fehler beim Laden der Challenges:", error);
    }
  }
}

// Funktion, um GeoJSON-Daten auf einer Karte darzustellen
async function loadMapData(map) {
  if (map) {
    try {
      const response = await fetch(backendUrl + "geojson");
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok");
      }
      const geoJsonData = await response.json();
      L.geoJSON(geoJsonData, {
        style: {
          color: "blue",
          weight: 2,
          fill: false,
        },
      }).addTo(map);
    } catch (error) {
      console.error("Fehler beim Laden der GeoJSON-Daten:", error);
    }
  }
}

// Vollbildkarte öffnen
function openFullMap() {
  window.location.href = "full-map-view.html";
}

// Initiale Funktionen ausführen
document.addEventListener("DOMContentLoaded", function () {
  loadChallenges();

  if (smallMap) {
    loadMapData(smallMap);
  }

  if (fullMap) {
    loadMapData(fullMap);
  }
});
