# Clean Code Reviewer Agent — High-Level-Entwurf

## Zweck & Geltungsbereich

Ein eigenständiges GitHub-Copilot-Agenten-System, das einen übergebenen
**Code-Scope** (ausschließlich der zu reviewende Code) auf Code Smells prüft.

- **Review-only:** flaggt und empfiehlt, editiert nie.
- Sprachunabhängig — basiert inhaltlich auf dem `clean-coding`-Skill (Robert C.
  Martins Clean-Code-Regeln, 60+ Regeln in 6 Kategorien N/F/G/C/T/E).
- Funktioniert **eigenständig** und ist **über einen caller-instruierten
  Output-Contract** mit `copilot-orchestra` kompatibel — ohne dessen Interna
  (Phasen, `plans/`, Status-Enums) zu kennen.

## Architektur

```
clean-code-reviewer.agent.md     ← Orchestrator (Hauptagent)
detectors/
├── names-detector.agent.md      ← Kategorie N: Namen (N1–N7)
├── functions-detector.agent.md  ← Kategorie F: Funktionen (F1–F4)
├── general-detector.agent.md    ← Kategorie G: Allgemein (G1–G36)
├── comments-detector.agent.md   ← Kategorie C: Kommentare (C1–C5)
├── tests-detector.agent.md      ← Kategorie T: Tests (T1–T9)
└── environment-detector.agent.md← Kategorie E: Umgebung (E1–E2)
```

**Orchestrator** hat den vollen Überblick und Kontext. Er nimmt den Code-Scope
und eine optionale Ausgabe-Instruktion des Aufrufers entgegen, verteilt den
Scope an die 6 Detektoren, sammelt alle Ergebnisse, dedupliziert, priorisiert
und erstellt die Gesamtübersicht mit Behebungsempfehlungen.

**Detektoren** sind stateless und kennen weder einander noch das Endurteil.
Jeder kennt genau eine Regelkategorie und die zugehörige Referenzdatei:

| Detektor | Kategorie | Regelanzahl | Referenz |
|---|---|---|---|
| names-detector | N | 7 | `clean-coding/references/names.md` |
| functions-detector | F | 4 | `clean-coding/references/functions.md` |
| general-detector | G | 35 | `clean-coding/references/general.md` |
| comments-detector | C | 5 | `clean-coding/references/comments.md` |
| tests-detector | T | 7 (aktiv) | `clean-coding/references/tests.md` |
| environment-detector | E | 2 | `clean-coding/references/environment.md` |

## Übergabe-Protokoll (Handoff)

### Dispatch: Orchestrator → Detektor
- Code-Scope (zu reviewende Dateien/Bereiche)
- Kategorie-Zuweisung und Verweis auf Referenzdatei
- Vorgeschriebenes Finding-Format (s.u.)

### Return: Detektor → Orchestrator
Jeder Detektor liefert eine Finding-Liste. Einheitliches Format über alle
Detektoren — direkt mechanisch zusammenführbar:

```
### {Kategorie}-Findings

- [ ] {Regelcode} ({Regelname}): {Beschreibung des Verstoßes} ({file}:{line})
  Severity: {high | medium | low}
  Evidenz: `{Code-Snippet}`
  Empfehlung: {konkrete Maßnahme}
```

Leere Liste erlaubt — kein Placeholder-Text, einfach keine Einträge.

**Severity-Skala (einheitlich):**

| Severity | Bedeutung |
|---|---|
| high | Korrektheit oder Hauptstruktur gefährdet (G3, T1, T5, F1 mit 5+ Args, G5) |
| medium | Klarheit oder Wartbarkeit beeinträchtigt (N1, G25, G28, G16, G30) |
| low | Kosmetik / Cleanup (C2, C3, G9, F4) — wird nur gemeldet, wenn 3+ Funde |

## Synthese durch den Orchestrator

1. **Sammeln:** Finding-Listen aller 6 Detektoren zusammenführen.
2. **Deduplizieren:** Überlappende Smells kreuz-referenzieren (z.B. F3 ↔ G15).
3. **Priorisieren:** nach Skill-Reihenfolge Correctness → Clarity → Structure → Cleanup.
4. **Gesamtübersicht** erstellen: Health-Summary + priorisierte Befunde.
5. **Behebungsempfehlungen** pro Finding (konkret, umsetzbar).
6. **Ausgabe** gemäß Aufrufer-Instruktion (s.u.).

## Kompatibilität via caller-instruiertem Output-Contract

Der Reviewer hat keinen fest verdrahteten Output-Typ. Der **Aufrufer instruiert
den Reviewer** beim Aufruf, welche Ausgabeform er erwartet:

**Standalone (Default — kein Aufrufer-Kontext):**
Menschenlesbarer konsolidierter Clean-Code-Report mit Gesamtbeurteilung und
Behebungsempfehlungen.

**Über copilot-orchestra:**
Der Conductor ruft den Reviewer auf und ergänzt z.B.:
> „Gib zusätzlich zum Report einen Status `APPROVED / NEEDS_REVISION / FAILED`
> zurück. `NEEDS_REVISION` wenn mind. 1 high-Finding existiert."

Der Reviewer kennt `APPROVED/NEEDS_REVISION/FAILED` nicht von sich aus — er
folgt der Instruktion des Aufrufers. Das entkoppelt die Systeme vollständig.

## Offene Punkte

| Punkt | Status | Hinweis |
|---|---|---|
| Nested Subagents | **geklärt** | VS Code deaktiviert Subagent-in-Subagent per Default (`chat.subagents.allowInvocationsFromSubagents = false`). Opt-in möglich, aber nicht portabel. **Architekturentscheidung:** Der Orchestrator wird als Top-Level-Agent (kein Subagent) aufgerufen und spawnt die 6 Detektoren direkt — die Hierarchie bleibt flach. Beim Aufruf über copilot-orchestra ruft der Conductor den Reviewer-Orchestrator als Subagent auf; der Reviewer selbst ruft dann seinerseits die Detektoren als Subagenten auf und nutzt dafür das Opt-in-Setting. Alternativ führt der Orchestrator die Pässe sequenziell im eigenen Kontext aus — Protokoll und Layout bleiben identisch. |
| G-Kategorie-Größe | offen | 35 Regeln in einem Detektor — ggf. später splitten (z.B. Struktur/Logik vs. Konventionen/Clarity). |
| Severity-Mapping | festgelegt | high/medium/low (s. Tabelle oben); unabhängig vom Status-Enum des Aufrufers. |

## Verzeichnis-Layout (Zielbild)

```
clean-code-reviewer/
├── DESIGN.md                          ← dieser Entwurf
├── clean-code-reviewer.agent.md       ← Orchestrator (folgt)
└── detectors/
    ├── names-detector.agent.md        ← folgt
    ├── functions-detector.agent.md    ← folgt
    ├── general-detector.agent.md      ← folgt
    ├── comments-detector.agent.md     ← folgt
    ├── tests-detector.agent.md        ← folgt
    └── environment-detector.agent.md  ← folgt
```
