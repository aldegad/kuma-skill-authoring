<p align="center">
  <img src="assets/icon.png" width="168" alt="Une source de vérité unique rayonnant vers chaque runtime d'agent" />
</p>

<h1 align="center">Écriture de skills, hooks et plugins multi-runtimes</h1>

<p align="center"><b>Une source de vérité unique pour vos skills, hooks et plugins — sur chaque agent de codage IA que vous utilisez. Les faits fournisseurs sont consultés, jamais recopiés.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Vous ne faites plus tourner un seul agent IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor : chacun a sa propre idée de ce qu'est un « skill », de l'endroit où s'enregistrent les hooks, du fichier d'instructions qu'il lit et de la façon dont les sessions reprennent. Déployez le même outillage à la main sur chacun d'eux, et ils divergent en moins d'une semaine.

Ce dépôt fournit la méthode, et la carte qui mène aux faits :

1. **Une méthodologie pour livrer une source de vérité unique, détenue par le dépôt** (skills, hooks, commandes, scripts, docs, assets, câblage MCP/app, métadonnées de plugin), installée sur chaque runtime sans dérive. Elle repose sur une racine de paquet canonique, des installations par lien symbolique, un manifeste d'enregistrement unique, des procédures explicites de retrait et de renommage, une règle de parité moteur × home vérifiée par machine et une checklist de validation. C'est `SKILL.md`.
2. **Un guide de consultation plutôt qu'un wiki.** `docs/official-sources.json` recense 68 pages officielles des fournisseurs par runtime × question (`skills`, `hooks`, `plugins`, `project-instructions`, `cli-invocation`, `session-resume`, `model-lineup`, `billing`, …), et `docs/lookup.md` explique comment en récupérer une, l'évaluer et la citer. Aucun fait fournisseur n'est stocké ici : chaque réponse est lue sur la page du fournisseur au moment où la question est posée, et porte son URL et sa date.

## Pourquoi pas de wiki

Pendant trois mois, ce dépôt a maintenu un wiki de compatibilité sourcé, rafraîchi chaque jour à partir de la documentation des fournisseurs. Deux problèmes en ont découlé. D'abord, la copie que les agents lisaient réellement a pris neuf semaines de retard sur celle qu'écrivait le rafraîchissement : un miroir est faux précisément quand on lui fait confiance. Ensuite, le jour où une vraie question multi-runtime s'est posée (« un tour interrompu peut-il continuer sans nouveau prompt, sur Claude Code, Codex et Grok ? »), le wiki contenait la *syntaxe* de reprise, mais la réponse a quand même dû venir des pages officielles. Un miroir coûte une réécriture quotidienne. Un lien coûte une récupération, et n'est faux que lorsque le fournisseur l'est.

Ce qui reste ici, c'est ce que les fournisseurs ne peuvent pas vous dire : comment garder *votre* outillage en un seul endroit pour tous les runtimes, et la poignée de cas où deux moteurs lisent le même champ différemment. Chacun de ces cas porte l'identifiant de source à re-vérifier.

## À quoi il répond

| Vous demandez | D'où vient la réponse |
|---|---|
| « Où placer un skill pour que Codex, Claude et Grok le trouvent tous, sans trois copies ? » | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| « J'ai modifié un hook. Est-il arrivé sur chaque moteur *et* dans chaque home de compte ? » | `SKILL.md` → Engine × Home Is A Product : c'est une machine qui énumère la surface, pas une checklist |
| « Désactiver ce skill sur un moteur / le retirer partout / le renommer. » | `docs/skill-lifecycle.md`, `SKILL.md` → Retiring Or Renaming Artifacts |
| « Pourquoi mon garde-fou PreToolUse a-t-il laissé passer (fail open) sur Codex mais bloqué sur Claude ? » | `docs/hook-contract.md` : les pièges entre moteurs, avec leurs sources |
| « Quel fichier d'instructions Hermes lit-il ? Antigravity peut-il tourner en mode headless ? Qu'est-ce qui reprend une session Grok ? » | une **consultation** : choisissez l'entrée de `docs/official-sources.json` par `agent` × `kind`, récupérez la page du fournisseur et citez-la (`docs/lookup.md`) |

**C'est la couche sur laquelle on construit l'outillage de gestion.** Le système d'activation des skills et hooks de Kuma Studio permet d'activer ou de désactiver n'importe quel skill ou hook sur Claude, Codex, Grok et Hermes depuis une seule interface graphique. Il a été construit selon cette méthode : le véritable interrupteur on/off de chaque runtime a été consulté sur la page du fournisseur, et là où aucun interrupteur n'existe officiellement, l'outillage compense délibérément au lieu de deviner.

## Pourquoi lui faire confiance

- **Chaque affirmation multi-runtime cite la documentation du fournisseur lui-même**, au moment où elle est formulée et avec la date. Une absence est consignée sous la forme `not documented (checked <urls>, <date>)`, jamais déduite d'un autre runtime.
- **Le dépôt ne détient que ce qui nous appartient** : les règles, les procédures, et les cas où les moteurs diffèrent d'une manière qui casse nos scripts. Lorsque l'un de ces cas repose sur un comportement fournisseur, la ligne concernée nomme l'identifiant de source du manifeste, pour que la prémisse puisse être re-vérifiée en une seule récupération.
- **Une machine veille à ce que la carte reste accessible.** Une tâche hebdomadaire exécute `scripts/check-official-sources.mjs`, corrige toute URL déplacée et ouvre une PR. Un garde-fou déterministe ne la fusionne que si le diff ne touche que la documentation et que la vérification passe (`docs/cloud-automation.md`).

## Ce que ce dépôt détient

- `SKILL.md` : le point d'entrée du skill, avec la méthodologie d'écriture et d'interopérabilité et la règle de routage « les faits fournisseurs se consultent ».
- `docs/lookup.md` : comment répondre à une question sur un runtime à partir de la page officielle, et comment maintenir le manifeste.
- `docs/official-sources.json` : le manifeste des URL officielles par runtime × question, avec les questions auxquelles chaque page répond.
- `docs/authoring-rules.md` : la justification et les incidents mesurés derrière chaque règle, ainsi que le point de décision sur le packaging.
- `docs/hook-contract.md` : les pièges des hooks entre moteurs, que nos scripts prennent en compte.
- `docs/skill-lifecycle.md` : désactiver / restreindre la portée / retirer.
- `docs/skill-boundary-rules.md`, `docs/research-forge.md`, `docs/skill-repo-routing.md`, `docs/kuma-studio-patterns.md` : où réside la vérité, comment sont forgés les skills fondés sur des documents, où va la modification d'un skill propre ou forké et les patterns publics de Kuma Studio.
- `docs/cloud-automation.md` : la vérification hebdomadaire des sources et sa condition de fusion automatique.
- `CHANGELOG.md` et le tag git : le registre des versions. L'historique reste ici, pas dans le corps des docs.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report   # forme du manifeste, hôtes, accessibilité, budget de SKILL.md
node --test scripts/check-official-sources.test.mjs
```