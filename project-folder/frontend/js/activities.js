async function submitActivity() {
  const form = document.getElementById("activityForm");

  const urlParams = new URLSearchParams(window.location.search);
  const instanceId = urlParams.get("instanceId");

  if (!instanceId) {
    alert("Instanz-ID fehlt in der URL.");
    return;
  }

  const data = {
    meter: form.meter.value,
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
      `http://localhost:5000/api/v1/challenges/addActivity`,
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
