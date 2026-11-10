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