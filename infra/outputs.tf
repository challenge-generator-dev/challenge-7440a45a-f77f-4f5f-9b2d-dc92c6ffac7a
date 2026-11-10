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