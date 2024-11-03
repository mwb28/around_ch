document.addEventListener("DOMContentLoaded", () => {
  loadActiveChallenges();
  loadStatistics();
  loadUserName();
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
      document.getElementById("activeChallenges");
    activeChallengesContainer.innerHTML = "";
    challenges.forEach((challenge) => {
      const challengeCard = document.createElement("div");
      challengeCard.classList.add("card");

      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      const img = document.createElement("img");
      img.src = challenge.imageUrl;
      img.alt = `Challenge ${challenge.title}`;
      cardImage.appendChild(img);

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      const title = document.createElement("h3");
      title.textContent = challenge.title;
      const description = document.createElement("p");
      description.textContent = challenge.description;

      cardContent.appendChild(title);
      cardContent.appendChild(description);

      challengeCard.appendChild(cardImage);
      challengeCard.appendChild(cardContent);

      activeChallengesContainer.appendChild(challengeCard);
    });
  } catch (error) {
    console.error("Fehler beim Laden der aktiven Challenges:", error);
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
