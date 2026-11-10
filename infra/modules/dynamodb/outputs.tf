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