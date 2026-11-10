# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de CRUD de ordenes en DynamoDB**.

| | |
|---|---|
| Tema | Persistir ordenes en DynamoDB desde la interfaz |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 19 |
| Patron arquitectonico | componentes reutilizables con hooks |
| Tiempo estimado | 12 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 19.0.0
- react-dom 19.0.0
- @types/react 18.3.3
- @types/react-dom 18.3.0
- vite 5.3.1
- @vitejs/plugin-react 4.3.1
- axios 1.7.2
- react-router-dom 6.23.1
- typescript 5.7.0
- @testing-library/react 16.0.0
- @testing-library/jest-dom 6.4.5
- vitest 1.6.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del entorno y definición de la estructura de datos**: Especificación de la estructura de datos para las ordenes y entorno de desarrollo configurado.
- **Fase 2 — Implementación de operaciones CRUD**: Componentes de la interfaz de usuario y lógica de persistencia de datos implementados y funcionando.
- **Fase 3 — Pruebas y optimización**: Pruebas unitarias y de integración completas, y optimización de la implementación.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/test/order.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `api/test/order.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (45)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/domain/entities/order.entity.ts`
- `api/src/domain/repositories/order.repository.ts`
- `api/src/infrastructure/repositories/order-dynamodb.repository.ts`
- `api/src/infrastructure/dto/create-order.dto.ts`
- `api/src/infrastructure/dto/update-order.dto.ts`
- `api/src/infrastructure/controllers/order.controller.ts`
- `api/src/infrastructure/config/dynamodb.config.ts`
- `api/src/application/use-cases/create-order.usecase.ts`
- `api/src/application/use-cases/get-order.usecase.ts`
- `api/src/application/use-cases/update-order.usecase.ts`
- `api/src/application/use-cases/delete-order.usecase.ts`
- `api/src/main.ts`
- `api/src/app.module.ts`
- `api/test/order.controller.spec.ts`
- `api/test/order.repository.spec.ts`
- `api/test/jest-e2e.json`
- `client/package.json`
- `client/vite.config.ts`
- `client/tsconfig.json`
- `client/index.html`
- `client/src/features/orders/OrderList.tsx`
- `client/src/features/orders/OrderForm.tsx`
- `client/src/services/order.service.ts`
- `client/src/shared/components/Button.tsx`
- `client/src/shared/hooks/useOrders.ts`
- `client/src/shared/types/order.types.ts`
- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/index.css`
- `client/src/setupTests.ts`
- `infra/variables.tf`
- `infra/providers.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/README.md`
- `infra/modules/dynamodb/main.tf`
- `infra/versions.tf`
- `infra/main.tf`
- `infra/outputs.tf`
- `infra/modules/dynamodb/variables.tf`
- `infra/modules/dynamodb/outputs.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `api`
- `api/src/domain/entities`
- `api/src/domain/repositories`
- `api/src/application/use-cases`
- `api/src/infrastructure/controllers`
- `api/src/infrastructure/repositories`
- `api/src/infrastructure/config`
- `client`
- `client/src/features/orders`
- `client/src/services`
- `client/src/shared/components`
- `client/src/shared/hooks`
- `infra`
- `infra/modules/dynamodb`

## Verificacion

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **componentes reutilizables con hooks**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB desde la interfaz (corrida e2e 20261110115758191), Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura
- Mision: Gestionar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
