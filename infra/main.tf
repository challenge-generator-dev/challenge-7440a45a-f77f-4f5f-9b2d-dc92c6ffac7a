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