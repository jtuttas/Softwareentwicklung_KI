---
marp: true
theme: uncover
size: 16:9
paginate: true


class: 
  - lead
  - invert
---

<!-- header: Niedersächsische Cisco Akademien Tage 2025  -->

![bg opacity:30%](pic1.png)

# KI unterstützte Softwareentwicklung

### von und mit Jörg Tuttas

---

![bg blur:6px opacity](pic1.png)

> KI wird Sie nicht ersetzen, aber Entwickler, die KI nutzen, werden Entwickler ersetzen, die es nicht tun.

---

![bg left:33% ](agenda.png)

- Tools (Claude Desktop)
- Agenten (github Copilot, Codex, **Gemini**)
- MCP - Model Context Protocol


---

![bg blur:6px opacity](pic1.png)

# Tools & Agenten

- Claude Desktop (Anthropic)
- Codex Web/CLI (OpenAI)
- github Copilot (Microsoft)
- Gemini (Google)

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## Claude Desktop die KI von Anthropic

![claude](claude.png)

<!-- footer: 2024 -->

---

![bg blur:6px opacity](pic1.png)

## Codex Web der Agent in der Cloud

![codex](codex.png)

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## CoPilot im Agent Mode

![copilot](copilot.png)

<!-- footer: 2025 -->
---

![bg blur:6px opacity](pic1.png)

## Gemini CLI der Agent von Google im Terminal

![gemini](gemini.png)

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## Codex CLI der Agent von OpenAI im Terminal

![gemini](codex-cli.png)

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## Gemini / Codex CLI installieren

> node.js muss installiert sein <https://nodejs.org/en/download>

anschließend in der Konsole:

```bash
npm install -g gemini-cli
gemini
```

```bash
npm i -g @openai/codex
codex -
```

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## Repository zum Workshop

Clonen Sie sich das folgende Repository:

```bash 
git clone https://github.com/jtuttas/Softwareentwicklung_KI
```

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## Bsp. Prompts

```bash 
codex --full-auto "Erstelle die todo App wie im Lastenheft.md und Pflichtenheft-Bootstrap.md beschrieben"
```

```bash 
gemini -p "Erstelle die todo App wie im Lastenheft.md und Pflichtenheft-Bootstrap.md beschrieben"
```

<!-- footer: 2025 -->

---

![bg blur:6px opacity](pic1.png)

## MCP - Model Context Protocol

> Die KI Agenten bekommen Werkzeuge

<!-- footer: Nov. 2024 -->
---

![bg blur:6px opacity](pic1.png)

## MCP Server Datenbank

![mcpso](mcpso.png)

<!-- footer: 2025 -->

