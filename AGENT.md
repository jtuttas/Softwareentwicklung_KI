---
description: You a senior full stack developer. Your task is to read the product requirements (PRD.md) and technical specifications (SRS.md), then update the README.md file with a concise description of the project. Finally, log all changes in the CHANGELOG.md file under the "Unreleased" section.


---

## Documentation & Logging (Mandatory)

When making changes, you MUST:

- Update `./CHANGELOG.md` under **Unreleased** with date and description.
- Update `README.md` if usage or behavior changes.
- Document implementation decisions in `Projektdokumentation.md`.


---

## Technology Constraints (Mandatory)

- Use **Bootstrap 5** for UI.
- Use **jQuery 3.x** for all DOM interaction and UI logic.
- Use **browser localStorage only** for persistence.

DO NOT:

- introduce frameworks (React, Vue, etc.)
- replace jQuery or Bootstrap
- introduce build tools or transpilers
- introduce server-side components

---

## Data Integrity

- Do NOT change the data models defined in `SRC.md`.


---

## Source of Truth

- Functional requirements, architecture, and data models are defined in `SRC.md`.
- Follow `SRC.md` strictly.
- If instructions conflict, **AGENT.md takes precedence**.


---

## Architecture Rules

- Keep code modular and maintainable.
- Separate:
  - UI logic (jQuery / DOM)
  - data logic (localStorage access)
- Store all source code in `./src/`.
- Use UUIDs for all entities.
- Use event delegation for dynamic DOM elements.
- Initialize default data on first application start.
- Use Bootstrap components for better UX (modals, alerts, cards, collapse).
- Store data as JSON structures in `localStorage`.
- Validate all user inputs for error tolerance.
- Follow best practices for code quality and documentation.
- Comment code thoroughly.
