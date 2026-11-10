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