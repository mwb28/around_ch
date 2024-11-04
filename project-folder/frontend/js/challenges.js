document.addEventListener("DOMContentLoaded", () => {
  loadChallenges();
});

async function loadChallenges(showAll = false) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/public"
    );
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Challenges");
    }

    const challenges = await response.json();
    const challengeCardsContainer = document.getElementById("challengeCards");

    challengeCardsContainer.innerHTML = "";
    const challengesToShow = showAll ? challenges : challenges.slice(0, 2);

    challengesToShow.forEach((challenge) => {
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
document
  .querySelector(".all-challenges-button")
  .addEventListener("click", () => {
    loadChallenges(true); // Zeigt alle Challenges an
  });
