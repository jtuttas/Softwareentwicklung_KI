# ToDo App für die Thiese GmbH

## Lastenheft

### Ist-Zustand

Derzeit gibt es keine digitale Lösung zur Verwaltung von Aufgaben bei der Thiese GmbH. Aufgaben werden manuell auf Papier oder in einfachen Textdateien verwaltet, was zu Ineffizienzen und Fehlern führt.

### Zielsetzung

Die Anwendung sollte es ermöglichen, Mitarbeitern diverse Aufgaben (To-dos) zuzuordnen und diese mit Prioritäten zu versehen. Die Aufgaben sind unterschiedlichen Projekten zugewiesen. Der Zugriff der ToDo-App soll per Desktop-PC sowie via Tablet und Smartphone möglich sein (responsive Design). Die Benutzerschnittstelle soll keine komplexen Grafiken enthalten und effizient geladen werden. Es ist nicht geplant eine Mehrsprachigkeit anzubieten. Ebenso ist der Grad der Barrierefreiheit als gering zu bewerten. Es werden keine Fehler in der GUI toleriert. Die Anwendung soll schnell auf Benutzereingaben reagieren.

Meldet sich ein Mitarbeiter an dem System an (sofern er nicht schon angemeldet war), so sieht er eine Liste der zu bearbeitenden Aufgaben. Über eine Detailanzeige kann er hierbei erkennen, zu welchem Projekt die Aufgabe gehört, welche Priorität sie hat und wer noch daran mitarbeitet. Er hat ferner die Möglichkeit, die Aufgabe als erledigt zu markieren.

Abteilungsleiter sind auch Mitarbeiter. Wenn sich ein Abteilungsleiter am System anmeldet, so hat er darüber hinaus die Möglichkeit, die Aufgaben seiner Mitarbeiter zu sehen, sowie neue Aufgabe zu erstellen, diesen Mitarbeitern zuzuweisen und die Aufgaben diversen Prioritäten sowie Projekten zuzuordnen. Ferner verfügt er über die Berechtigung, neue Projekte anzulegen.

Der Administrator des Systems kann Benutzerkonten anlegen und für diese Rollen vergeben und ändern. Das Backend steht in Form einer REST-API zur Verfügung. In diesem Lernfeld soll für diese Anwendung ein Frontend entwickelt werden.

## Funktionale Anforderungen

* Für die Rollen Mitarbeiter, Abteilungsleiter und Administrator sollen unterschiedliche Funktionen bereitgestellt werden.

* Die Authentifizierung der Benutzer erfolgt über ein Login-System.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben zu suchen und zu filtern.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben zu sortieren.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben zu löschen und zu bearbeiten.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben als erledigt zu markieren.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben zu erstellen.

* Die Anwendung soll eine einfache Möglichkeit bieten, Projekte und Prioritäten zu erstellen, zu ändern und zu löschen.

* Die Anwendung soll eine einfache Möglichkeit bieten, Projekte und Prioritäten zu filtern und zu sortieren.

* Es soll eine Validierung der Eingaben erfolgen, um Fehler zu vermeiden.

* Die Anwendung soll eine einfache Möglichkeit bieten, Fälligkeitsdaten für Aufgaben zu setzen und zu ändern.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben nach Fälligkeit, Priorität und Projekten zu filtern.

* Die Anwendung soll eine einfache Möglichkeit bieten, Aufgaben nach Fälligkeit und Priorität zu sortieren.



### Nicht-funktionale Anforderungen

* Die Anwendung muss auf verschiedenen Bildschirmgrößen (Desktop, Tablet, Smartphone) gut nutzbar sein (Responsive Design).

* Die Benutzeroberfläche soll intuitiv und einfach zu bedienen sein.

* Die Anwendung soll schnell reagieren und eine flüssige Benutzererfahrung bieten.

* Die Anwendung soll eine einfache und klare Navigation bieten.

* Die Anwendung soll eine ansprechende und moderne Benutzeroberfläche haben.

## Dokumentation

* Es soll eine ausführliche Dokumentation der Anwendung geben, die die Funktionen und die Bedienung erklärt.
* Die Dokumentation soll Screenshots der Benutzeroberfläche in verschiedenen Zuständen (Desktop/Mobile) enthalten.

## Projektdokumentation

* Es soll eine Projektdokumentation (Project.md) geben, die den Entwicklungsprozess, die verwendeten Technologien und die Architektur der Anwendung beschreibt.
* Die Projektdokumentation soll einen Umfang von 15 Seiten nicht unterschreiten.
* Die Projektdokumentation soll eine Einleitung, eine Beschreibung der Anforderungen, eine Beschreibung der Architektur und Technologien, eine Beschreibung des Entwicklungsprozesses und ein Fazit enthalten.
* Die Projektdokumentation enthält, ein Titelblatt mit Projektnamen, Autor, Datum und Version und ein Inhaltsverzeichnis.
* Die Projektdokumentation soll auch Herausforderungen und deren Lösungen während der Entwicklung dokumentieren.
* Der Zeitliche Umfang für das gesamte Projekt einschließlich Dokumentation soll 80 Stunden nicht überschreiten.
* Die Projektdokumentation soll in einem professionellen Layout gestaltet sein.

### Qualitätsanforderungen

* Ziele, Kundenwünsche und Teilaufgaben sind umfassend dargestellt, Umfeld und Schnittstellen sind umfassend beschrieben
* Ressourcen umfassend angeführt, Termine und Kosten transparent dargestellt, Ablauf klar und übersichtlich
* Durchführung der Prozessschritte umfassend dargestellt, Anpassungen und Folgen umfassend begründet und berücksichtigt
* Abnahme umfassend dargestellt, Prozess und Ergebnis umfassend bewertet
* Die Dokumentation weist insgesamt überzeugende Gestaltung auf.
* Die Dokumentation ist auftragsgerecht, gut strukturiert und deutlich nachvollziehbar
* Die Dokumentation ist sprachlich einwandfrei und formal korrekt
* Die Dokumentation ist inhaltlich vollständig und fachlich korrekt
* Die Dokumentation verwendet geeignete Darstellungsformen (z. B. Tabellen, Diagramme, Abbildungen) zur Unterstützung des Textes
* Die Dokumentation ist ansprechend gestaltet (z. B. Layout, Schriftarten, Farben)
* Die Dokumentation ist gut lesbar und übersichtlich
* Die Dokumentation ist zielgruppenorientiert verfasst
