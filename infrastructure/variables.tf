variable "aws_region" {
  type        = string
  default     = "eu-central-1"
  description = "AWS Region für die Lambda-Funktion"
}

variable "og_image_detail_level" {
  type        = string
  default     = "full"
  description = "Default Detail-Level für OG-Image (days, hours, full)"

  validation {
    condition     = contains(["days", "hours", "full"], var.og_image_detail_level)
    error_message = "Detail-Level muss 'days', 'hours' oder 'full' sein."
  }
}

variable "target_date" {
  type        = string
  default     = "2026-08-15T00:00:00+02:00"
  description = "Zieldatum für Countdown (ISO 8601)"
}

variable "school_info" {
  type = object({
    title    = string
    subtitle = string
    date_str = string
  })
  default = {
    title    = "Countdown zum Schulbeginn"
    subtitle = "Klasse 1, Grundschule Stadtfeld"
    date_str = "bis zum 15. August 2026"
  }
  description = "Schul-Informationen für OG-Image"
}

variable "lambda_memory_size" {
  type        = number
  default     = 128
  description = "Lambda Memory in MB"
}

variable "lambda_timeout" {
  type        = number
  default     = 10
  description = "Lambda Timeout in Sekunden"
}

variable "cache_max_age" {
  type        = number
  default     = 300
  description = "Cache-Control max-age in Sekunden (0-3600)"
}
