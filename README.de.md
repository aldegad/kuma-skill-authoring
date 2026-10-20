<p align="center">
  <img src="assets/icon.png" width="168" alt="Eine einzige Quelle der Wahrheit, die in jede Agenten-Runtime ausstrahlt" />
</p>

<h1 align="center">Runtime-übergreifendes Authoring von Skills, Hooks und Plugins</h1>

<p align="center"><b>Eine einzige Quelle der Wahrheit für deine Skills, Hooks und Plugins — auf jedem KI-Coding-Agenten, den du einsetzt. Herstellerfakten werden nachgeschlagen, nie gespiegelt.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Du betreibst längst nicht mehr nur einen KI-Agenten. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — jeder hat seine eigene Vorstellung davon, was ein „Skill“ ist, wo Hooks registriert werden, welche Anweisungsdatei gelesen wird und wie Sitzungen fortgesetzt werden. Verteilst du dasselbe Tooling von Hand an alle, driften sie innerhalb einer Woche auseinander.

Dieses Repo ist die Methode – und die Landkarte zu den Fakten:

1. **Eine Methodik, um eine einzige, dem Repo gehörende Quelle der Wahrheit auszuliefern** — Skills, Hooks, Commands, Skripte, Doku, Assets, MCP-/App-Anbindung, Plugin-Metadaten —, installiert über alle Runtimes hinweg ohne Drift: ein kanonisches Paket-Root, Symlink-Installationen, ein einziges Registrierungsmanifest, explizite Verfahren zum Stilllegen/Umbenennen, eine maschinell geprüfte Paritätsregel Engine × Home und eine Validierungs-Checkliste. Das ist `SKILL.md`.
2. **Ein Nachschlage-Leitfaden statt eines Wikis.** `docs/official-sources.json` ordnet 68 offizielle Herstellerseiten nach Runtime × Frage zu (`skills`, `hooks`, `plugins`, `project-instructions`, `cli-invocation`, `session-resume`, `model-lineup`, `billing`, …), und `docs/lookup.md` beschreibt, wie man eine davon abruft, bewertet und zitiert. Hier wird kein Herstellerfakt gespeichert; jede Antwort wird bei Bedarf von der Seite des Herstellers gelesen und trägt deren URL und Datum.

## Warum kein Wiki

Dieses Repo hat drei Monate lang ein Kompatibilitäts-Wiki mit Quellenangaben gepflegt und es täglich aus der Herstellerdoku aktualisiert. Daraus ergaben sich zwei Dinge. Die Kopie, die die Agenten tatsächlich lasen, lag neun Wochen hinter der Kopie zurück, die die Aktualisierung schrieb — ein Spiegel ist genau dann falsch, wenn man ihm vertraut. Und an dem Tag, an dem eine echte runtime-übergreifende Frage kam („Kann ein unterbrochener Turn ohne neuen Prompt weiterlaufen – auf Claude Code, Codex und Grok?“), hatte das Wiki zwar die Resume-*Syntax*, die Antwort musste aber trotzdem von den offiziellen Seiten kommen. Ein Spiegel kostet ein tägliches Neuschreiben; ein Link kostet einen Abruf und ist nur dann falsch, wenn der Hersteller es ist.

Was bleibt, ist das, was dir die Hersteller nicht sagen können: wie du *dein* Tooling über alle hinweg an einem Ort hältst, und die Handvoll Stellen, an denen zwei Engines dasselbe Feld unterschiedlich lesen — jede mit der Quellen-ID, anhand derer sie erneut zu verifizieren ist.

## Was es beantwortet

| Du fragst | Woher die Antwort kommt |
|---|---|
| „Wo lege ich einen Skill ab, damit Codex, Claude und Grok ihn alle finden – ohne drei Kopien?“ | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| „Ich habe einen Hook geändert. Ist er auf jeder Engine *und* in jedem Account-Home angekommen?“ | `SKILL.md` → Engine × Home Is A Product — eine Maschine zählt die Oberfläche auf, keine Checkliste |
| „Diesen Skill auf einer Engine abschalten / überall stilllegen / umbenennen.“ | `docs/skill-lifecycle.md`, `SKILL.md` → Retiring Or Renaming Artifacts |
| „Warum ist mein PreToolUse-Guard auf Codex fail-open, blockiert aber auf Claude?“ | `docs/hook-contract.md` — die engine-übergreifenden Fallen, mit Quellenangaben |
| „Welche Anweisungsdatei liest Hermes? Kann Antigravity headless laufen? Womit wird eine Grok-Sitzung fortgesetzt?“ | ein **Lookup**: den Eintrag in `docs/official-sources.json` nach `agent` × `kind` auswählen, die Herstellerseite abrufen, sie zitieren — `docs/lookup.md` |

**Das ist die Schicht, auf der du Management-Tooling aufbaust.** Das Skill-/Hook-Umschaltsystem von Kuma Studio — jeden Skill oder Hook über Claude, Codex, Grok und Hermes hinweg aus einer einzigen GUI ein- oder ausschalten — wurde nach dieser Methode gebaut: Der tatsächliche Ein-/Aus-Schalter jeder Runtime wurde auf der Herstellerseite nachgeschlagen, und wo offiziell kein Schalter existiert, gleicht das Tooling dies bewusst aus, statt zu raten.

## Warum man ihm vertrauen kann

- **Jede runtime-übergreifende Aussage zitiert die eigene Dokumentation des Herstellers** — zu dem Zeitpunkt, an dem sie getroffen wird, mit Datum. Fehlendes wird als `not documented (checked <urls>, <date>)` festgehalten, nie aus einer anderen Runtime abgeleitet.
- **Das Repo besitzt nur, was uns gehört.** Regeln, Verfahren und die Stellen, an denen sich Engines so unterscheiden, dass unsere Skripte brechen. Wo eine davon auf einem Herstellerverhalten beruht, nennt die Zeile die Quellen-ID im Manifest, sodass die Prämisse mit einem einzigen Abruf erneut geprüft werden kann.
- **Die Landkarte wird maschinell erreichbar gehalten.** Ein wöchentlicher Job führt `scripts/check-official-sources.mjs` aus, korrigiert eine verschobene URL und öffnet einen PR, den ein deterministischer Guard nur dann mergt, wenn der Diff ausschließlich Doku betrifft und der Check besteht (`docs/cloud-automation.md`).

## Was dieses Repo besitzt

- `SKILL.md` — der Skill-Einstiegspunkt: die Authoring-/Interoperabilitäts-Methodik und die Routing-Regel „Herstellerfakten sind ein Lookup“.
- `docs/lookup.md` — wie man eine Runtime-Frage anhand der offiziellen Seite beantwortet und wie man das Manifest pflegt.
- `docs/official-sources.json` — das Manifest offizieller URLs nach Runtime × Frage, mit den Fragen, die jede Seite beantwortet.
- `docs/authoring-rules.md` — die Begründung und die gemessenen Vorfälle hinter jeder Regel sowie das Entscheidungs-Gate für das Packaging.
- `docs/hook-contract.md` — die engine-übergreifenden Hook-Fallen, gegen die unsere Skripte geschrieben sind.
- `docs/skill-lifecycle.md` — deaktivieren / eingrenzen / stilllegen.
- `docs/skill-boundary-rules.md`, `docs/research-forge.md`, `docs/skill-repo-routing.md`, `docs/kuma-studio-patterns.md` — wo die Wahrheit liegt, wie dokumentbasierte Skills geschmiedet werden, wohin die Änderung an einem eigenen oder geforkten Skill gehört, öffentliche Kuma-Studio-Muster.
- `docs/cloud-automation.md` — der wöchentliche Quellen-Check und sein Auto-Merge-Gate.
- `CHANGELOG.md` plus das Git-Tag — der Versionsnachweis. Die Historie bleibt hier, nicht in den Dokumenttexten.

## Lokale Checks

```bash
node scripts/check-official-sources.mjs --write-report   # Manifest-Struktur, Hosts, Erreichbarkeit, SKILL.md-Budget
node --test scripts/check-official-sources.test.mjs
```