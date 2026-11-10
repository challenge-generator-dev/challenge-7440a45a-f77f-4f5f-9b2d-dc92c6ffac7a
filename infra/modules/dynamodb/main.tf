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