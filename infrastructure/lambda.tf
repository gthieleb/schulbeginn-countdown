data "archive_file" "lambda" {
  type        = "zip"
  output_path = "${path.module}/lambda.zip"

  source {
    content  = file("${path.module}/src/index.mjs")
    filename = "index.mjs"
  }
}

resource "aws_lambda_function" "og_image" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "schulbeginn-og-image"
  role             = aws_iam_role.lambda_execution.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "nodejs20.x"
  timeout          = var.lambda_timeout
  memory_size      = var.lambda_memory_size

  environment {
    variables = {
      TARGET_DATE     = var.target_date
      DEFAULT_DETAIL  = var.og_image_detail_level
      SCHOOL_TITLE    = var.school_info.title
      SCHOOL_SUBTITLE = var.school_info.subtitle
      SCHOOL_DATE_STR = var.school_info.date_str
      CACHE_MAX_AGE   = tostring(var.cache_max_age)
    }
  }

  tags = {
    Project = "schulbeginn-countdown"
  }
}
