/*
Zur Erstellung der Datenbank:
Ich habe die Datenbank in 7 Tabellen aufgeteilt, gemäss dem relationalen Schema.
Erklärung zu den einzelnen Befehlen:
1. CREATE TABLE IF NOT EXISTS: Erstellt eine neue Tabelle, wenn sie noch nicht existiert.
2. SERIAL: Erstellt eine automatisch inkrementierte Zahl.
3. PRIMARY KEY: Definiert die Spalte als Primärschlüssel.
4. NOT NULL: Definiert, dass die Spalte nicht NULL sein darf.
5. CHECK: Definiert, dass die Spalte nur bestimmte Werte annehmen darf.
6. FOREIGN KEY: Definiert eine Fremdschlüsselbeziehung zwischen zwei Tabellen.
7. ON DELETE CASCADE: Löscht alle Zeilen in der Tabelle, die auf den gelöschten Fremdschlüssel verweisen.
8. ON UPDATE CASCADE: Aktualisiert alle Zeilen in der Tabelle, die auf den aktualisierten Fremdschlüssel verweisen.
9. JSONB: Definiert eine Spalte als JSON-Datentyp.
10. TIMESTAMP: Definiert eine Spalte als Zeitstempel.
11. DATE: Definiert eine Spalte als Datum.
12. TIME: Definiert eine Spalte als Zeit.
13. INT: Definiert eine Spalte als Ganzzahl.
14. VARCHAR: Definiert eine Spalte als Zeichenfolge mit einer maximalen Länge.

*/

-- Tabelle "Schule"
CREATE TABLE IF NOT EXISTS schule (
    schul_id SERIAL PRIMARY KEY,
    schulname VARCHAR(255) NOT NULL,
    kanton VARCHAR(2) NOT NULL
        CHECK (kanton IN ('AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 
                          'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 
                          'VD', 'VS', 'ZG', 'ZH'))
);

-- Tabelle "Sportlehrperson"
CREATE TABLE IF NOT EXISTS sportlehrperson (
    sportl_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vorname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_gehashed VARCHAR(255) NOT NULL,
    schul_id INT,
    needs_password_change BOOLEAN DEFAULT false,
    FOREIGN KEY (schul_id) REFERENCES schule(schul_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Sportklasse"
CREATE TABLE IF NOT EXISTS sportklasse (
    sportkl_id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    jahrgang INT NOT NULL,
    sportl_id INT,
     schul_id INT,
    FOREIGN KEY (sportl_id) REFERENCES sportlehrperson(sportl_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (schul_id) REFERENCES schule(schul_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Challenge Vorlage"
CREATE TABLE IF NOT EXISTS challenge_vorlage(
    challengevl_id SERIAL PRIMARY KEY,
    art_der_challenge VARCHAR(100) NOT NULL,
    total_meter INT NOT NULL,
    geojson_daten JSONB
);

-- Tabelle "Challenge"
CREATE TABLE IF NOT EXISTS challenge (
    challenge_id SERIAL PRIMARY KEY,
    startzeitpunkt TIMESTAMP NOT NULL,
    meters_completed INT DEFAULT 0,
    endzeitpunkt TIMESTAMP,
    abgeschlossen BOOLEAN DEFAULT false,
    challengevl_id INT,
    sportl_id INT,
    FOREIGN KEY (challengevl_id) REFERENCES challenge_vorlage(challengevl_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (sportl_id) REFERENCES sportlehrperson(sportl_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Sportliche Leistung"
CREATE TABLE IF NOT EXISTS sportlicheleistung (
    zaehler_id SERIAL PRIMARY KEY,
    meter INT NOT NULL,
    uhrzeit TIME DEFAULT NOW(),
    datum DATE NOT NULL,
    dauer TIME NOT NULL,
    anzahl_m INT,
    anzahl_w INT,
    anzahl_d INT,
    challenge_id INT,
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id) ON DELETE SET NULL ON UPDATE CASCADE
  
);

-- Tabelle "Teilnahme"
CREATE TABLE IF NOT EXISTS nimmtteilan (
    sportkl_id INT,
    challenge_id INT,
    gegner_sportkl_id INT,
    PRIMARY KEY (sportkl_id, challenge_id),
    CONSTRAINT check_sportkl_id CHECK (sportkl_id != gegner_sportkl_id),
    FOREIGN KEY (sportkl_id) REFERENCES sportklasse(sportkl_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (gegner_sportkl_id) REFERENCES sportklasse(sportkl_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Tabelle "Invalide Tokens"
CREATE TABLE invalidated_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    invalidated_at TIMESTAMP DEFAULT NOW()
);

