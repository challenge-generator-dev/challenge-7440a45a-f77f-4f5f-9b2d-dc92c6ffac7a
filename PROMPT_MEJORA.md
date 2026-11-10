# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/test/order.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `api/test/order.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

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

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz (corrida e2e 20261110115758191), Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de ordenes en DynamoDB
- Tiempo estimado: 12 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y definición de la estructura de datos — objetivo: Establecer el entorno de desarrollo y definir la estructura de datos para las ordenes en DynamoDB. — entregable (NO resolver): Especificación de la estructura de datos para las ordenes y entorno de desarrollo configurado.
- Fase 2: Implementación de operaciones CRUD — objetivo: Implementar las operaciones CRUD para las ordenes en DynamoDB a través de la interfaz de usuario. — entregable (NO resolver): Componentes de la interfaz de usuario y lógica de persistencia de datos implementados y funcionando.
- Fase 3: Pruebas y optimización — objetivo: Realizar pruebas exhaustivas y optimizar la implementación para asegurar un rendimiento óptimo y una experiencia de usuario fluida. — entregable (NO resolver): Pruebas unitarias y de integración completas, y optimización de la implementación.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "order-management-api",
  "version": "1.0.0",
  "description": "API para gestión de órdenes con persistencia en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "rimraf dist && tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@nestjs/common": "^11.2.0",
    "@nestjs/config": "^4.0.4",
    "@nestjs/core": "^11.2.0",
    "@nestjs/platform-express": "^11.2.0",
    "@nestjs/swagger": "^11.4.8",
    "aws-sdk": "^2.1630.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.0",
    "rimraf": "^5.0.5",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.2.0",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^2.0.16",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@app/*": ["src/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { IsString, IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Order {
  @ApiProperty({ description: 'Identificador único de la orden', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Identificador del cliente que realizó la orden', example: 'cust-123' })
  @IsString()
  customerId: string;

  @ApiProperty({ description: 'Lista de productos incluidos en la orden', type: [String] })
  @IsString({ each: true })
  products: string[];

  @ApiProperty({ description: 'Monto total de la orden', example: 99.99 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: 'Estado actual de la orden', example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Fecha de creación de la orden', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización de la orden', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ description: 'Indica si la orden ha sido pagada', example: false })
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  constructor(
    id: string,
    customerId: string,
    products: string[],
    totalAmount: number,
    status: string,
    createdAt: Date,
    updatedAt?: Date,
    isPaid?: boolean
  ) {
    this.id = id;
    this.customerId = customerId;
    this.products = products;
    this.totalAmount = totalAmount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isPaid = isPaid;
  }
}

// === ARCHIVO: api/src/domain/repositories/order.repository.ts ===
import { Order } from '../entities/order.entity';


export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/repositories/order-dynamodb.repository.ts ===
import { Injectable } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

interface AttributeValueMap {
  [key: string]: any;
}

@Injectable()
export class OrderDynamoDBRepository implements OrderRepository {
  private readonly dynamoDB: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      endpoint: this.configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
    });
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'Orders');
  }

  async create(order: Order): Promise<Order> {
    const now = new Date();
    const orderWithId = {
      ...order,
      id: uuidv4(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: orderWithId as DynamoDB.DocumentClient.AttributeMap,
    };

    await this.dynamoDB.put(params).promise();
    return new Order(
      orderWithId.id,
      orderWithId.customerId,
      orderWithId.products,
      orderWithId.totalAmount,
      orderWithId.status,
      new Date(orderWithId.createdAt),
      new Date(orderWithId.updatedAt),
      orderWithId.isPaid
    );
  }

  async findById(id: string): Promise<Order | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
    };

    const result = await this.dynamoDB.get(params).promise();
    if (!result.Item) {
      return null;
    }

    return new Order(
      result.Item.id as string,
      result.Item.customerId as string,
      result.Item.products as string[],
      result.Item.totalAmount as number,
      result.Item.status as string,
      new Date(result.Item.createdAt as string),
      result.Item.updatedAt ? new Date(result.Item.updatedAt as string) : undefined,
      result.Item.isPaid as boolean | undefined
    );
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const now = new Date();
    const updateExpressions: string[] = [];
    const expressionAttributeValues: AttributeValueMap = {};
    const expressionAttributeNames: AttributeValueMap = {};

    Object.entries(order).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        const updateKey = `#${key}`;
        const valueKey = `:${key}`;
        updateExpressions.push(`${updateKey} = ${valueKey}`);
        expressionAttributeNames[updateKey] = key;
        expressionAttributeValues[valueKey] = value;
      }
    });

    if (updateExpressions.length > 0) {
      updateExpressions.push('#updatedAt = :updatedAt');
      expressionAttributeNames['#updatedAt'] = 'updatedAt';
      expressionAttributeValues[':updatedAt'] = now.toISOString();
    }

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
      UpdateExpression: 'SET ' + updateExpressions.join(', '),
      ExpressionAttributeValues: expressionAttributeValues as DynamoDB.DocumentClient.AttributeMap,
      ExpressionAttributeNames: expressionAttributeNames as DynamoDB.DocumentClient.ExpressionAttributeNameMap,
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDB.update(params).promise();
    if (!result.Attributes) {
      throw new Error('Order not found');
    }

    return new Order(
      result.Attributes.id as string,
      result.Attributes.customerId as string,
      result.Attributes.products as string[],
      result.Attributes.totalAmount as number,
      result.Attributes.status as string,
      new Date(result.Attributes.createdAt as string),
      new Date(result.Attributes.updatedAt as string),
      result.Attributes.isPaid as boolean | undefined
    );
  }

  async delete(id: string): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
    };

    await this.dynamoDB.delete(params).promise();
  }
}

// === ARCHIVO: api/src/infrastructure/dto/create-order.dto.ts ===
import { IsString, IsArray, IsNumber, IsNotEmpty, Min, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Identificador único del cliente que realiza la orden',
    example: 'cust_12345',
    type: String
  })
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  customerId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden',
    example: ['prod_001', 'prod_002', 'prod_003'],
    type: [String],
    minItems: 1
  })
  @IsArray({ message: 'Los productos deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'La orden debe contener al menos un producto' })
  @ValidateNested({ each: true })
  @IsString({ each: true, message: 'Cada producto debe ser una cadena de texto' })
  @Type(() => String)
  products: string[];

  @ApiProperty({
    description: 'Monto total de la orden en centavos',
    example: 19999,
    type: Number,
    minimum: 0
  })
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  @Min(0, { message: 'El monto total no puede ser negativo' })
  totalAmount: number;

  @ApiPropertyOptional({
    description: 'Estado inicial de la orden',
    example: 'PENDING',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  })
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  status?: string;
}

// === ARCHIVO: api/src/infrastructure/dto/update-order.dto.ts ===
import { IsString, IsArray, IsNumber, IsOptional, Min, ArrayMinSize, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Identificador único del cliente asociado a la orden',
    example: 'cust_12345',
    type: String
  })
  @IsOptional()
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto' })
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Lista de productos en la orden',
    example: ['prod_001', 'prod_004'],
    type: [String],
    minItems: 1
  })
  @IsOptional()
  @IsArray({ message: 'Los productos deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'La orden debe contener al menos un producto' })
  @ValidateNested({ each: true })
  @IsString({ each: true, message: 'Cada producto debe ser una cadena de texto' })
  @Type(() => String)
  products?: string[];

  @ApiPropertyOptional({
    description: 'Monto total de la orden en centavos',
    example: 24999,
    type: Number,
    minimum: 0
  })
  @IsOptional()
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  @Min(0, { message: 'El monto total no puede ser negativo' })
  totalAmount?: number;

  @ApiPropertyOptional({
    description: 'Estado actual de la orden',
    example: 'PROCESSING',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']
  })
  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  status?: string;

  @ApiPropertyOptional({
    description: 'Indica si la orden ha sido pagada',
    example: true,
    type: Boolean
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo isPaid debe ser un valor booleano' })
  isPaid?: boolean;
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus, 
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Order } from '@domain/entities/order.entity';
import { CreateOrderDto } from '@infrastructure/dto/create-order.dto';
import { UpdateOrderDto } from '@infrastructure/dto/update-order.dto';
import { CreateOrderUseCase } from '@application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '@application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/use-cases/delete-order.usecase';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Crear una nueva orden', 
    description: 'Crea una nueva orden en el sistema con los datos proporcionados. La orden se persiste en DynamoDB.' 
  })
  @ApiBody({ type: CreateOrderDto, description: 'Datos de la orden a crear' })
  @ApiResponse({ 
    status: 201, 
    description: 'Orden creada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderUseCase.execute({
      customerId: createOrderDto.customerId,
      products: createOrderDto.products,
      totalAmount: createOrderDto.totalAmount,
    });
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener una orden por ID', 
    description: 'Recupera los detalles de una orden específica utilizando su identificador único' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden encontrada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order | null> {
    return this.getOrderUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar una orden existente', 
    description: 'Actualiza los datos de una orden existente. Solo se actualizan los campos proporcionados.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden a actualizar (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiBody({ type: UpdateOrderDto, description: 'Datos a actualizar en la orden' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden actualizada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.updateOrderUseCase.execute(id, {
      customerId: updateOrderDto.customerId,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Eliminar una orden', 
    description: 'Elimina una orden del sistema permanentemente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden a eliminar (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Orden eliminada exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteOrderUseCase.execute(id);
  }
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.config.ts ===
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';

export const DYNAMODB_CLIENT = 'DYNAMODB_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: DYNAMODB_CLIENT,
      useFactory: (configService: ConfigService): DynamoDB.DocumentClient => {
        const isLocal = configService.get<string>('DYNAMODB_IS_LOCAL', 'false') === 'true';
        const region = configService.get<string>('AWS_REGION', 'us-east-1');
        
        const dynamoOptions: DynamoDB.ClientConfiguration = {
          region,
          ...(isLocal && {
            endpoint: configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', 'local'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', 'local'),
          }),
        };

        return new DynamoDB.DocumentClient(dynamoOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DYNAMODB_CLIENT],
})
export class DynamoDBConfigModule {}

export const InjectDynamoDB = () => {
  return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
    const indices = (Reflect.getMetadata('dynamodb:inject:indices', target.constructor) || []) as number[];
    indices.push(parameterIndex);
    Reflect.defineMetadata('dynamodb:inject:indices', indices, target.constructor);
  };
};

export interface DynamoDBConfig {
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  tableName: string;
}

export const getDynamoDBTableConfig = (configService: ConfigService): DynamoDBConfig => {
  return {
    region: configService.get<string>('AWS_REGION', 'us-east-1'),
    endpoint: configService.get<string>('DYNAMODB_ENDPOINT'),
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'orders'),
  };
};

// === ARCHIVO: api/src/application/use-cases/create-order.usecase.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase {
  private readonly logger = new Logger(CreateOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: {
    customerId: string;
    products: string[];
    totalAmount: number;
  }): Promise<Order> {
    this.logger.log(`Creando orden para cliente: ${data.customerId}`);

    const order = new Order(
      this.generateId(),
      data.customerId,
      data.products,
      data.totalAmount,
      'PENDING',
      new Date(),
    );

    const createdOrder = await this.orderRepository.create(order);
    
    this.logger.log(`Orden creada exitosamente con ID: ${createdOrder.id}`);
    
    return createdOrder;
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
  }
}

// === ARCHIVO: api/src/application/use-cases/get-order.usecase.ts ===
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class GetOrderUseCase {
  private readonly logger = new Logger(GetOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    this.logger.log(`Buscando orden con ID: ${id}`);

    if (!this.isValidOrderId(id)) {
      this.logger.warn(`ID de orden inválido: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      this.logger.warn(`Orden no encontrada: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    this.logger.log(`Orden encontrada: ${order.id}, Estado: ${order.status}`);
    
    return order;
  }

  private isValidOrderId(id: string): boolean {
    return typeof id === 'string' && id.trim().length > 0;
  }
}

// === ARCHIVO: api/src/application/use-cases/update-order.usecase.ts ===
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class UpdateOrderUseCase {
  private readonly logger = new Logger(UpdateOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    data: {
      customerId?: string;
      products?: string[];
      totalAmount?: number;
      status?: string;
      isPaid?: boolean;
    },
  ): Promise<Order> {
    this.logger.log(`Actualizando orden con ID: ${id}`);

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Orden no encontrada para actualizar: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const updateData: Partial<Order> = {
      updatedAt: new Date(),
    };

    if (data.customerId !== undefined) {
      updateData.customerId = data.customerId;
    }

    if (data.products !== undefined) {
      updateData.products = data.products;
    }

    if (data.totalAmount !== undefined) {
      updateData.totalAmount = data.totalAmount;
    }

    if (data.status !== undefined) {
      if (!this.isValidStatus(data.status)) {
        this.logger.warn(`Estado inválido proporcionado: ${data.status}`);
        throw new Error(`Estado inválido: ${data.status}`);
      }
      updateData.status = data.status;
    }

    if (data.isPaid !== undefined) {
      updateData.isPaid = data.isPaid;
      
      if (data.isPaid && data.status !== 'PAID') {
        updateData.status = 'PAID';
      }
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    
    this.logger.log(`Orden actualizada exitosamente: ${updatedOrder.id}, Nuevo estado: ${updatedOrder.status}`);
    
    return updatedOrder;
  }

  private isValidStatus(status: string): boolean {
    const validStatuses = ['PENDING', 'PROCESSING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    return validStatuses.includes(status);
  }
}

// === ARCHIVO: api/src/application/use-cases/delete-order.usecase.ts ===
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { OrderRepository } from '@domain/repositories/order.repository';
import { Order } from '@domain/entities/order.entity';

@Injectable()
export class DeleteOrderUseCase {
  private readonly logger = new Logger(DeleteOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {
    if (!orderRepository) {
      throw new Error('OrderRepository es requerido para DeleteOrderUseCase');
    }
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      this.logger.error('Se intentó eliminar una orden con ID vacío o inválido');
      throw new Error('El ID de la orden es requerido y no puede estar vacío');
    }

    this.logger.log(`Iniciando eliminación de orden con ID: ${id}`);

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Orden no encontrada para eliminación: ${id}`);
      throw new NotFoundException(`No se encontró la orden con ID: ${id}`);
    }

    if (existingOrder.isPaid) {
      this.logger.error(`Intento de eliminar orden pagada: ${id}`);
      throw new Error('No se puede eliminar una orden que ya ha sido pagada');
    }

    try {
      await this.orderRepository.delete(id);
      this.logger.log(`Orden eliminada exitosamente: ${id}`);
    } catch (error) {
      this.logger.error(`Error al eliminar la orden ${id}: ${error.message}`);
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  }

  async executeWithValidation(id: string, requesterId: string): Promise<void> {
    if (!requesterId || requesterId.trim().length === 0) {
      throw new Error('El ID del solicitante es requerido para eliminar una orden');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Orden no encontrada: ${id}`);
    }

    if (order.customerId !== requesterId) {
      this.logger.warn(`Usuario ${requesterId} intentó eliminar orden ${id} que pertenece a ${order.customerId}`);
      throw new Error('No tienes autorización para eliminar esta orden');
    }

    await this.orderRepository.delete(id);
    this.logger.log(`Orden ${id} eliminada por usuario ${requesterId}`);
  }
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 3000;
  const environment = process.env.NODE_ENV || 'development';
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API para gestión de órdenes con persistencia en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  await app.listen(port);
  logger.log(`Aplicación iniciada en modo ${environment}`);
  logger.log(`Servidor corriendo en http://localhost:${port}`);
  logger.log(`Documentación Swagger disponible en http://localhost:${port}/api/docs`);
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from '@infrastructure/controllers/order.controller';
import { CreateOrderUseCase } from '@application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '@application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/use-cases/delete-order.usecase';
import { OrderRepository } from '@domain/repositories/order.repository';
import { OrderDynamoDBRepository } from '@infrastructure/repositories/order-dynamodb.repository';
import { DynamoDBConfigModule } from '@infrastructure/config/dynamodb.config';

export const ORDER_REPOSITORY_TOKEN = 'ORDER_REPOSITORY';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.development', '.env'],
    }),
    DynamoDBConfigModule,
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: OrderDynamoDBRepository,
    },
    CreateOrderUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
  ],
  exports: [ORDER_REPOSITORY_TOKEN],
})
export class AppModule {}

// === ARCHIVO: api/test/order.controller.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../src/infrastructure/controllers/order.controller';
import { CreateOrderUseCase } from '../src/application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '../src/application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '../src/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '../src/application/use-cases/delete-order.usecase';
import { Order } from '../src/domain/entities/order.entity';
import { CreateOrderDto } from '../src/infrastructure/dto/create-order.dto';
import { UpdateOrderDto } from '../src/infrastructure/dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let getOrderUseCase: GetOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let deleteOrderUseCase: DeleteOrderUseCase;

  const mockOrder: Order = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    customerId: 'customer-123',
    products: ['product-1', 'product-2'],
    totalAmount: 150.00,
    status: 'PENDING',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isPaid: false,
  };

  const mockCreateOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockGetOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockUpdateOrderUseCase = {
    execute: jest.fn().mockResolvedValue({ ...mockOrder, status: 'COMPLETED' }),
  };

  const mockDeleteOrderUseCase = {
    execute: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: CreateOrderUseCase, useValue: mockCreateOrderUseCase },
        { provide: GetOrderUseCase, useValue: mockGetOrderUseCase },
        { provide: UpdateOrderUseCase, useValue: mockUpdateOrderUseCase },
        { provide: DeleteOrderUseCase, useValue: mockDeleteOrderUseCase },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    getOrderUseCase = module.get<GetOrderUseCase>(GetOrderUseCase);
    updateOrderUseCase = module.get<UpdateOrderUseCase>(UpdateOrderUseCase);
    deleteOrderUseCase = module.get<DeleteOrderUseCase>(DeleteOrderUseCase);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente', async () => {
      const createOrderDto: CreateOrderDto = {
        customerId: 'customer-123',
        products: ['product-1', 'product-2'],
        totalAmount: 150.00,
      };

      const result = await controller.createOrder(createOrderDto);

      expect(createOrderUseCase.execute).toHaveBeenCalledWith({
        customerId: 'customer-123',
        products: ['product-1', 'product-2'],
        totalAmount: 150.00,
      });
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al crear orden', async () => {
      jest.spyOn(mockCreateOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Error de creación'));
      const createOrderDto: CreateOrderDto = {
        customerId: 'customer-123',
        products: ['product-1'],
        totalAmount: 50.00,
      };

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow('Error de creación');
    });
  });

  describe('getOrder', () => {
    it('debería obtener una orden por id', async () => {
      const result = await controller.getOrder(mockOrder.id);

      expect(getOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id);
      expect(result).toEqual(mockOrder);
    });

    it('debería retornar null si la orden no existe', async () => {
      jest.spyOn(mockGetOrderUseCase, 'execute').mockResolvedValueOnce(null);

      const result = await controller.getOrder('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updateOrderDto: UpdateOrderDto = { customerId: 'new-customer' };
      const updatedOrder = { ...mockOrder, customerId: 'new-customer', status: 'COMPLETED' };
      jest.spyOn(mockUpdateOrderUseCase, 'execute').mockResolvedValueOnce(updatedOrder);

      const result = await controller.updateOrder(mockOrder.id, updateOrderDto);

      expect(updateOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id, { customerId: 'new-customer' });
      expect(result).toEqual(updatedOrder);
    });

    it('debería manejar errores de validación al actualizar', async () => {
      jest.spyOn(mockUpdateOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Customer inválido'));
      const updateOrderDto: UpdateOrderDto = { customerId: 'invalid-customer' };

      await expect(controller.updateOrder(mockOrder.id, updateOrderDto)).rejects.toThrow('Customer inválido');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      await controller.deleteOrder(mockOrder.id);

      expect(deleteOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id);
    });

    it('debería manejar errores al eliminar orden', async () => {
      jest.spyOn(mockDeleteOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Orden no encontrada'));

      await expect(controller.deleteOrder(mockOrder.id)).rejects.toThrow('Orden no encontrada');
    });
  });
});

// === ARCHIVO: api/test/order.repository.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OrderDynamoDBRepository } from '../src/infrastructure/repositories/order-dynamodb.repository';
import { Order } from '../src/domain/entities/order.entity';
import { OrderRepository } from '../src/domain/repositories/order.repository';

describe('OrderDynamoDBRepository', () => {
  let repository: OrderRepository;
  let mockDynamoDB: any;
  let mockConfigService: ConfigService;

  const mockOrder: Order = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    customerId: 'customer-123',
    products: ['product-1', 'product-2'],
    totalAmount: 150.00,
    status: 'PENDING',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isPaid: false,
  };

  beforeEach(async () => {
    mockDynamoDB = {
      put: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) }),
      get: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Item: mockOrder }) }),
      update: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Attributes: mockOrder }) }),
      delete: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) }),
    };

    mockConfigService = new ConfigService({
      DYNAMODB_TABLE_NAME: 'orders',
      AWS_REGION: 'us-east-1',
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDynamoDBRepository,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    repository = module.get<OrderRepository>(OrderDynamoDBRepository);
  });

  it('debería estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una orden en DynamoDB', async () => {
      const result = await repository.create(mockOrder);

      expect(mockDynamoDB.put).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Item: mockOrder,
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al crear orden', async () => {
      mockDynamoDB.put.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('DynamoDB error')),
      });

      await expect(repository.create(mockOrder)).rejects.toThrow('DynamoDB error');
    });
  });

  describe('findById', () => {
    it('debería obtener una orden por id', async () => {
      const result = await repository.findById(mockOrder.id);

      expect(mockDynamoDB.get).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería retornar null si la orden no existe', async () => {
      mockDynamoDB.get.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({}),
      });

      const result = await repository.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debería actualizar una orden existente', async () => {
      const updateData: Partial<Order> = { status: 'COMPLETED', isPaid: true };

      const result = await repository.update(mockOrder.id, updateData);

      expect(mockDynamoDB.update).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al actualizar', async () => {
      mockDynamoDB.update.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('Update failed')),
      });

      await expect(repository.update(mockOrder.id, { status: 'COMPLETED' })).rejects.toThrow('Update failed');
    });
  });

  describe('delete', () => {
    it('debería eliminar una orden por id', async () => {
      await repository.delete(mockOrder.id);

      expect(mockDynamoDB.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
    });

    it('debería manejar errores al eliminar', async () => {
      mockDynamoDB.delete.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('Delete failed')),
      });

      await expect(repository.delete(mockOrder.id)).rejects.toThrow('Delete failed');
    });
  });
});

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: client/package.json ===
{
  "name": "order-management-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest watch"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "axios": "^1.7.2",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.7.0",
    "vite": "^5.3.1",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.5",
    "vitest": "^1.6.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de órdenes" />
    <title>Gestión de Órdenes</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/orders/OrderList.tsx ===
import { useState } from 'react';
import { Order } from '../../shared/types/order.types';
import { useOrders } from '../../shared/hooks/useOrders';
import { Button } from '../../shared/components/Button';
import { OrderForm } from './OrderForm';

interface OrderListProps {
  onCreateClick: () => void;
}

export function OrderList({ onCreateClick }: OrderListProps) {
  const { orders, isLoading, error, deleteOrder, fetchOrders } = useOrders();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteOrder(id);
      await fetchOrders();
    } catch (err) {
      console.error('Error al eliminar la orden:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleFormSuccess = async () => {
    handleFormClose();
    await fetchOrders();
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="order-list-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando órdenes"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error 
      ? (error as { message: string }).message 
      : String(error);
    return (
      <div className="order-list-container">
        <div className="error-state" role="alert">
          <p>Error al cargar las órdenes: {errorMessage}</p>
          <Button onClick={fetchOrders} variant="primary">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      processing: 'Procesando',
      completed: 'Completado',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <Button onClick={onCreateClick} variant="primary">
          Nueva Orden
        </Button>
      </header>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes disponibles.</p>
          <Button onClick={onCreateClick} variant="secondary">
            Crear primera orden
          </Button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="order-table" role="table" aria-label="Lista de órdenes">
            <thead>
              <tr>
                <th scope="col">Número</th>
                <th scope="col">Cliente</th>
                <th scope="col">Productos</th>
                <th scope="col">Total</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td data-label="Número">{order.orderNumber}</td>
                  <td data-label="Cliente">{order.customer.name}</td>
                  <td data-label="Productos">
                    {order.items.map((item) => (
                      <div key={item.id} className="item-summary">
                        {item.productName} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td data-label="Total">${order.total.toFixed(2)}</td>
                  <td data-label="Estado">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td data-label="Fecha">
                    {new Date(order.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td data-label="Acciones" className="actions-cell">
                    <div className="action-buttons">
                      <Button
                        onClick={() => handleEdit(order)}
                        variant="secondary"
                        size="sm"
                        disabled={deletingId === order.id}
                        aria-label={`Editar orden ${order.orderNumber}`}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(order.id)}
                        variant="danger"
                        size="sm"
                        disabled={deletingId === order.id}
                        aria-label={`Eliminar orden ${order.orderNumber}`}
                      >
                        {deletingId === order.id ? 'Eliminando...' : 'Eliminar'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay" onClick={handleFormClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingOrder ? 'Editar Orden' : 'Nueva Orden'}</h2>
              <button
                className="close-button"
                onClick={handleFormClose}
                aria-label="Cerrar formulario"
              >
                &times;
              </button>
            </div>
            <OrderForm
              order={editingOrder}
              onSuccess={handleFormSuccess}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/OrderForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { Order, Customer, OrderItem, OrderStatus } from '../../shared/types/order.types';
import { orderService, CreateOrderDto, UpdateOrderDto } from '../../services/order.service';
import { Button } from '../../shared/components/Button';

interface OrderFormProps {
  order?: Order | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function OrderForm({ order, onSuccess, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<{
    customer: Omit<Customer, 'id'>;
    items: Array<{ productId: string; productName: string; quantity: number; unitPrice: number }>;
    notes?: string;
  }>({
    customer: { name: '', email: '', phone: '', address: undefined },
    items: [{ productId: '', productName: '', quantity: 1, unitPrice: 0 }],
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setFormData({
        customer: {
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone || '',
          address: order.customer.address,
        },
        items: order.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        notes: order.notes || '',
      });
    }
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer.name.trim()) {
      newErrors.customerName = 'El nombre del cliente es obligatorio';
    } else if (formData.customer.name.trim().length < 2) {
      newErrors.customerName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.customer.email.trim()) {
      newErrors.customerEmail = 'El email del cliente es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer.email)) {
      newErrors.customerEmail = 'El email no es válido';
    }

    const firstItem = formData.items[0];
    if (!firstItem.productName.trim()) {
      newErrors.productName = 'El nombre del producto es obligatorio';
    }

    if (firstItem.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser al menos 1';
    } else if (!Number.isInteger(firstItem.quantity)) {
      newErrors.quantity = 'La cantidad debe ser un número entero';
    }

    if (firstItem.unitPrice < 0) {
      newErrors.price = 'El precio no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value, name } = e.target;
    
    if (field.startsWith('customer.')) {
      const customerField = field.replace('customer.', '') as keyof Customer;
      setFormData((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          [customerField]: value,
        },
      }));
    } else if (field.startsWith('item.')) {
      const itemField = field.replace('item.', '') as keyof typeof formData.items[0];
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item, idx) =>
          idx === 0
            ? {
                ...item,
                [itemField]: itemField === 'quantity' 
                  ? parseInt(value) || 0
                  : itemField === 'unitPrice'
                  ? parseFloat(value) || 0
                  : value,
              }
            : item
        ),
      }));
    } else if (field === 'notes') {
      setFormData((prev) => ({ ...prev, notes: value }));
    }

    if (errors[field] || errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const firstItem = formData.items[0];
      const total = firstItem.quantity * firstItem.unitPrice;
      const itemsWithTotal = [
        {
          productId: firstItem.productId,
          quantity: firstItem.quantity,
          price: firstItem.unitPrice,
        },
      ];

      if (order?.id) {
        const updateData: UpdateOrderDto = {
          status: order.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
          items: itemsWithTotal,
        };
        await orderService.updateOrder(order.id, updateData);
      } else {
        const createData: CreateOrderDto = {
          customerId: formData.customer.email,
          items: itemsWithTotal,
          total: total,
        };
        await orderService.createOrder(createData);
      }
      onSuccess();
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setSubmitError(
        err instanceof Error ? err.message : 'Error al guardar la orden. Intente de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstItem = formData.items[0];
  const total = firstItem.quantity * firstItem.unitPrice;

  return (
    <form onSubmit={handleSubmit} className="order-form" noValidate>
      {submitError && (
        <div className="form-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="customerName">Nombre del Cliente *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customer.name}
          onChange={(e) => handleChange(e, 'customer.name')}
          className={errors.customerName ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.customerName}
          aria-describedby={errors.customerName ? 'customerName-error' : undefined}
        />
        {errors.customerName && (
          <span id="customerName-error" className="error-message" role="alert">
            {errors.customerName}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email del Cliente *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customer.email}
          onChange={(e) => handleChange(e, 'customer.email')}
          className={errors.customerEmail ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.customerEmail}
          aria-describedby={errors.customerEmail ? 'customerEmail-error' : undefined}
        />
        {errors.customerEmail && (
          <span id="customerEmail-error" className="error-message" role="alert">
            {errors.customerEmail}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="productName">Nombre del Producto *</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={firstItem.productName}
          onChange={(e) => handleChange(e, 'item.productName')}
          className={errors.productName ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.productName}
          aria-describedby={errors.productName ? 'productName-error' : undefined}
        />
        {errors.productName && (
          <span id="productName-error" className="error-message" role="alert">
            {errors.productName}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Cantidad *</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={firstItem.quantity}
            onChange={(e) => handleChange(e, 'item.quantity')}
            min="1"
            step="1"
            className={errors.quantity ? 'input-error' : ''}
            disabled={isSubmitting}
            aria-invalid={!!errors.quantity}
            aria-describedby={errors.quantity ? 'quantity-error' : undefined}
          />
          {errors.quantity && (
            <span id="quantity-error" className="error-message" role="alert">
              {errors.quantity}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio Unitario ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={firstItem.unitPrice}
            onChange={(e) => handleChange(e, 'item.unitPrice')}
            min="0"
            step="0.01"
            className={errors.price ? 'input-error' : ''}
            disabled={isSubmitting}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && (
            <span id="price-error" className="error-message" role="alert">
              {errors.price}
            </span>
          )}
        </div>
      </div>

      <div className="form-group total-display">
        <label>Total:</label>
        <span className="total-value">${total.toFixed(2)}</span>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={(e) => handleChange(e, 'notes')}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      {order && (
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={order.status}
            disabled
            aria-label="Estado de la orden"
          >
            <option value="pending">Pendiente</option>
            <option value="processing">Procesando</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Guardando...'
            : order
            ? 'Actualizar Orden'
            : 'Crear Orden'}
        </Button>
      </div>
    </form>
  );
}

// === ARCHIVO: client/src/services/order.service.ts ===
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface CreateOrderDto {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface UpdateOrderDto {
  customerId?: string;
  items?: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total?: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

class OrderService {
  private readonly client: AxiosInstance;
  private static readonly BASE_URL: string = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

  constructor() {
    this.client = axios.create({
      baseURL: OrderService.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<OrderApiError>) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const response: AxiosResponse<Order> = await this.client.post<Order>('/orders', data);
    return response.data;
  }

  async getOrder(id: string): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    const response: AxiosResponse<Order> = await this.client.get<Order>(`/orders/${encodeURIComponent(id)}`);
    return response.data;
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Update data is required');
    }
    const response: AxiosResponse<Order> = await this.client.put<Order>(
      `/orders/${encodeURIComponent(id)}`,
      data
    );
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    await this.client.delete(`/orders/${encodeURIComponent(id)}`);
  }

  async getAllOrders(params?: {
    limit?: number;
    offset?: number;
    status?: Order['status'];
    customerId?: string;
  }): Promise<{ orders: Order[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.customerId) searchParams.append('customerId', params.customerId);

    const queryString = searchParams.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    const response: AxiosResponse<{ orders: Order[]; total: number }> = await this.client.get(url);
    return response.data;
  }
}

export const orderService = new OrderService();
export default OrderService;

// === ARCHIVO: client/src/shared/components/Button.tsx ===
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
  outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-400',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-colors duration-200 ease-in-out focus:outline-none
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-60
    `;

    const widthClass = fullWidth ? 'w-full' : '';

    const combinedClassName = [
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonProps, ButtonVariant, ButtonSize };
export { Button };

// === ARCHIVO: client/src/shared/hooks/useOrders.ts ===
import { useState, useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderListResponse,
  OrderApiError,
} from '../types/order.types';

interface UseOrdersOptions {
  autoFetch?: boolean;
  baseUrl?: string;
}

interface UseOrdersReturn {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  isFetching: boolean;
  error: OrderApiError | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  createOrder: (data: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearCurrentOrder: () => void;
}

export function useOrders(options: UseOrdersOptions = {}): UseOrdersReturn {
  const { autoFetch = true, baseUrl = 'http://localhost:3000' } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<OrderApiError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const fetchOrders = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OrderListResponse = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      const axiosError = err as AxiosError<OrderApiError>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Failed to fetch orders';
      setError({
        message: errorMessage,
        status: axiosError.response?.status || 500,
        code: axiosError.code,
      });
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  const fetchOrderById = useCallback(
    async (id: string): Promise<Order | null> => {
      setIsFetching(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return null;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order = await response.json();
        setCurrentOrder(data);
        return data;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to fetch order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsFetching(false);
      }
    },
    [baseUrl]
  );

  const createOrder = useCallback(
    async (data: CreateOrderDto): Promise<Order | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData: OrderApiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const createdOrder: Order = await response.json();
        setOrders((prev) => [...prev, createdOrder]);
        return createdOrder;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to create order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const updateOrder = useCallback(
    async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return null;
          }
          const errorData: OrderApiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const updatedOrder: Order = await response.json();
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? updatedOrder : order))
        );
        if (currentOrder?.id === id) {
          setCurrentOrder(updatedOrder);
        }
        return updatedOrder;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to update order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, currentOrder]
  );

  const deleteOrder = useCallback(
    async (id: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return false;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setOrders((prev) => prev.filter((order) => order.id !== id));
        if (currentOrder?.id === id) {
          setCurrentOrder(null);
        }
        return true;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to delete order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, currentOrder]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  return {
    orders,
    currentOrder,
    isLoading,
    isFetching,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
    clearCurrentOrder,
  };
}

export type { UseOrdersOptions, UseOrdersReturn };

// === ARCHIVO: client/src/shared/types/order.types.ts ===
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  customer: Omit<Customer, 'id'>;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  shippingAddress?: Customer['address'];
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  notes?: string;
  items?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress?: Customer['address'];
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface OrderApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface OrderFilterParams {
  status?: OrderStatus;
  customerId?: string;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'orderNumber';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderValidationError {
  field: string;
  message: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order?: Order;
  errors?: OrderValidationError[];
}

export interface UpdateOrderResponse {
  success: boolean;
  order?: Order;
  errors?: OrderValidationError[];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'yellow',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
};

// === ARCHIVO: client/src/main.tsx ===
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Ensure index.html contains a div with id="root".');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from './features/orders/OrderList';
import { OrderForm } from './features/orders/OrderForm';
import { useOrders } from './shared/hooks/useOrders';
import { useState, useCallback } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from './shared/types/order.types';

function App() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const orderHooks = useOrders({ autoFetch: true, baseUrl: 'http://localhost:3000' });

  const handleCreateClick = useCallback(() => {
    setEditingOrder(null);
  }, []);

  const handleOrderSuccess = useCallback(() => {
    setEditingOrder(null);
    orderHooks.fetchOrders();
  }, [orderHooks.fetchOrders]);

  const handleCancelForm = useCallback(() => {
    setEditingOrder(null);
  }, []);

  const handleCreateOrder = useCallback(async (data: CreateOrderDto): Promise<Order | null> => {
    return await orderHooks.createOrder(data);
  }, [orderHooks.createOrder]);

  const handleUpdateOrder = useCallback(async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    return await orderHooks.updateOrder(id, data);
  }, [orderHooks.updateOrder]);

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <OrderList
              onCreateClick={handleCreateClick}
              onDeleteOrder={orderHooks.deleteOrder}
              onRefresh={orderHooks.fetchOrders}
            />
          }
        />
        <Route
          path="/orders/new"
          element={
            editingOrder ? (
              <Navigate to="/" replace />
            ) : (
              <OrderForm
                order={null}
                onSuccess={handleOrderSuccess}
                onCancel={handleCancelForm}
              />
            )
          }
        />
        <Route
          path="/orders/:id/edit"
          element={
            <OrderForm
              order={editingOrder}
              onSuccess={handleOrderSuccess}
              onCancel={handleCancelForm}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: infra/variables.tf ===
# variables.tf - Declaracion de variables de entrada para el proyecto Terraform
# Estas variables permiten parametrizar la infraestructura y son usadas en main.tf

variable "aws_region" {
  description = "Region de AWS donde se desplegaran los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "dynamodb_primary_key" {
  description = "Nombre del atributo de clave primaria de la tabla DynamoDB"
  type        = string
  default     = "id"
}

variable "dynamodb_primary_key_type" {
  description = "Tipo de dato de la clave primaria (S: String, N: Number, B: Binary)"
  type        = string
  default     = "S"
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura para la tabla DynamoDB"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura para la tabla DynamoDB"
  type        = number
  default     = 5
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturacion para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
}

variable "dynamodb_hash_key" {
  description = "Clave hash para la tabla DynamoDB"
  type        = string
  default     = "id"
}

variable "dynamodb_attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "id"
      type = "S"
    }
  ]
}

variable "dynamodb_global_secondary_indexes" {
  description = "Lista de indices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    hash_key_type   = string
    range_key       = optional(string)
    range_key_type  = optional(string)
    read_capacity   = number
    write_capacity  = number
    projection_type = string
  }))
  default = []
}

variable "stream_enabled" {
  description = "Habilitar streams de DynamoDB para captura de cambios"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream de DynamoDB (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
}

variable "ttl_enabled" {
  description = "Habilitar Time-To-Live para expiracion automatica de items"
  type        = bool
  default     = false
}

variable "ttl_attribute_name" {
  description = "Nombre del atributo TTL en la tabla DynamoDB"
  type        = string
  default     = "expirationTime"
}

variable "point_in_time_recovery_enabled" {
  description = "Habilitar recuperacion point-in-time para backups"
  type        = bool
  default     = false
}

variable "server_side_encryption_enabled" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "server_side_encryption_kms_key_arn" {
  description = "ARN de la clave KMS para cifrado del lado del servidor"
  type        = string
  default     = null
}

variable "tags" {
  description = "Etiquetas adicionales para los recursos"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/providers.tf ===
# Configuración de proveedores de Terraform para AWS
# Este archivo define los proveedores necesarios para desplegar infraestructura en AWS.
# Se utiliza el proveedor hashicorp/aws en su versión 5.50.0 para garantizar compatibilidad
# y acceso a las últimas características de AWS.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.50.0"
    }
  }
}

# Configuración del proveedor AWS
# Se configura el proveedor AWS con la región por defecto definida en variables.
# Esto permite que toda la infraestructura se despliegue en la región especificada.
provider "aws" {
  region = var.aws_region
  # Se recomienda configurar las credenciales mediante variables de entorno o AWS CLI
  # para evitar exponer credenciales sensibles en el código.
  # Ejemplo de configuración mediante variables de entorno:
  # export AWS_ACCESS_KEY_ID="your_access_key"
  # export AWS_SECRET_ACCESS_KEY="your_secret_key"
}

# Configuración de proveedor alternativo para regiones replicadas
# Este proveedor permite crear réplicas de tablas DynamoDB en diferentes regiones.
# Se utiliza principalmente para escenarios de redundancia geográfica y baja latencia.
provider "aws" {
  alias  = "secondary_region"
  region = "us-west-2"
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# =============================================================================
# Valores de variables para el entorno de desarrollo
# =============================================================================
# Este archivo define la configuración específica del entorno de desarrollo.
# Los valores aquí establecidos son utilizados por Terraform para provisionar
# los recursos de AWS en el ambiente de dev.

# -----------------------------------------------------------------------------
# Configuración regional de AWS
# -----------------------------------------------------------------------------
aws_region = "us-east-1"

# -----------------------------------------------------------------------------
# Configuración de la tabla DynamoDB
# -----------------------------------------------------------------------------
# Nombre de la tabla de órdenes para el entorno de desarrollo
table_name = "orders-dev"

# Clave primaria de la tabla
primary_key = "orderId"
# Tipo de la clave primaria: S = String, N = Number, B = Binary
primary_key_type = "S"

# Atributos adicionales de la tabla
# Se definen los atributos que forman parte de la clave primaria y índices
attributes = [
  {
    name = "orderId"
    type = "S"
  },
  {
    name = "customerId"
    type = "S"
  },
  {
    name = "status"
    type = "S"
  },
  {
    name = "createdAt"
    type = "S"
  },
  {
    name = "updatedAt"
    type = "S"
  },
  {
    name = "totalAmount"
    type = "N"
  }
]

# -----------------------------------------------------------------------------
# Capacidad de lectura y escritura (solo para modo PROVISIONED)
# -----------------------------------------------------------------------------
# Unidades de capacidad de lectura por segundo
read_capacity = 5

# Unidades de capacidad de escritura por segundo
write_capacity = 5

# -----------------------------------------------------------------------------
# Modo de facturación
# -----------------------------------------------------------------------------
# Opciones: PROVISIONED o PAY_PER_REQUEST
billing_mode = "PROVISIONED"

# -----------------------------------------------------------------------------
# Configuración de índices secundarios globales (GSI)
# -----------------------------------------------------------------------------
# Los GSI permiten consultas eficientes sobre atributos diferentes a la clave primaria
global_secondary_indexes = [
  {
    name            = "CustomerIdIndex"
    hash_key        = "customerId"
    hash_key_type   = "S"
    range_key       = "createdAt"
    range_key_type  = "S"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  },
  {
    name            = "StatusIndex"
    hash_key        = "status"
    hash_key_type   = "S"
    range_key       = "createdAt"
    range_key_type  = "S"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }
]

# -----------------------------------------------------------------------------
# Habilitación de DynamoDB Streams
# -----------------------------------------------------------------------------
# Los streams capturan modificaciones en la tabla
# Opciones: true o false
stream_enabled = true

# Tipo de vista del stream
# Opciones: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES
stream_view_type = "NEW_AND_OLD_IMAGES"

# -----------------------------------------------------------------------------
# Configuración de Time-To-Live (TTL)
# -----------------------------------------------------------------------------
# Habilitar eliminación automática de elementos
ttl_enabled = true

# Nombre del atributo que contiene el tiempo de expiración (epoch timestamp)
ttl_attribute_name = "expirationTime"

# -----------------------------------------------------------------------------
# Recuperación a punto en el tiempo (PITR)
# -----------------------------------------------------------------------------
# Habilita restauración point-in-time para la tabla
point_in_time_recovery_enabled = false

# -----------------------------------------------------------------------------
# Cifrado del lado del servidor (SSE)
# -----------------------------------------------------------------------------
# Habilitar cifrado SSE para la tabla
server_side_encryption_enabled = true

# ARN de la clave KMS para el cifrado (null para usar clave gestionada por AWS)
server_side_encryption_kms_key_arn = null

# -----------------------------------------------------------------------------
# Etiquetas (tags) para los recursos
# -----------------------------------------------------------------------------
# Metadatos que se aplican a todos los recursos creados
tags = {
  Environment = "development"
  Project     = "orders-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Team        = "backend"
  Version     = "1.0.0"
}

// === ARCHIVO: infra/README.md ===
# Módulo de Infraestructura Terraform para Gestión de Órdenes

## Descripción General

Este módulo de Terraform provisiona la infraestructura necesaria para el sistema de gestión de órdenes en AWS, utilizando DynamoDB como base de datos principal. El diseño sigue las mejores prácticas de infraestructura como código (IaC) con Modularización, Variables configurables y Outputs documentados.

## Arquitectura de la Solución

El módulo está estructurado en capas que permiten una reutilización efectiva y un mantenimiento sencillo:

```
infra/
├── environments/
│   └── dev/
│       └── terraform.tfvars    # Configuración específica de desarrollo
├── modules/
│   └── dynamodb/
│       ├── main.tf             # Recurso de tabla DynamoDB
│       ├── variables.tf        # Variables del módulo
│       └── outputs.tf          # Salidas del módulo
├── providers.tf                # Configuración de proveedores AWS
├── versions.tf                 # Versiones de Terraform y proveedores
├── main.tf                     # Composición de módulos
├── variables.tf                # Variables globales del proyecto
└── outputs.tf                  # Salidas globales del proyecto
```

## Componentes de Infraestructura

### Tabla DynamoDB

La tabla principal de órdenes está configurada con:

- **Clave primaria**: `orderId` (String) - Identificador único de cada orden
- **Índices secundarios globales (GSI)**:
  - `CustomerIdIndex`: Permite consultas por cliente con ordenamiento por fecha
  - `StatusIndex`: Permite consultas por estado de orden
- **DynamoDB Streams**: Habilitados para capturar cambios en tiempo real
- **TTL (Time-To-Live)**: Configurado para limpieza automática de registros antiguos
- **Cifrado**: Habilitado con clave gestionada por AWS

### Opciones de Configuración

El módulo soporta múltiples configuraciones a través de variables:

| Variable | Descripción | Valores típicos |
|----------|-------------|-----------------|
| `billing_mode` | Modo de facturación | PROVISIONED, PAY_PER_REQUEST |
| `read_capacity` | Capacidad de lectura RCU | 5-10000 (PROVISIONED) |
| `write_capacity` | Capacidad de escritura WCU | 5-10000 (PROVISIONED) |
| `stream_enabled` | Habilitar streams | true, false |
| `ttl_enabled` | Habilitar TTL | true, false |
| `point_in_time_recovery_enabled` | Habilitar PITR | true, false |

## Uso del Módulo

### Prerequisites

- Terraform >= 1.0 instalado
- Credenciales de AWS configuradas (AWS CLI o variables de entorno)
- Permisos para crear recursos de DynamoDB

### Inicialización

```bash
cd infra
terraform init
```

### Validación

```bash
# Validar sintaxis de archivos Terraform
terraform validate

# Revisar el plan de ejecución
terraform plan -var-file=environments/dev/terraform.tfvars
```

### Aplicar cambios

```bash
# Aplicar la infraestructura
terraform apply -var-file=environments/dev/terraform.tfvars

# O de forma interactiva
terraform apply
```

### Destruir recursos

```bash
# Eliminar todos los recursos creados
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## Estructura de Datos de Órdenes

El modelo de datos de la tabla de órdenes sigue esta estructura:

```json
{
  "orderId": "ORD-2024-001",
  "customerId": "CUST-12345",
  "status": "PENDING",
  "items": [
    {
      "productId": "PROD-001",
      "quantity": 2,
      "unitPrice": 29.99
    }
  ],
  "totalAmount": 59.98,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "expirationTime": 1737067200
}
```

### Atributos de la tabla

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| orderId | String | Identificador único de la orden |
| customerId | String | ID del cliente que realizó la orden |
| status | String | Estado actual: PENDING, PROCESSING, COMPLETED, CANCELLED |
| items | Lista | Lista de productos en la orden |
| totalAmount | Number | Monto total de la orden |
| createdAt | String | Fecha de creación (ISO 8601) |
| updatedAt | String | Fecha de última actualización (ISO 8601) |
| expirationTime | Number | Timestamp Unix para TTL |

## Validación Local

Para validar que la infraestructura está correctamente configurada antes de desplegar a producción:

```bash
# Ejecutar todos los validadores
terraform fmt -recursive
terraform validate
terraform plan -var-file=environments/dev/terraform.tfvars
```

## Consideraciones de Seguridad

- El cifrado SSE está habilitado por defecto usando AWS managed keys
- Para producción, se recomienda usar una clave KMS personalizada
- Los logs de CloudTrail deben estar habilitados para auditoría
- Considerar restrictiones de acceso mediante IAM policies

## Variables de Entorno

El módulo puede utilizar las siguientes variables de entorno:

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="us-east-1"
```

## Outputs Disponibles

El módulo proporciona los siguientes outputs:

- `table_name`: Nombre de la tabla DynamoDB creada
- `table_arn`: ARN de la tabla para referencias en otros módulos
- `table_id`: ID único de la tabla
- `stream_arn`: ARN del stream de DynamoDB (si está habilitado)

## Mantenimiento

### Actualizar capacidad

Para modificar la capacidad de la tabla:

```bash
terraform plan -var-file=environments/dev/terraform.tfvars \
  -var="read_capacity=10" \
  -var="write_capacity=10"
```

### Agregar nuevos índices

Editar `global_secondary_indexes` en el archivo `terraform.tfvars` correspondiente.

## Troubleshooting

### Error: "Table already exists"

Verificar que el nombre de la tabla no exista previamente en la región de AWS.

### Error: "Provisioned throughput exceeded"

Incrementar los valores de `read_capacity` y `write_capacity` o cambiar a `billing_mode = "PAY_PER_REQUEST"`.

### Error: "MalformedInput"

Verificar que los tipos de atributos en `attributes` coincidan con los tipos de claves primaria y GSI.

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
  }
}

resource "aws_dynamodb_table" "this" {
  name             = var.table_name
  billing_mode     = var.billing_mode
  hash_key         = var.primary_key
  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_enabled ? var.stream_view_type : null
  ttl {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_enabled ? var.ttl_attribute_name : null
  }

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      hash_key           = global_secondary_index.value.hash_key
      name               = global_secondary_index.value.name
      non_key_attributes = try(global_secondary_index.value.non_key_attributes, [])
      projection_type    = try(global_secondary_index.value.projection_type, "ALL")
      read_capacity      = var.read_capacity
      write_capacity     = var.write_capacity
    }
  }

  dynamic "server_side_encryption" {
    for_each = var.server_side_encryption_enabled ? [1] : []
    content {
      enabled     = true
      kms_key_arn = var.server_side_encryption_kms_key_arn
    }
  }

  dynamic "point_in_time_recovery" {
    for_each = var.point_in_time_recovery_enabled ? [1] : []
    content {
      enabled = true
    }
  }

  tags = var.tags

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_replica" "this" {
  count          = var.replica_regions != null ? length(var.replica_regions) : 0
  provider       = aws.replica
  table_name     = aws_dynamodb_table.this.name
  replica_region = var.replica_regions[count.index]
  kms_key_arn    = try(var.replica_kms_key_arn, null)
  point_in_time_recovery {
    enabled = try(var.replica_point_in_time_recovery_enabled, false)
  }
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.0"
}

// === ARCHIVO: infra/main.tf ===
// Modulo principal de infraestructura para la tabla de ordenes en DynamoDB
// Este archivo orquesta la creacion de todos los recursos necesarios
// para persistir ordenes en la base de datos DynamoDB

// Modulo de DynamoDB para almacenar ordenes
// El modulo dynamodb ya esta definido en modules/dynamodb/
// y recibe todas las configuraciones mediante variables
module "orders_dynamodb" {
  source = "./modules/dynamodb"

  // Nombre de la tabla - obligatorio
  table_name = var.dynamodb_table_name

  // Clave primaria de la tabla
  primary_key = var.dynamodb_primary_key

  // Atributos adicionales para la clave primaria
  attributes = var.dynamodb_attributes

  // Capacidades de lectura y escritura
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity

  // Modo de facturacion - PROVISIONED o PAY_PER_REQUEST
  billing_mode = var.dynamodb_billing_mode

  // Indices secundarios globales para consultas eficientes
  global_secondary_indexes = var.dynamodb_global_secondary_indexes

  // Habilitar streams de DynamoDB para captura de cambios
  stream_enabled   = var.stream_enabled
  stream_view_type = var.stream_view_type

  // Configuracion de Time-To-Live para expiracion automatica
  ttl_enabled        = var.ttl_enabled
  ttl_attribute_name = var.ttl_attribute_name

  // Recuperacion point-in-time para backups
  point_in_time_recovery_enabled = var.point_in_time_recovery_enabled

  // Cifrado del lado del servidor
  server_side_encryption_enabled     = var.server_side_encryption_enabled
  server_side_encryption_kms_key_arn = var.server_side_encryption_kms_key_arn

  // Tags aplicados a todos los recursos
  tags = var.tags
}

// Recurso adicional: tabla de audit trail para logging de operaciones
// Esta tabla secundaria registra todas las operaciones CRUD realizadas
// sobre la tabla principal de ordenes
module "audit_dynamodb" {
  source = "./modules/dynamodb"

  table_name  = "${var.dynamodb_table_name}-audit"
  primary_key = "auditId"

  attributes = [
    {
      name = "auditId"
      type = "S"
    },
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "timestamp"
      type = "N"
    }
  ]

  read_capacity  = 2
  write_capacity = 2
  billing_mode   = "PROVISIONED"

  global_secondary_indexes = [
    {
      name            = "orderId-index"
      hash_key        = "orderId"
      hash_key_type   = "S"
      range_key       = "timestamp"
      range_key_type  = "N"
      read_capacity   = 2
      write_capacity  = 2
      projection_type = "ALL"
    }
  ]

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  ttl_enabled        = true
  ttl_attribute_name = "expirationTime"

  point_in_time_recovery_enabled = false
  server_side_encryption_enabled = true

  tags = var.tags
}

// Configuracion de replicacion entre regiones para alta disponibilidad
// Descomentar si se requiere replicacion geografica
/*
resource "aws_dynamodb_table_replica" "orders_secondary" {
  table_name = module.orders_dynamodb.table_name
  provider   = aws.secondary_region
}
*/

// === ARCHIVO: infra/outputs.tf ===
// Outputs de la infraestructura de DynamoDB
// Exponen la informacion necesaria para que otros componentes
// puedan interactuar con las tablas creadas

// Output principal: nombre de la tabla de ordenes
output "orders_table_name" {
  description = "Nombre de la tabla de ordenes en DynamoDB"
  value       = module.orders_dynamodb.table_name
}

// Output: ARN de la tabla de ordenes
output "orders_table_arn" {
  description = "ARN de la tabla de ordenes en DynamoDB"
  value       = module.orders_dynamodb.table_arn
}

// Output: ID de la tabla de ordenes
output "orders_table_id" {
  description = "ID interno de la tabla de ordenes en DynamoDB"
  value       = module.orders_dynamodb.table_id
}

// Output: nombre de la tabla de audit
output "audit_table_name" {
  description = "Nombre de la tabla de audit trail en DynamoDB"
  value       = module.audit_dynamodb.table_name
}

// Output: ARN de la tabla de audit
output "audit_table_arn" {
  description = "ARN de la tabla de audit trail en DynamoDB"
  value       = module.audit_dynamodb.table_arn
}

// Output: estado actual de la tabla de ordenes
output "orders_table_status" {
  description = "Estado actual de la tabla de ordenes en DynamoDB"
  value       = module.orders_dynamodb.table_status
}

// Output: ARN del stream de la tabla de ordenes
output "orders_table_stream_arn" {
  description = "ARN del stream de la tabla de ordenes"
  value       = module.orders_dynamodb.stream_arn
}

// Output: nombre del indice secundario global principal
output "orders_table_gsi_names" {
  description = "Nombres de los indices secundarios globales de la tabla de ordenes"
  value       = [for gsi in var.dynamodb_global_secondary_indexes : gsi.name]
}

// Output: configuracion de capacidad
output "orders_table_capacity" {
  description = "Configuracion de capacidad de la tabla de ordenes"
  value = {
    read_capacity  = module.orders_dynamodb.read_capacity
    write_capacity = module.orders_dynamodb.write_capacity
    billing_mode   = var.dynamodb_billing_mode
  }
}

// Output: configuracion de cifrado
output "orders_table_encryption" {
  description = "Configuracion de cifrado de la tabla de ordenes"
  value = {
    server_side_encryption_enabled = var.server_side_encryption_enabled
    kms_key_arn                    = var.server_side_encryption_kms_key_arn
  }
}

// Output: configuracion de TTL
output "orders_table_ttl" {
  description = "Configuracion de Time-To-Live de la tabla de ordenes"
  value = {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_attribute_name
  }
}

// Output: configuracion de Point-in-Time Recovery
output "orders_table_pitr" {
  description = "Configuracion de Point-in-Time Recovery de la tabla de ordenes"
  value = {
    enabled = var.point_in_time_recovery_enabled
  }
}

// Output: informacion completa de la tabla de ordenes
output "orders_table_complete" {
  description = "Objeto completo con informacion de la tabla de ordenes"
  value       = module.orders_dynamodb.table
}

// Output: informacion completa de la tabla de audit
output "audit_table_complete" {
  description = "Objeto completo con informacion de la tabla de audit"
  value       = module.audit_dynamodb.table
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables para el módulo DynamoDB
# Este archivo define las variables específicas del módulo DynamoDB,
# permitiendo personalizar la creación de la tabla DynamoDB.

# Nombre de la tabla DynamoDB
variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

# Modo de facturación para la tabla
variable "billing_mode" {
  description = "Modo de facturación (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST"
  }
}

# Clave primaria de la tabla
variable "primary_key" {
  description = "Nombre de la clave primaria de la tabla"
  type        = string
}

# Habilitar stream de DynamoDB
variable "stream_enabled" {
  description = "Habilitar stream de DynamoDB para capturar cambios"
  type        = bool
  default     = false
}

# Tipo de vista del stream
variable "stream_view_type" {
  description = "Tipo de stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de stream debe ser KEYS_ONLY, NEW_IMAGE, OLD_IMAGE o NEW_AND_OLD_IMAGES"
  }
}

# Habilitar TTL
variable "ttl_enabled" {
  description = "Habilitar Time To Live (TTL) para la tabla"
  type        = bool
  default     = false
}

# Nombre del atributo TTL
variable "ttl_attribute_name" {
  description = "Nombre del atributo utilizado para TTL"
  type        = string
  default     = "expirationTime"
}

# Atributos adicionales de la tabla
variable "attributes" {
  description = "Lista de atributos adicionales para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = []
}

# Índices secundarios globales
variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales (GSI)"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = []
}

# Capacidad de lectura
variable "read_capacity" {
  description = "Unidades de capacidad de lectura provisionada"
  type        = number
  default     = 5
}

# Capacidad de escritura
variable "write_capacity" {
  description = "Unidades de capacidad de escritura provisionada"
  type        = number
  default     = 5
}

# Habilitar cifrado del lado del servidor
variable "server_side_encryption_enabled" {
  description = "Habilitar cifrado en reposo para la tabla"
  type        = bool
  default     = true
}

# ARN de la clave KMS para cifrado
variable "server_side_encryption_kms_key_arn" {
  description = "ARN de la clave KMS para cifrado en reposo"
  type        = string
  default     = null
}

# Habilitar Point-in-Time Recovery
variable "point_in_time_recovery_enabled" {
  description = "Habilitar recuperación punto en el tiempo"
  type        = bool
  default     = false
}

# Tags para los recursos
variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

# Regiones para réplicas
variable "replica_regions" {
  description = "Lista de regiones para réplicas de la tabla"
  type = list(object({
    region_name     = string
    propagate_tags  = optional(bool, false)
    table_class_std = optional(string, "STANDARD")
  }))
  default = []
}

# Clave KMS para réplicas
variable "replica_kms_key_arn" {
  description = "ARN de la clave KMS para cifrado de réplicas"
  type        = string
  default     = null
}

# Habilitar Point-in-Time Recovery en réplicas
variable "replica_point_in_time_recovery_enabled" {
  description = "Habilitar recuperación punto en el tiempo para réplicas"
  type        = bool
  default     = false
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
# Outputs del módulo DynamoDB
# Este archivo define las salidas del módulo que pueden ser utilizadas
# por otros componentes de la infraestructura.

# Nombre de la tabla
output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

# ARN de la tabla
output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

# ID de la tabla
output "table_id" {
  description = "ID de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

# Estado de la tabla
output "table_status" {
  description = "Estado actual de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.status
}

# Nombres de los índices secundarios globales
output "gsi_names" {
  description = "Nombres de los índices secundarios globales"
  value       = aws_dynamodb_table.this.global_secondary_index_names
}

# ARN del stream de la tabla
output "stream_arn" {
  description = "ARN del stream de DynamoDB"
  value       = aws_dynamodb_table.this.stream_arn
}

# Capacidad de lectura de la tabla
output "read_capacity" {
  description = "Capacidad de lectura de la tabla"
  value       = aws_dynamodb_table.this.read_capacity
}

# Capacidad de escritura de la tabla
output "write_capacity" {
  description = "Capacidad de escritura de la tabla"
  value       = aws_dynamodb_table.this.write_capacity
}

# Información de cifrado
output "encryption" {
  description = "Configuración de cifrado de la tabla"
  value = {
    enabled    = aws_dynamodb_table.this.server_side_encryption_enabled
    kms_key_id = aws_dynamodb_table.this.server_side_encryption_kms_key_arn
  }
}

# Configuración de TTL
output "ttl" {
  description = "Configuración de Time To Live"
  value = {
    enabled        = aws_dynamodb_table.this.ttl_enabled
    attribute_name = aws_dynamodb_table.this.ttl_attribute
  }
}

# Punto de recuperación en el tiempo
output "point_in_time_recovery" {
  description = "Configuración de recuperación punto en el tiempo"
  value = {
    enabled = aws_dynamodb_table.this.point_in_time_recovery_enabled
  }
}

# Objeto completo de la tabla
output "table" {
  description = "Objeto completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.this
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
