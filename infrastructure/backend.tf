terraform {
  backend "s3" {
    bucket         = "schulbeginn-countdown-tfstate"
    key            = "infrastructure/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "schulbeginn-countdown-tflocks"
    encrypt        = true
  }
}
