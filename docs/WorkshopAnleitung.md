# Workshop Anleitung

In diesem Workshop lernen Sie, wie Sie mit dem Gemini CLI Agenten von Google eine einfache ToDo-Anwendung erstellen können. Der Agent wird die Anwendung basierend auf den vorgegebenen Anforderungen generieren.

## 1. Voraussetzungen

Es muss Node.js (Version 20 oder höher) und npm auf dem System installiert sein. Zusätzlich wird ein moderner Webbrowser benötigt, um die Anwendung auszuführen.

Installieren Sie Node.js von der offiziellen Webseite: [https://nodejs.org/en/download](https://nodejs.org/en/download).

## 2. Installation der Gemini CLI

Öffnen Sie ein Terminal oder eine Eingabeaufforderung und führen Sie den folgenden Befehl aus, um die Gemini CLI global zu installieren:

```bash
npm install -g @google/gemini-cli
```

## 3. Repository klonen

Klonen Sie das Repository für den Workshop mit dem folgenden Befehl:

```bash
git clone https://github.com/jtuttas/Softwareentwicklung_KI
```

> Wenn Sie kein Git installiert haben, können Sie das Repository auch als ZIP-Datei herunterladen und entpacken.

Öffnen Sie das Terminal und navigieren Sie in das geklonte oder entpackte Verzeichnis:

```bash 
cd Softwareentwicklung_KI
```
## 4. Starten des Gemini Agenten

Starten Sie den Gemini Agenten mit dem folgenden Befehl:

```bash
gemini
```

> ggf. müssen Sie sich mit Ihrem Google-Konto anmelden und die erforderlichen Berechtigungen erteilen.

## 5. Prompt verwenden

Starten Sie den Gemini Agenten und nutzen Sie folgenden Prompt:

```txt
Erstelle mir die Anwendung wie in den Anforderungen beschrieben
```

Der Agent wird nun die Anwendung basierend auf den im Repository enthaltenen Anforderungen generieren.

## 6. Anwendung ausführen

Navigieren Sie in das Verzeichnis `src` innerhalb des geklonten Repositorys:

Öffnen Sie die Datei `index.html` in einem modernen Webbrowser, um die ToDo-Anwendung zu starten. Die Anwendung ist sofort einsatzbereit und speichert Daten lokal in Ihrem Browser.

## 7. Weitere Schritte (MCP)

Erstellen Sie via MCP (Playwright MCP Server) Screenshots der Anwendung und generieren Sie eine README.md Datei mit den Screenshots.

```txt
Ergänze Projektdokumentation.md um Screenshots der Anwendung
```

## 8. Veröffentlichung auf Azure (MCP)

Veröffentlichen Sie die Anwendung auf Azure mittels Azure MCP Server.

```txt
Veröffentliche mir die Anwendung auf Azure nutze Azure MCP 
```

> Stellen Sie sicher, dass Sie ein Azure-Konto haben und die erforderlichen Berechtigungen zum Veröffentlichen von Webanwendungen besitzen.








