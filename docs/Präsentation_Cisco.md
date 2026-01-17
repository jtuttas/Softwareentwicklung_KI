---
marp: true
theme: uncover
size: 16:9
paginate: true


class: 
  - lead
  - invert
---

<!-- header: Nationale Cisco Akademien Tage 2026  -->

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

- Überblick Agenten (github Copilot, Codex, **Gemini**, Claude Desktop)
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
- Gemini (Google)



---

![bg blur:3px opacity](pic2.png)

## Claude Desktop (Anthropic)

![claude](claude.png)

<!-- https://www.qrcode-monkey.com/ -->

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic2.png)

### Codex Web der Agent in der Cloud

<https://jtuttas.github.io/codextest/>

![codex](codex.png)

<!-- Am besten den main Branch im  https://github.com/jtuttas/codextest Repository wählen, da hier Github Pages aktiviert ist über <https://jtuttas.github.io/codextest/> -->

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic2.png)

## CoPilot im Agent Mode

![copilot](copilot.png)

<!-- footer: 2025 -->
---

![bg blur:6px opacity](pic2.png)

## Gemini CLI der Agent von Google im Terminal

![gemini](gemini.png)

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic2.png)

## Codex CLI der Agent von OpenAI im Terminal

![gemini](codex-cli.png)

<!-- footer: 2025 -->

---

![bg left:25% ](workshop.png)

## Gemini CLI installieren

> node.js muss installiert sein <https://nodejs.org/en/download>

## anschließend in der Konsole:

```bash
npm install -g @google/gemini-cli
```

<!-- footer: 2025 -->

---

![bg right:25% ](workshop.png)

## Repository zum Workshop

Clonen Sie sich das folgende Repository:

```bash 
git clone https://github.com/jtuttas/Softwareentwicklung_KI
```

<!-- footer: 2025 -->
---

![bg left:25% ](workshop.png)

## Die wichtigstens Dateien im Repository

- PRD.md - Produkt Requirements Document, das Lastenheft der Anwendung
- SRS.md - Software Requirements Specification, das Pflichtenheft der Anwendung
- AGENT.md - Beschreibung der Agenten

<!-- footer: 2025 -->

---

![bg right:25% ](workshop.png)

## Prompt

Starten Sie den Gemini Agenten und nutzen Sie folgenden Prompt:

```txt
"Erstelle mir die Anwendung wie in den Anforderungen beschrieben"
```


<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic2.png)

## MCP - Model Context Protocol

> Die KI Agenten bekommen Werkzeuge

<!-- footer: Nov. 2024 -->
---

![bg blur:6px opacity](pic2.png)

## MCP Server Datenbank

![mcpso](mcpso.png)

<!-- footer: 2025 -->

