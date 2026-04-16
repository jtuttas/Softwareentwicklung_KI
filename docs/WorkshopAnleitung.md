# Workshop Anleitung

In diesem Workshop lernen Sie, wie Sie mit dem Github Copilot CLI Agenten eine einfache ToDo-Anwendung erstellen können. Der Agent wird die Anwendung basierend auf den vorgegebenen Anforderungen generieren.

## 1. Voraussetzungen

1. Es muss **Node.js** (Version 20 oder höher) auf dem System installiert sein [https://nodejs.org/en/download](https://nodejs.org/en/download). 

2. Ein **Github Account** ist erforderlich, um die Github Copilot CLI zu verwenden und die Anwendung zu generieren.

## 2. Installation der Github Copilot CLI

Öffnen Sie ein Terminal oder eine Eingabeaufforderung und führen Sie den folgenden Befehl aus, um die Github Copilot CLI global zu installieren:

```bash
npm install -g @github/copilot
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

## 4. Starten des Github Copilot Agenten

Starten Sie den Github Copilot Agenten mit dem folgenden Befehl:

```bash
copilot
```

> ggf. müssen Sie sich mit Ihrem Github-Konto anmelden und die erforderlichen Berechtigungen erteilen.

## 5. Prompt verwenden

Starten Sie den Github Copilot Agenten und nutzen Sie folgenden Prompt:

```txt
Erstelle mir die Anwendung wie in den Anforderungen beschrieben
```

Der Agent wird nun die Anwendung basierend auf den im Repository enthaltenen Anforderungen generieren.

## 6. Anwendung ausführen

Navigieren Sie in das Verzeichnis `src` innerhalb des geklonten Repositorys:

Öffnen Sie die Datei `index.html` in einem modernen Webbrowser, um die ToDo-Anwendung zu starten. Die Anwendung ist sofort einsatzbereit und speichert Daten lokal in Ihrem Browser.

## 7. Skills verwenden

Im Repository ist bereits ein Skill definiert, der die Erstellung einer IHK Projektdokumentation ermöglicht. Sie können diesen Skill nutzen, um eine Projektdokumentation für die erstellte Anwendung zu generieren.

```txt
Erstelle mir eine IHK Projektdokumentation für die Anwendung wie in den Anforderungen beschrieben
```

## 8. Weitere Schritte (MCP)

Erstellen Sie via MCP (Playwright MCP Server) Screenshots der Anwendung und generieren Sie eine README.md Datei mit den Screenshots.

```txt
Ergänze Bedienungsanleitung.md um Screenshots der Anwendung, nutze Playwright MCP Server um die Screenshots zu erstellen
```

## 9. Veröffentlichung auf Azure (MCP)

Veröffentlichen Sie die Anwendung auf Azure mittels Azure MCP Server.

```txt
Veröffentliche mir die Anwendung auf Azure nutze Azure MCP 
```

> Stellen Sie sicher, dass Sie ein Azure-Konto haben und die erforderlichen Berechtigungen zum Veröffentlichen von Webanwendungen besitzen.

