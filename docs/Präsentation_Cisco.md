---
marp: true
theme: uncover
size: 16:9
paginate: true


class: 
  - lead
  - invert
---

<!-- header: Nationaler Cisco Akademien Tage 2026  -->

![bg opacity:40%](agentSmith_16_9.png)

# Agenten getriebene Softwareentwicklung

#### von und mit Jörg Tuttas

Leiter des Bildungsgangs f. Fachinformatiker Anwendungsentwicklung

#### MMBbS Hannover

---

![bg blur:3px opacity](pic2.png)

> KI wird Sie nicht ersetzen, aber Entwickler, die KI nutzen, werden Entwickler ersetzen, die es nicht tun.

---

![bg left:33% ](agenda.png)

- Überblick aktuelle Agenten (**github Copilot**, Codex, Gemini CLI, Claude *Desktop/CLI*)
- Workshop: Erstellen einer App mit Agenten
- MCP - Model Context Protocol



---

![bg right:25% ](agentSmith.png)

# Agenten

> Agenten haben einen Auftrag und nutzen Werkzeuge, um diesen Auftrag zu erfüllen.



---

![bg left:25% ](agentSmith.png)


# Bekannte Agenten:

- Claude Desktop / CLI (Anthropic)
- Codex Web/CLI (OpenAI)
- github Copilot / CLI (Microsoft)
- Gemini CLI (Google)



---

![bg blur:3px opacity](pic2.png)

## Claude Desktop (Anthropic)

![claude](claude.png)

<!-- https://www.qrcode-monkey.com/ -->



---

![bg blur:3px opacity](pic2.png)

## Claude Code (Anthropic)

![claude](claude-code.png)

<!-- https://www.qrcode-monkey.com/ -->



---

![bg blur:6px opacity](pic2.png)

### Codex Web der Agent in der Cloud

<https://jtuttas.github.io/codextest/>

![codex](codex.png)

<!-- Am besten den main Branch im  https://github.com/jtuttas/codextest Repository wählen, da hier Github Pages aktiviert ist über <https://jtuttas.github.io/codextest/> -->






---

![bg blur:6px opacity](pic2.png)

## Github Copilot CLI 

![copilot](copilot.png)



---

![bg blur:6px opacity](pic2.png)

## Codex CLI der Agent von OpenAI im Terminal

![codex](codex-cli.png)



---

![bg blur:6px opacity](pic2.png)

## Gemini CLI der Agent von google im Terminal

![gemini](gemini.png)



---

![bg left:25% ](workshop.png)

## Github Copilot CLI installieren

> node.js muss installiert sein <https://nodejs.org/en/download>

## anschließend in der Konsole:

```bash
npm install -g @github/copilot

```



---

![bg right:25% ](workshop.png)

## Repository zum Workshop

Clonen Sie sich das folgende Repository:

```bash 
git clone https://github.com/jtuttas/Softwareentwicklung_KI
```


---

![bg left:25% ](workshop.png)

## Die wichtigsten Dateien im Repository

- PRD.md - Produkt Requirements Document, das Lastenheft der Anwendung
- SRS.md - Software Requirements Specification, das Pflichtenheft der Anwendung
- AGENTS.md - Beschreibung für den Agenten



---

![bg right:25% ](workshop.png)

# Prompt

Starten Sie den Github Copilot via **copilot** und nutzen Sie folgenden Prompt:

```txt
Erstelle mir die Anwendung wie in den Anforderungen beschrieben
```

---
![bg left:25% ](smith_skill.png)

# Skills

Skills sind klar abgegrenzte Fähigkeiten oder Bausteine, mit denen ein KI-Agent bestimmte Aufgaben zuverlässig ausführen kann.

```txt
Erstelle mir eine IHK Projektdokumentation für die Anwendung wie in den Anforderungen beschrieben
```

---

![bg blur:3px opacity](pic2.png)

## MCP - Model Context Protocol

> Die KI Agenten bekommen Werkzeuge



---



## Architektur MCP

![MCP Architektur](https://cdn.prod.website-files.com/6295808d44499cde2ba36c71/685b65381dde1a7cfd6e57da_AD_4nXdHa_WaBxdnittoF8ZKISlwErtJ3fc-yV76exBYQeUyOHZbx4V3CMu-ngh5wg2DdNWkC5eDJyVSIVkqX5rtV2Qrfc2TKRv2z_oSqNsiX73sRdJqxlu2pnxPIe4svBtSPj4zvEu5iQ.png)



---

![bg right:25% ](AgentSmithMCP.png)

Über /mcp können die unterschiedlichen MCP Server und deren Tools angezeigt werden

# Prompt

```txt
Ergänze die Benutzeranleitung.md um Screenshots der Anwendung, 
nutze Playwright MCP Server um die Screenshots zu erstellen
```


---

![bg left:25% ](AgentSmithMCP.png)

Im Projekt enthalten ist auch ein Azure MCP Server.

# Prompt

```txt
Veröffentliche mir die Anwendung auf Azure nutze Azure MCP 
```

<small style="position:absolute;bottom:30px;color:#888">¹ Sofern Sie über die notwendigen Berechtigungen verfügen</small>

---

![bg right:25% ](AgentSmithMCP.png)

## MCP Server Datenbank

![mcpso](mcpso.png)

---

![bg left:33% ](smith_cooked.png)

## Was bleibt?

- Wie kann dis Ausbildung zum Fachinformatiker auf diese Entwicklung reagieren?
- Welche Kompetenzen brauchen Entwickler in der Zukunft?



