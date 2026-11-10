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