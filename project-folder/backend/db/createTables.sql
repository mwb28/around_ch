/*
Zur Erstellung der Datenbank:
Ich habe die Datenbank in 7 Tabellen aufgeteilt, gemäss dem relationalen Schmema.
Erklärung zu den einzelnen Befehlen:
1. CREATE TABLE IF NOT EXISTS: Erstellt eine neue Tabelle, wenn sie noch nicht existiert.
2. PRIMARY KEY: Definiert die Primärschlüssel der Tabelle.
3. SERIAL: Definiert, dass der Wert des Primärschlüssels automatisch inkrementiert wird.
4. NOT NULL: Definiert, dass der Wert nicht NULL sein darf.
5. ENUM: Definiert, dass der Wert nur aus einer bestimmten Liste von Werten stammen darf.
6. CHECK: Definiert, dass der Wert nur aus einer bestimmten Liste von Werten stammen darf.
7. FOREIGN KEY: Definiert eine Fremdschlüsselbeziehung zwischen zwei Tabellen.
8. ON DELETE CASCADE: Definiert, dass die zugehörigen Datensätze in der referenzierten Tabelle 
    gelöscht werden, wenn der Datensatz in der aktuellen Tabelle gelöscht wird.
9. ON UPDATE CASCADE: Definiert, dass die zugehörigen Datensätze in der referenzierten Tabelle 
    aktualisiert werden, wenn der Datensatz in der aktuellen Tabelle aktualisiert wird.
10. DECIMAL(10, 2): Definiert eine Dezimalzahl mit einer Genauigkeit von 10 Stellen und 2 Dezimalstellen.
11. DATE: Definiert ein Datum.
12. TIME: Definiert eine Zeit.
13. DATETIME: Definiert ein Datum und eine Zeit.
14. VARCHAR(40): Definiert eine Zeichenfolge mit einer Länge von 40 Zeichen.
15. VARCHAR(255): Definiert eine Zeichenfolge mit einer Länge von 255 Zeichen.
16. ENUM('m', 'w', 'd'): Definiert, dass der Wert nur aus den Werten 'm', 'w' oder 'd' stammen darf.
17. REFERENCES: Definiert die referenzierte Tabelle und die referenzierte Spalte für die 
    Fremdschlüsselbeziehung.
18. SET NULL: Definiert, dass der Wert des Fremdschlüssels auf NULL gesetzt wird, wenn der zugehörige 
    Datensatz in der referenzierten Tabelle gelöscht oder aktualisiert wird.
*/
CREATE TABLE IF NOT EXISTS schule (
    schul_id SERIAL PRIMARY KEY,
    schulname VARCHAR(40) NOT NULL,
    kanton VARCHAR(2) NOT NULL
        CHECK (kanton IN ('AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 
                          'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 
                          'VD', 'VS', 'ZG', 'ZH'))
);

CREATE TABLE IF NOT EXISTS sportlehrperson (
    sportl_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    vorname VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sportklasse (
    sportkl_id SERIAL, -- serial to auto increment id for class
    schul_id INT,
    name VARCHAR(40) NOT NULL,
    sportl_id INT,
    PRIMARY KEY (sportkl_id, schul_id), -- Composite primary key
    FOREIGN KEY (schul_id) REFERENCES schule(schul_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (sportl_id) REFERENCES sportlehrperson(sportl_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS schueler (
    schueler_id SERIAL PRIMARY KEY,
    nachname VARCHAR(40), -- optional
    vorname VARCHAR(40), -- optional
    jahrgang INT NOT NULL,
    geschlecht VARCHAR(1) NOT NULL
        CHECK (geschlecht IN ('m', 'w', 'd')), -- Replacing ENUM with CHECK constraint
    sportkl_id INT,
    schul_id INT,
    FOREIGN KEY (sportkl_id, schul_id) REFERENCES sportklasse(sportkl_id, schul_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS challenge (
    challenge_id SERIAL PRIMARY KEY,
    art VARCHAR(40) NOT NULL,
    startzeitpunkt TIMESTAMP NOT NULL,
    endzeitpunkt TIMESTAMP NOT NULL
);

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

CREATE TABLE IF NOT EXISTS nimmtteilan (
    sportkl_id INT,
    schul_id INT,
    challenge_id INT,
    PRIMARY KEY (sportkl_id, schul_id, challenge_id),
    FOREIGN KEY (sportkl_id, schul_id) REFERENCES sportklasse(sportkl_id, schul_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id) ON DELETE CASCADE ON UPDATE CASCADE
);
