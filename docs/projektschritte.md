# Projektschritte

## 1. Projektplanung

### Umfang des Projekts

- Allgemeine Beschreibung:

    Das Abschlussprojekt in der Informatikausbildung, das ich gerne realisieren möchte, beschäftigt sich mit der Entwicklung einer Webplattform für das interkantonale Schulprojekt "Einmal um die Schweiz". Das Ziel des Projekts ist es, Schülerinnen und Schüler mit Hilfe von Sportlehrpersonen zu unterstützen, bei verschiedenen sportlichen Aktivitäten innerhalb einer bestimmten Zeitspanne eine Distanz von 1.850 Kilometer (Länge der Schweizer Grenze) zurückzulegen.
    
    Die Webplattform soll die Teilnehmenden und ihre sportlichen Aktivitäten verwalten und auswerten, damit die Fortschritte sichtbar gemacht werden können. Dafür muss eine leistungsfähige Datenbank entwickelt werden, die es ermöglicht, die Daten effizient zu speichern, zu verarbeiten und auszuwerten.

    Neben der Datenbank müssen auch andere Aspekte der Softwareentwicklung berücksichtigt werden, wie z.B. die Gestaltung der Benutzeroberfläche, die Funktionalität der Webplattform, die Datensicherheit und die Zugänglichkeit. Hierbei muss sichergestellt werden, dass die Webplattform einfach und intuitiv zu bedienen ist, um eine hohe Benutzerzufriedenheit zu gewährleisten.
    
    Das Projekt "Einmal um die Schweiz" soll nicht nur den Teilnehmenden dazu motivieren, sich sportlich zu betätigen, sondern auch den Teamgeist fördern, indem sie interkantonal an einem gemeinsamen Ziel arbeiten. Mit diesem Projekt möchte ich zeigen, wie Informatik einen positiven Beitrag zur Förderung von Sport, Umweltbewusstsein und Gemeinschaft leisten kann.


- Erste Beta Version nur 2 - 3 Gymnasien. Erst in der zweiten Phase alle Gymer
  - Während 2 -3 Monaten Plattform öffnen, inkl. Registrierung und Durchführung.
  - Perspektive: Ev. Für alle SuS öffnen, oder sogar für alle Personen.

- Welche Funktionen und Merkmale hat die Plattform
  - Muss:
    - Anmeldeportal/ Authentifizierung ev. mit Schuladresse
    - Statistische Vergleiche innerhalb der Schule/ mit anderen Klassen etc. siehe sample Queries. unten.
    - Visualisierung des Fortschrittes
    - Verschiedene Herausforderungen vordefinieren
    - Skaliert auf Mobile Geräte
    - Visualisierung muss auch auf den mobilen Geräten gut sichtbar sein
    - Wettkämpfe noch spezifischer aufteilen, Bsp: Wer macht den Bergpreis, wer ist zuerst in Paris? Benefit für die SuS, Motivation etc…
    - Interaktionen im Wettkampf selbst forcieren, wie z.B. Pic of the day, Run Smile pic, mit Prämierung
    - Welche Daten müssen angezeigt werden:
      - Grundsätzlich muss immer in Gruppe/ Gruppe durch Anzahl Teilnehmer/
      - Es muss auch die Schülerzahl bekannt sein, damit wir die Leistungen pro Schule in Relation setzten können
      - Zurückgelegte Gesamtdistanz der Gruppe (natürlich auch immer im Verhältnis der Mitglieder)
      - Tages/Wochen/ Monatsdistanz der Gruppe
      - Anzahl Teilnehmer*innen
      - meisten Teilnehmer*innen in Relation zu Schulgrösse

### Ziele und Meilensteine

- Die Ziele sollten konkret und messbar sein
  - Eine Challange, Around Switzerland, muss präzisiert werden.
- Die Meilensteine sollen dazu beitragen, das Projekt in kleinere, leichter umsetzbare Schritte zu unterteilen.
  - Die Betaversion Challange muss einer zu bestimmenden Anzahl Sportlehrer/innen zu Verfügung gestellt werden

### Budget

- Wie viel Geld stellt zur Verfügung, ausgaben?
- Wie sind die Aussichten auf Sponsoring "Stiftung Gersch einreichen"

### Projektzeit

- Zeitrahmen, wann was abgeschlossen werden muss/ sollte.
  - 1 Jahr ab 2023. Deployment März 2024

### Team

- Rollen und Verantwortlichkeiten

### Kommunikationsplan

- Wer mit wem, wie oft und über welche Kanäle.

### Risikomanagement

- Mögliche Risiken. Risiken minimiert oder vermeiden?

### Dokumentation

- Dokumentation alle Projektaktivitäten und Entscheidungen

## 2. Anforderungsanalyse Beta Version

### Around Switzerland als Challenge

- Wettkampf, Laufkampf
  - 2 oder mehrere Gruppen messen sich in einem Laufwettkampf
  - Der Startpunkt sowie der Startzeitpunkt/ Endzeitpunkt muss gleich sein.
  - Der Endpunkt kann verschieden sein. (Prinzip Rundlauf)
- Die Eingabe der Daten muss mind. wöchentlich von einer verantwortlichen Person gemacht werden.
-Die registrierten Gruppen können sich gegenseitig herausfordern.
Bsp: als Gruppenverantwortlicher registriere ich mich zu einer Challenge, diese wird auf der Plattform sichtbar und kann von einer anderen Gruppe als Herausforderung angenommen werden. Dh. Ich kann über die Plattform eine andere Gruppe herausfordern.

- Verknüpfung der erreichten Ziele mit einer sozialen Plattform wie instagram, bzw. die verantwortliche Person kann die Ziele in einer zu definierenden Form veröffentlichen.

## 3. Usescases

Interaktionen zwischen der Plattform  und den Akteuren 

## 4.  Pflichtenheft

Exakte Definition von Zweck, Einsatzbereich und Ziele, Definitionen, Funkitonen, Annahmen und Abhaängigkeiten und v.a. Einzelanforderungen (aufgrund der Anforderungsanalyse), Abnahmekriterien.

## 5. Datenbankdesign

Datenbankmodell -> alle erforderlichen Informationen speichern, wie z.B. Teilnehmerdaten, Sportaktivitäten, zurückgelegte Entfernungen, relationales Datenbankmodell (z.B. mit MySQL, PostgreSQL) oder ein NoSQL-Datenbankmodell (z.B. MongoDB, Couchbase) Aurora  auf der Cloud seite…
Abklären, welche Cloud Server welche Dienste beanspruchen.
Personendaten müssen verschlüsselt werden.
Rechtliche Seite abklären.

## 6. Technologiestack auswählen 

Entscheiden, welcher Technologiestack passt zum Projekt.
Frontend: z.B. HTML, CSS und JavaScript 
Backend: JavaScript (mit Node.js und Express)

## 7.  Web-App-Strukturierung 

Planen und strukturieren der grundlegenden Komponenten und Funktionalitäten der Webplattform. Hierzu gehören die Benutzeroberfläche, die Navigation, die Anmelde- und Registrierungsfunktionen sowie die Darstellung von Fortschritten und Statistiken.

## 8. Datensicherheit und Datenschutz 

Die notwendigen Sicherheitsmassnahmen implementieren, um den Schutz der Benutzerdaten zu gewährleisten. Datenschutzgesetze beachten. 

## 9.  Entwicklung und Implementierung 

Entwicklung und Implementierung der Webplattform. 
Regelmässige Tests, (sicherstellen, dass alle Funktionen wie erwartet arbeiten und mögliche Fehler frühzeitig erkennen)

## 10. Feedback einholen und Optimierung 

Während des Entwicklungsprozesses regelmäßig Feedback von Lehrern, Mitschülern oder potenziellen Benutzern einholen, um die Webplattform zu optimieren und mögliche Probleme oder Verbesserungsmöglichkeiten frühzeitig zu identifizieren.

## 11. Deployment  

Server bereitstellen, sodass sie von den Teilnehmern und Lehrpersonen genutzt werden kann. Cloud-Anbieter wie AWS, Google Cloud oder Microsoft Azure, Swisscom… ev. Diesen Schritt vorziehen?

## Während jedem Schritt

Dokumentation: Umfassende Dokumentation (ev. readthedocs.org),
Beschreibung der Entwicklungsprozess, die verwendeten Technologien, die Datenbankstruktur und die Benutzeranleitung (muss laufend ergänzt werden)