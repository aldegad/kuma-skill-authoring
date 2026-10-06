<p align="center">
  <img src="assets/icon.png" width="168" alt="Una única fuente de verdad que irradia hacia cada runtime de agentes" />
</p>

<h1 align="center">Autoría de skills, hooks y plugins entre runtimes</h1>

<p align="center"><b>Una única fuente de verdad para tus skills, hooks y plugins, en cada agente de programación con IA que uses. Los datos de los proveedores se consultan, nunca se replican.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Ya no usas un solo agente de IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor: cada uno tiene su propia idea de qué es una "skill", dónde se registran los hooks, qué archivo de instrucciones lee y cómo se reanudan las sesiones. Si distribuyes a mano las mismas herramientas a todos ellos, en menos de una semana ya habrán divergido.

Este repositorio aporta el método y el mapa hacia los datos:

1. **Una metodología para distribuir una única fuente de verdad que vive en el repositorio**: skills, hooks, comandos, scripts, documentación, recursos, la conexión de MCP/apps y los metadatos de plugins. Todo se instala en cada runtime sin divergencias gracias a una raíz de paquete canónica, instalaciones mediante symlinks, un único manifiesto de registro, procedimientos explícitos para retirar y renombrar, una regla de paridad motor × home verificada por máquina y una lista de comprobación de validación. Esto es `SKILL.md`.
2. **Una guía de consulta en lugar de una wiki.** `docs/official-sources.json` recoge 68 páginas oficiales de proveedores, ordenadas por runtime × pregunta (`skills`, `hooks`, `plugins`, `project-instructions`, `cli-invocation`, `session-resume`, `model-lineup`, `billing`, …), y `docs/lookup.md` explica cómo obtener una de esas páginas, evaluarla y citarla. Aquí no se guarda ningún dato de proveedor: cada respuesta se lee en la página del proveedor en el momento de la consulta y lleva su URL y su fecha.

## Por qué no hay wiki

Durante tres meses, este repositorio mantuvo una wiki de compatibilidad con fuentes citadas y la actualizaba a diario a partir de la documentación de los proveedores. Pasaron dos cosas. Primero, la copia que realmente leían los agentes llegó a ir nueve semanas por detrás de la que escribía la actualización: una réplica falla justo cuando se confía en ella. Segundo, el día en que llegó una pregunta real entre runtimes ("¿puede continuar un turno interrumpido sin un nuevo prompt en Claude Code, Codex y Grok?"), la wiki tenía la *sintaxis* para reanudar, pero la respuesta seguía teniendo que salir de las páginas oficiales. Una réplica obliga a reescribir a diario. Un enlace solo cuesta una consulta y solo falla cuando falla el proveedor.

Lo que queda aquí es lo que los proveedores no pueden decirte: cómo mantener *tus* herramientas en un solo lugar para todos ellos. También se recogen los pocos casos en que dos motores leen el mismo campo de forma distinta, y cada uno lleva el id de la fuente con la que volver a verificarlo.

## Qué responde

| Lo que preguntas | De dónde sale la respuesta |
|---|---|
| "¿Dónde pongo una skill para que Codex, Claude y Grok la encuentren sin tener tres copias?" | `SKILL.md` → Core Rules, Recommended Layout, Cross-Agent Install Pattern |
| "He cambiado un hook. ¿Ha llegado a cada motor *y* a cada home de cuenta?" | `SKILL.md` → Engine × Home Is A Product: la superficie la enumera una máquina, no una lista de comprobación |
| "Desactiva esta skill en un motor, retírala de todas partes o cámbiale el nombre." | `docs/skill-lifecycle.md`, `SKILL.md` → Retiring Or Renaming Artifacts |
| "¿Por qué mi guarda PreToolUse deja pasar todo en Codex pero bloquea en Claude?" | `docs/hook-contract.md`: las trampas entre motores, con fuentes citadas |
| "¿Qué archivo de instrucciones lee Hermes? ¿Puede Antigravity ejecutarse sin interfaz? ¿Qué reanuda una sesión de Grok?" | una **consulta**: elige la entrada de `docs/official-sources.json` por `agent` × `kind`, obtén la página del proveedor y cítala. Ver `docs/lookup.md` |

**Esta es la capa sobre la que se construyen las herramientas de gestión.** El sistema de activación de skills y hooks de Kuma Studio, que activa o desactiva cualquier skill o hook en Claude, Codex, Grok y Hermes desde una sola GUI, se construyó con este método. El interruptor real de cada runtime se consultó en la página del proveedor. Donde no existe ningún interruptor oficial, las herramientas lo compensan de forma deliberada en lugar de suponer.

## Por qué fiarse

- **Cada afirmación entre runtimes cita la documentación del propio proveedor**, en el momento en que se hace y con la fecha. Si algo no aparece, se registra como `not documented (checked <urls>, <date>)`; nunca se deduce a partir de otro runtime.
- **El repositorio solo guarda lo que es nuestro.** Eso incluye las reglas, los procedimientos y los casos en que los motores difieren de una forma que rompe nuestros scripts. Si alguno de ellos depende de un comportamiento del proveedor, la línea indica el id de la fuente en el manifiesto, para que la premisa pueda volver a comprobarse con una sola consulta.
- **Una máquina mantiene el mapa accesible.** Cada semana, un proceso ejecuta `scripts/check-official-sources.mjs`, corrige las URL que han cambiado y abre un PR. Una guarda determinista solo lo fusiona si el diff afecta únicamente a la documentación y la comprobación pasa (`docs/cloud-automation.md`).

## Qué contiene este repositorio

- `SKILL.md`: el punto de entrada de la skill. Contiene la metodología de autoría e interoperabilidad y la regla de enrutamiento "los datos de los proveedores se consultan".
- `docs/lookup.md`: cómo responder una pregunta sobre un runtime a partir de la página oficial y cómo mantener el manifiesto.
- `docs/official-sources.json`: el manifiesto de URL oficiales por runtime × pregunta, con las preguntas que responde cada página.
- `docs/authoring-rules.md`: la justificación y los incidentes medidos detrás de cada regla, y la puerta de decisión sobre el empaquetado.
- `docs/hook-contract.md`: las trampas de hooks entre motores que nuestros scripts tienen en cuenta.
- `docs/skill-lifecycle.md`: desactivar, acotar y retirar.
- `docs/skill-boundary-rules.md`, `docs/research-forge.md`, `docs/agent-extensions-routing.md`, `docs/kuma-studio-patterns.md`: dónde reside la verdad, cómo se forjan las skills basadas en documentos, el enrutamiento de la carpeta `agent-extensions` y los patrones públicos de Kuma Studio.
- `docs/cloud-automation.md`: la comprobación semanal de fuentes y su puerta de fusión automática.
- `CHANGELOG.md` junto con la etiqueta de git: el registro de versiones. El historial se queda aquí, no en el cuerpo de los documentos.

## Comprobaciones locales

```bash
node scripts/check-official-sources.mjs --write-report   # forma del manifiesto, hosts, accesibilidad, presupuesto de SKILL.md
node --test scripts/check-official-sources.test.mjs
```