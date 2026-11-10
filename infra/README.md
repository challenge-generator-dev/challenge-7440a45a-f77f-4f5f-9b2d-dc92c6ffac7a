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