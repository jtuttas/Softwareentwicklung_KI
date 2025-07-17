# ToDo App

## Lastenheft

Die Anwendung sollte es ermöglichen, Mitarbeitern diverse Aufgaben (To-dos) zuzuordnen und diese mit Prioritäten zu versehen. Die Aufgaben sind unterschiedlichen Projekten zugewiesen. Der Zugriff der ToDo-App soll per Desktop-PC sowie via Tablet und Smartphone möglich sein (**responsive Design**). Die Benutzerschnittstelle soll keine komplexen Grafiken enthalten und effizient **dynamisch** geladen werden. Es ist nicht geplant eine Mehrsprachigkeit anzubieten. Ebenso ist der Grad der **Barrierefreiheit** als gering zu bewerten. Es werden keine Fehler in der GUI toleriert. Die Anwendung soll schnell auf Benutzereingaben reagieren.

Meldet sich ein Mitarbeiter an dem System an (sofern er nicht schon angemeldet war), so sieht er eine Liste der zu bearbeitenden Aufgaben. Über eine Detailanzeige kann er hierbei erkennen, zu welchem Projekt die Aufgabe gehört und welche Priorität sie hat. Er hat ferner die Möglichkeit, die Aufgabe als erledigt zu markieren.

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

