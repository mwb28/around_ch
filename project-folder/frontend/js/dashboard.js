document.addEventListener("DOMContentLoaded", () => {
  loadActiveChallenges();
  loadStatistics();
  loadSportClasses();
  loadSelectableChallenges();
  loadCreateChallenge();
});

async function loadActiveChallenges() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/user"
    );
    if (!response.ok) throw new Error("Fehler beim Laden der Challenges");

    const challenges = await response.json();
    const activeChallengesContainer =
      document.getElementById("active-challenges");

    activeChallengesContainer.innerHTML = "";
    challenges.forEach((challenge) => {
      // Hauptcontainer für jede Challenge-Karte erstellen
      const challengeCard = document.createElement("div");
      challengeCard.classList.add("dashboard-card");

      // Karte/Bild hinzufügen
      const mapImage = document.createElement("img");
      mapImage.src = challenge.image_path || "../assets/images/default.jpg";
      mapImage.alt = "Karte der Challenge";
      mapImage.classList.add("map-image");

      // Inhalt der Karte hinzufügen
      const cardContent = document.createElement("div");
      cardContent.classList.add("dashboard-card-content");

      const title = document.createElement("h3");
      title.textContent = "Sportklasse: " + challenge.eigene_sportklasse;

      const description1 = document.createElement("p");
      description1.textContent =
        challenge.name_der_challenge + " Nr: " + challenge.challenge_id;

      const description2 = document.createElement("p");
      description2.textContent =
        "Startzeitpunkt: " +
        new Date(challenge.startzeitpunkt).toLocaleString("de-CH");

      const description3 = document.createElement("p");
      description3.textContent =
        "Endzeitpunkt: " +
        new Date(challenge.endzeitpunkt).toLocaleString("de-CH");

      // const description4 = document.createElement("p");
      // description4.textContent = "Total Meter: " + challenge.total_meter;

      const description5 = document.createElement("p");
      description5.textContent =
        "Absolviert: " + challenge.meter_absolviert + " Meter";

      const description6 = document.createElement("p");
      description6.textContent =
        "Bis ins Ziel: " +
        (challenge.total_meter - challenge.meter_absolviert) +
        " Meter";

      // const description6 = document.createElement("p");
      // description6.textContent =
      //   "Andere Sportklasse(n): " + challenge.andere_sportklassen;
      // Einzel Challenge Link
      // const link = document.createElement("a");
      // link.href =
      //   "./views/einzel-challenge.html?challengeId=" + challenge.challenge_id;
      // link.textContent = "Einzel Challenge";
      // link.classList.add("challenge-link");

      // Button-Container erstellen und Buttons hinzufügen
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      const showMapButton = document.createElement("button");
      showMapButton.textContent = "Karte anzeigen";
      showMapButton.classList.add("show-map");
      showMapButton.onclick = () =>
        window.open(
          `./einzel-challenge.html?challengeId=${challenge.challenge_id}`
        );

      const addActivityButton = document.createElement("button");
      addActivityButton.textContent = "Aktivität hinzufügen";
      addActivityButton.classList.add("add-activity");
      addActivityButton.onclick = () =>
        window.open(
          `./aktivitaet-input.html?instanceId=${challenge.instanz_id}`
        );

      // Buttons dem Button-Container hinzufügen
      buttonContainer.appendChild(showMapButton);
      buttonContainer.appendChild(addActivityButton);

      // Alle Elemente zum cardContent hinzufügen
      cardContent.appendChild(title);
      cardContent.appendChild(description1);
      cardContent.appendChild(description2);
      cardContent.appendChild(description3);
      // cardContent.appendChild(description4);
      cardContent.appendChild(description5);
      cardContent.appendChild(description6);

      // cardContent.appendChild(link);

      // Alle Teile zur Challenge-Karte hinzufügen
      challengeCard.appendChild(mapImage);
      challengeCard.appendChild(cardContent);
      challengeCard.appendChild(buttonContainer);

      // Challenge-Karte einmalig zum DOM hinzufügen
      activeChallengesContainer.appendChild(challengeCard);
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
    const statsArray = await response.json();
    const stats = statsArray[0];
    const totalKilometer = (parseInt(stats.totalmeter, 10) / 1000).toFixed(3);
    const totalMinuten = parseInt(stats.totaldauer, 10);
    const stunden = Math.floor(totalMinuten / 60);
    const minuten = totalMinuten % 60;
    document.getElementById("totalKm").textContent = `${totalKilometer} km`;
    document.getElementById(
      "totalHours"
    ).textContent = `${stunden} h ${minuten} min`;
    console.log("Total Meter: ", stats.totalmeter);
    console.log("Total Minuten: ", stats.totaldauer);
    // document.getElementById("mySportClasses").textContent =
    //   stats.sportClasses.join(", ");
  } catch (error) {
    console.error("Fehler beim Laden der Statistik:", error);
  }
}
async function loadSportClasses() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/users/sportclasses"
    );
    if (!response.ok) throw new Error("Fehler beim Laden der Sportklassen");

    const sportClasses = await response.json();
    console.log("Erhaltene Sportklassen:", sportClasses);

    const classListContainer = document.getElementById("mySportClasses");
    classListContainer.innerHTML = "";

    // Sportklassen als Liste der Namen einfügen
    sportClasses.forEach((sportClass) => {
      const listItem = document.createElement("span");
      listItem.textContent = sportClass.name;
      classListContainer.appendChild(listItem);

      const separator = document.createElement("span");
      separator.textContent = ", ";
      classListContainer.appendChild(separator);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Sportklassen:", error);
  }
}

async function loadSelectableChallenges() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/public"
    );
    if (!response.ok)
      throw new Error("Fehler beim Laden der auswählbaren Challenges");

    const challenges = await response.json();

    const classesResponse = await fetch(
      "http://localhost:5000/api/v1/users/sportclasses"
    );
    if (!classesResponse.ok)
      throw new Error("Fehler beim Laden der Sportklassen");
    const sportClasses = await classesResponse.json();

    const selectChallengesContainer =
      document.getElementById("select-challenges");

    selectChallengesContainer.innerHTML = "";
    challenges.forEach((challenge) => {
      const challengeCard = document.createElement("div");
      challengeCard.classList.add("challenge-card-selectable");

      // Bild hinzufügen
      const challengeImage = document.createElement("img");
      challengeImage.src =
        challenge.image_path || "../assets/images/default.jpg"; // Fallback-Bild
      challengeImage.alt = challenge.name;
      challengeImage.classList.add("challenge-image-selectable");
      challengeCard.appendChild(challengeImage);

      // Inhalt der Karte hinzufügen
      const cardContent = document.createElement("div");
      cardContent.classList.add("challenge-card-content-selectable");

      const description1 = document.createElement("h3");
      description1.textContent =
        challenge.name_der_challenge + " Nr: " + challenge.challenge_id;
      cardContent.appendChild(description1);

      const description2 = document.createElement("p");
      description2.textContent =
        "Startzeitpunkt: " +
        new Date(challenge.startzeitpunkt).toLocaleString("de-CH");
      cardContent.appendChild(description2);

      const description3 = document.createElement("p");
      description3.textContent =
        "Endzeitpunkt: " +
        new Date(challenge.endzeitpunkt).toLocaleString("de-CH");
      cardContent.appendChild(description3);

      const description4 = document.createElement("p");
      description4.textContent = "Total Meter: " + challenge.total_meter;
      cardContent.appendChild(description4);

      // Dropdown-Menü für Klassen erstellen
      const classDropdown = document.createElement("select");
      classDropdown.classList.add("class-dropdown");
      sportClasses.forEach((sportClass) => {
        const option = document.createElement("option");
        option.value = sportClass.sportkl_id;
        option.textContent = sportClass.name;
        classDropdown.appendChild(option);
      });

      cardContent.appendChild(classDropdown);

      // "Teilnehmen" Button erstellen
      const participateButton = document.createElement("button");
      participateButton.textContent = "Teilnehmen";
      participateButton.classList.add("participate-button");
      participateButton.onclick = () =>
        joinChallenge(challenge.challenge_id, classDropdown.value);

      cardContent.appendChild(participateButton);

      // Karte zusammenstellen
      challengeCard.appendChild(cardContent);
      selectChallengesContainer.appendChild(challengeCard);
    });
  } catch (error) {
    console.error("Fehler beim Laden der auswählbaren Challenges:", error);
  }
}
async function joinChallenge(challengeId, classId) {
  if (!classId || !challengeId) {
    alert("Bitte wähle eine gültige Klasse und Challenge aus.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/createInstance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge_id: challengeId,
          sportkl_id: classId,
        }),
      }
    );

    if (response.ok) {
      alert("Erfolgreich zur Challenge angemeldet!");
    } else if (response.status === 409) {
      alert("Diese Sportklasse nimmt bereits an dieser Challenge teil.");
    } else {
      const errorData = await response.json();
      alert(
        errorData.message ||
          "Es gab ein Problem bei der Anmeldung zur Challenge."
      );
    }
  } catch (error) {
    console.error("Fehler beim Registrieren der Challenge-Teilnahme:", error);
    alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
  }
}

async function loadCreateChallenge() {
  try {
    // Vorlagen für Challenges aus der Datenbank abrufen
    const templatesResponse = await fetch(
      "http://localhost:5000/api/v1/challenges/templates"
    );
    if (!templatesResponse.ok)
      throw new Error("Fehler beim Laden der Challenge-Vorlagen");
    const templates = await templatesResponse.json();

    // Sportklassen aus der Datenbank abrufen
    const classesResponse = await fetch(
      "http://localhost:5000/api/v1/users/sportclasses"
    );
    if (!classesResponse.ok)
      throw new Error("Fehler beim Laden der Sportklassen");
    const sportClasses = await classesResponse.json();

    const createChallengeContainer =
      document.getElementById("create-challenges");
    createChallengeContainer.innerHTML = "";

    // Formular für die Challenge-Erstellung erstellen
    const form = document.createElement("form");
    form.classList.add("create-challenge-form");

    // Dropdown-Menü für Challenge-Vorlagen
    const templateLabel = document.createElement("label");
    templateLabel.textContent = "Challenge-Vorlage auswählen:";
    const templateDropdown = document.createElement("select");
    templateDropdown.classList.add("template-dropdown");
    templates.forEach((template) => {
      const option = document.createElement("option");
      option.value = template.challengevl_id;
      option.textContent = template.name_der_challenge;
      templateDropdown.appendChild(option);
    });
    form.appendChild(templateLabel);
    form.appendChild(templateDropdown);

    // Startdatum und -zeit
    const startLabel = document.createElement("label");
    startLabel.textContent = "Startdatum und -zeit:";
    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.classList.add("start-date-input");
    const startTimeInput = document.createElement("input");
    startTimeInput.type = "time";
    startTimeInput.classList.add("start-time-input");
    form.appendChild(startLabel);
    form.appendChild(startDateInput);
    form.appendChild(startTimeInput);

    // Enddatum und -zeit
    const endLabel = document.createElement("label");
    endLabel.textContent = "Enddatum und -zeit:";
    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.classList.add("end-date-input");
    const endTimeInput = document.createElement("input");
    endTimeInput.type = "time";
    endTimeInput.classList.add("end-time-input");
    form.appendChild(endLabel);
    form.appendChild(endDateInput);
    form.appendChild(endTimeInput);

    // Dropdown-Menü für Klassen
    const classLabel = document.createElement("label");
    classLabel.textContent = "Sportklasse auswählen:";
    const classDropdown = document.createElement("select");
    classDropdown.classList.add("class-dropdown");
    sportClasses.forEach((sportClass) => {
      const option = document.createElement("option");
      option.value = sportClass.sportkl_id;
      option.textContent = sportClass.name;
      classDropdown.appendChild(option);
    });
    form.appendChild(classLabel);
    form.appendChild(classDropdown);

    // "Challenge erstellen" Button
    const createButton = document.createElement("button");
    createButton.textContent = "Challenge erstellen";
    createButton.type = "button";
    createButton.classList.add("create-button");
    createButton.onclick = () =>
      createChallenge(
        templateDropdown.value,
        startDateInput.value,
        startTimeInput.value,
        endDateInput.value,
        endTimeInput.value,
        classDropdown.value
      );
    form.appendChild(createButton);

    // Formular zur Container-DIV hinzufügen
    createChallengeContainer.appendChild(form);
  } catch (error) {
    console.error("Fehler beim Laden der Challenge-Erstellungsseite:", error);
  }
}

// Funktion zum Erstellen einer neuen Challenge basierend auf der Vorlage
async function createChallenge(
  templateId,
  startDate,
  startTime,
  endDate,
  endTime,
  selectedClass
) {
  const startDateTime = `${startDate}T${startTime}`;
  const endDateTime = `${endDate}T${endTime}`;

  const challengeData = {
    startzeitpunkt: new Date(startDateTime).toISOString(),
    endzeitpunkt: new Date(endDateTime).toISOString(),
    challengevl_id: templateId,
    sportkl_id: selectedClass,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/challenges/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challengeData),
      }
    );

    if (!response.ok) throw new Error("Fehler beim Erstellen der Challenge");

    alert("Challenge erfolgreich erstellt!");
    await loadActiveChallenges();
    await loadSelectableChallenges();
  } catch (error) {
    console.error("Fehler beim Erstellen der Challenge:", error);
  }
}

// function joinChallenge(challengeId, selectedClass) {
//   console.log(
//     `Teilnahme an Challenge mit ID ${challengeId} für Klasse ${selectedClass}`
//   );
// }
