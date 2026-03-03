output "api_endpoint" {
  value       = aws_apigatewayv2_api.main.api_endpoint
  description = "API Gateway Endpoint URL"
}

output "og_image_url" {
  value       = "${aws_apigatewayv2_api.main.api_endpoint}/og"
  description = "URL für og:image Meta-Tag (Default)"
}

output "og_image_url_days" {
  value       = "${aws_apigatewayv2_api.main.api_endpoint}/og?detail=days"
  description = "URL für og:image - Nur Tage"
}

output "og_image_url_hours" {
  value       = "${aws_apigatewayv2_api.main.api_endpoint}/og?detail=hours"
  description = "URL für og:image - Tage + Stunden"
}

output "og_image_url_full" {
  value       = "${aws_apigatewayv2_api.main.api_endpoint}/og?detail=full"
  description = "URL für og:image - Vollständig (Default)"
}

output "lambda_function_name" {
  value       = aws_lambda_function.og_image.function_name
  description = "Lambda Funktionsname"
}

output "lambda_function_arn" {
  value       = aws_lambda_function.og_image.arn
  description = "Lambda Funktions ARN"
}
