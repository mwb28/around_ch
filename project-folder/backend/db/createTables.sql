/*
Zur Erstellung der Datenbank:
Ich habe die Datenbank in 7 Tabellen aufgeteilt, gemäß dem relationalen Schema.
Erklärung zu den einzelnen Befehlen:
1. CREATE TABLE IF NOT EXISTS: Erstellt eine neue Tabelle, wenn sie noch nicht existiert.
2. PRIMARY KEY: Definiert den Primärschlüssel der Tabelle.
3. SERIAL: Definiert, dass der Wert des Primärschlüssels automatisch inkrementiert wird.
4. NOT NULL: Definiert, dass der Wert nicht NULL sein darf.
5. CHECK: Definiert, dass der Wert nur aus einer bestimmten Liste von Werten stammen darf.
6. FOREIGN KEY: Definiert eine Fremdschlüsselbeziehung zwischen zwei Tabellen.
7. ON DELETE CASCADE: Definiert, dass die zugehörigen Datensätze in der referenzierten Tabelle
   gelöscht werden, wenn der Datensatz in der aktuellen Tabelle gelöscht wird.
8. ON UPDATE CASCADE: Definiert, dass die zugehörigen Datensätze in der referenzierten Tabelle
   aktualisiert werden, wenn der Datensatz in der aktuellen Tabelle aktualisiert wird.
9. DECIMAL(10, 2): Definiert eine Dezimalzahl mit einer Genauigkeit von 10 Stellen und 2 Dezimalstellen.
10. DATE: Definiert ein Datum.
11. TIME: Definiert eine Uhrzeit.
12. DATETIME: Definiert ein Datum und eine Uhrzeit.
13. VARCHAR(40): Definiert eine Zeichenfolge mit einer Länge von 40 Zeichen.
14. VARCHAR(255): Definiert eine Zeichenfolge mit einer Länge von 255 Zeichen.
15. REFERENCES: Definiert die referenzierte Tabelle und die referenzierte Spalte für die Fremdschlüsselbeziehung.
16. SET NULL: Definiert, dass der Wert des Fremdschlüssels auf NULL gesetzt wird, wenn der zugehörige Datensatz
    in der referenzierten Tabelle gelöscht oder aktualisiert wird.
*/

-- Tabelle "Schule"
CREATE TABLE IF NOT EXISTS schule (
    schul_id SERIAL PRIMARY KEY,
    schulname VARCHAR(40) NOT NULL,
    kanton VARCHAR(2) NOT NULL
        CHECK (kanton IN ('AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 
                          'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 
                          'VD', 'VS', 'ZG', 'ZH'))
);

-- Tabelle "Sportlehrperson"
CREATE TABLE IF NOT EXISTS sportlehrperson (
    sportl_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    vorname VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabelle "Sportklasse"
CREATE TABLE IF NOT EXISTS sportklasse (
    sportkl_id SERIAL, -- Serial zur automatischen Inkrementierung der ID für die Klasse
    schul_id INT,
    name VARCHAR(40) NOT NULL,
    sportl_id INT,
    PRIMARY KEY (sportkl_id, schul_id), -- Zusammengesetzter Primärschlüssel
    FOREIGN KEY (schul_id) REFERENCES schule(schul_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (sportl_id) REFERENCES sportlehrperson(sportl_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Schüler"
CREATE TABLE IF NOT EXISTS schueler (
    schueler_id SERIAL PRIMARY KEY,
    nachname VARCHAR(40), -- Optional
    vorname VARCHAR(40), -- Optional
    jahrgang INT NOT NULL,
    geschlecht VARCHAR(1) NOT NULL
        CHECK (geschlecht IN ('m', 'w', 'd')),
    sportkl_id INT,
    schul_id INT,
    FOREIGN KEY (sportkl_id, schul_id) REFERENCES sportklasse(sportkl_id, schul_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Challenge"
CREATE TABLE IF NOT EXISTS challenge (
    challenge_id SERIAL PRIMARY KEY,
    art VARCHAR(40) NOT NULL,
    startzeitpunkt TIMESTAMP NOT NULL,
    endzeitpunkt TIMESTAMP NOT NULL
);

-- Tabelle "Sportliche Leistung"
CREATE TABLE IF NOT EXISTS sportlicheleistung (
    zaehler_id SERIAL PRIMARY KEY,
    km DECIMAL(10, 2) NOT NULL,
    sportart VARCHAR(40) NOT NULL,
    datum DATE NOT NULL,
    uhrzeit TIME NOT NULL,
    dauer TIME NOT NULL,
    challenge_id INT,
    schueler_id INT,
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (schueler_id) REFERENCES schueler(schueler_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabelle "Teilnahme"
CREATE TABLE IF NOT EXISTS nimmtteilan (
    sportkl_id INT,
    schul_id INT,
    challenge_id INT,
    PRIMARY KEY (sportkl_id, schul_id, challenge_id),
    FOREIGN KEY (sportkl_id, schul_id) REFERENCES sportklasse(sportkl_id, schul_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id) ON DELETE CASCADE ON UPDATE CASCADE
);
