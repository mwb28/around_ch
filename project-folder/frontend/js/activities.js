async function submitActivity() {
  const form = document.getElementById("activityForm");

  const urlParams = new URLSearchParams(window.location.search);
  const instanceId = urlParams.get("instanceId");
  const challengeStart = new Date(urlParams.get("startzeit"));
  const challengeEnd = new Date(urlParams.get("endzeit"));

  if (!instanceId) {
    alert("Instanz-ID fehlt in der URL.");
    return;
  }

  const anzahlM = parseInt(form.male_count.value, 10);
  const anzahlW = parseInt(form.female_count.value, 10);
  const anzahlD = parseInt(form.diverse_count.value, 10);

  function isValidPositiveNumber(value) {
    return !isNaN(value) && value > 0 && Number.isInteger(value);
  }
  if (
    !isValidPositiveNumber(anzahlM) &&
    form.male_count.value.trim() !== "" &&
    !isValidPositiveNumber(anzahlW) &&
    form.female_count.value.trim() !== "" &&
    !isValidPositiveNumber(anzahlD) &&
    form.diverse_count.value.trim() !== ""
  ) {
    alert(
      "Bitte geben Sie mindestens einen Teilnehmer an (nur positive ganze Zahlen)."
    );
    return;
  }

  const duration = parseInt(form.duration.value, 10);

  if (isNaN(duration) || duration < 0 || !Number.isInteger(duration)) {
    alert("Bitte geben Sie eine gültige Dauer an (nur positive ganze Zahlen).");
    return;
  }

  if (!form.date.value) {
    alert("Bitte geben Sie ein Datum an.");
    return;
  }

  if (!form.time.value) {
    alert("Bitte geben Sie eine Uhrzeit an.");
    return;
  }

  const anzahlMeter = parseInt(form.meter.value, 10);
  if (isNaN(anzahlMeter) || anzahlMeter < 1) {
    alert("Bitte geben Sie die Anzahl der Meter an (mindestens 1 Meter).");
    return;
  }

  const anzahlTeilnehmer = anzahlM + anzahlW + anzahlD;
  const averageMeter = Math.floor(anzahlMeter / anzahlTeilnehmer);

  const startDate = new Date(form.date.value + "T" + form.time.value);
  const endDate = new Date(
    startDate.getTime() + parseInt(form.duration.value, 10) * 60000
  );
  if (startDate < challengeStart) {
    alert(
      `Der Zeitpunkt darf nicht vor dem Startzeitpunkt der Challenge liegen.(Challenge Start: ${new Date(
        challengeStart
      ).toLocaleString("de-CH")})`
    );
    return;
  }
  if (endDate > challengeEnd) {
    alert(
      `Der Zeitpunkt darf nicht nach dem Endzeitpunkt der Challenge liegen.(Challenge Ende: ${new Date(
        challengeEnd
      ).toLocaleString("de-CH")})`
    );
    return;
  }

  const data = {
    meter: averageMeter,
    uhrzeit: form.time.value,
    datum: form.date.value,
    dauer: form.duration.value,
    anzahl_m: form.male_count.value,
    anzahl_w: form.female_count.value,
    anzahl_d: form.diverse_count.value,
    instanz_id: instanceId,
  };

  try {
    const response = await fetch(
      `${window.backendUrl}/api/v1/challenges/addActivity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      alert("Aktivität erfolgreich gesendet!");
      form.reset();
      window.location.href = "./dashboard.html";
    } else {
      alert("Fehler beim Senden der Aktivität.");
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Ein Fehler ist aufgetreten.");
  }
}
