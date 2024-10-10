CREATE TABLE sportlehrpersonen (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    schule VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) -- Hier die Passwörter später verschlüsseln!
);

CREATE TABLE klassen (
    id SERIAL PRIMARY KEY,
    bezeichnung VARCHAR(100),
    schule VARCHAR(100),
    sportlehrperson_id INT REFERENCES sportlehrpersonen(id)
);

CREATE TABLE laufaktivitaeten (
    id SERIAL PRIMARY KEY,
    schueler_name VARCHAR(100),
    klasse_id INT REFERENCES klassen(id),
    datum DATE,
    distanz DECIMAL
);

CREATE TABLE herausforderungen (
    id SERIAL PRIMARY KEY,
    herausfordernde_klasse_id INT REFERENCES klassen(id),
    herausgeforderte_klasse_id INT REFERENCES klassen(id),
    startdatum DATE,
    enddatum DATE
);
