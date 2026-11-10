# Implementación de CRUD de ordenes en DynamoDB

El sistema de gestión de ordenes requiere la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en DynamoDB a través de la interfaz de usuario. El objetivo es permitir a los usuarios interactuar con las ordenes de manera eficiente y segura, asegurando que los datos se persistan correctamente en la base de datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 12 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno y definición de la estructura de datos

**Objetivo:** Establecer el entorno de desarrollo y definir la estructura de datos para las ordenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configurar el entorno de desarrollo con las herramientas necesarias.
- Definir la estructura de datos para las ordenes en DynamoDB, incluyendo atributos necesarios como ID, fecha, estado, y detalles de la orden.

**Entregable:** Especificación de la estructura de datos para las ordenes y entorno de desarrollo configurado.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las mejores prácticas para el modelado de datos en DynamoDB.
- Utiliza Terraform para versionar la infraestructura.

</details>

### Fase 2: Implementación de operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD para las ordenes en DynamoDB a través de la interfaz de usuario.

**Tiempo estimado:** 6 horas

**Instrucciones:**

- Desarrollar los componentes de la interfaz de usuario para crear, leer, actualizar y eliminar ordenes.
- Implementar la lógica necesaria para interactuar con DynamoDB y persistir los datos de las ordenes.

**Entregable:** Componentes de la interfaz de usuario y lógica de persistencia de datos implementados y funcionando.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza React para desarrollar los componentes de la interfaz de usuario.
- Asegúrate de manejar correctamente los errores y validaciones al interactuar con DynamoDB.

</details>

### Fase 3: Pruebas y optimización

**Objetivo:** Realizar pruebas exhaustivas y optimizar la implementación para asegurar un rendimiento óptimo y una experiencia de usuario fluida.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Realizar pruebas unitarias y de integración para asegurar que las operaciones CRUD funcionen correctamente.
- Optimizar la implementación para mejorar el rendimiento y la experiencia de usuario.

**Entregable:** Pruebas unitarias y de integración completas, y optimización de la implementación.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza Terraform para versionar y desplegar la infraestructura.
- Considera el uso de herramientas de depuración y profiling para identificar y resolver cuellos de botella.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en este contexto?
- **paraQueSirve**: ¿Para qué sirve la estructura de datos definida en DynamoDB en este sistema?
- **comoSeUsa**: ¿Cómo se usa Terraform para versionar la infraestructura en este proyecto?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización de la implementación para mejorar el rendimiento?

## Criterios de Evaluacion

- Estructura de datos definida en DynamoDB.
- Implementación de operaciones CRUD funcionales.
- Manejo de errores y validaciones correcto.
- Pruebas unitarias y de integración completas.
- Optimización de la implementación para mejorar el rendimiento.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd api && npm install && npm run build` — componente `api` (practice).
4. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
- `client` expone http:

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
