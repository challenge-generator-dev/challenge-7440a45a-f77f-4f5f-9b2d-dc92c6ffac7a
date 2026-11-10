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