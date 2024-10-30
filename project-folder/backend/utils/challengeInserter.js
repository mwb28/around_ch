require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// PostgreSQL connection pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function insertChallengesFromExcelAndGeoJSON() {
  let client;

  try {
    // Step 1: Read the Excel file from the 'data' directory
    const excelFilePath = path.join(__dirname, "../../data/challenges.xlsx");
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const challengesData = xlsx.utils.sheet_to_json(worksheet);

    // Step 2: Prepare to insert combined data into the database
    client = await pool.connect();
    await client.query("BEGIN");

    for (const challenge of challengesData) {
      try {
        // Determine the corresponding GeoJSON file by using the 'geojson_key'
        const geojsonKey = challenge.geojson_key;
        const geojsonFilePath = path.join(
          __dirname,
          `../../data/geojson_files/${geojsonKey}.geojson`
        );

        // Step 3: Read the GeoJSON file
        if (!fs.existsSync(geojsonFilePath)) {
          throw new Error(
            `GeoJSON file not found for geojson_key: ${geojsonKey}`
          );
        }

        const geojsonData = JSON.parse(
          fs.readFileSync(geojsonFilePath, "utf-8")
        );

        // Step 4: Insert the combined data into the challenge_vorlage table
        await client.query(
          `INSERT INTO challenge_vorlage (art_der_challenge, total_meter, geojson_daten)
           VALUES ($1, $2, $3)`,
          [
            challenge.art_der_challenge,
            challenge.total_meter,
            geojsonData, // Insert the entire GeoJSON data as JSONB
          ]
        );

        console.log(
          `Successfully inserted challenge: ${challenge.art_der_challenge}`
        );
      } catch (insertError) {
        console.error(
          `Error inserting challenge: ${challenge.art_der_challenge}`,
          insertError
        );
        await client.query("ROLLBACK");
        client.release();
        return;
      }
    }

    await client.query("COMMIT");
    console.log("All challenges have been successfully inserted.");
  } catch (dbError) {
    console.error("Datenbankfehler", dbError);
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Execute the function to insert challenges
insertChallengesFromExcelAndGeoJSON();
