document.addEventListener("DOMContentLoaded", () => {
  loadChallenges();
});

async function loadChallenges() {
  try {
    // Beispiel-API-URL, die du an dein Backend anpassen solltest
    const response = await fetch("/api/challenges");
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Challenges");
    }

    const challenges = await response.json();
    const challengeCardsContainer = document.getElementById("challengeCards");

    // Leert den Container, bevor neue Inhalte hinzugefügt werden
    challengeCardsContainer.innerHTML = "";

    // Dynamisches Erzeugen der Challenge-Karten
    challenges.forEach((challenge) => {
      const challengeCard = document.createElement("div");
      challengeCard.classList.add("card");

      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      const img = document.createElement("img");
      img.src = challenge.imageUrl; // Bild-URL aus dem Backend
      img.alt = `Challenge ${challenge.title}`;
      cardImage.appendChild(img);

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      const title = document.createElement("h3");
      title.textContent = challenge.title;
      const description1 = document.createElement("p");
      description1.textContent = challenge.description; // Beschreibung aus dem Backend

      cardContent.appendChild(title);
      cardContent.appendChild(description1);

      challengeCard.appendChild(cardImage);
      challengeCard.appendChild(cardContent);

      // Karte zum Container hinzufügen
      challengeCardsContainer.appendChild(challengeCard);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Challenges:", error);
  }
}
