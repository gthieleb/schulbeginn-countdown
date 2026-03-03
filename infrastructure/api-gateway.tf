resource "aws_apigatewayv2_api" "main" {
  name          = "schulbeginn-og-image-api"
  protocol_type = "HTTP"

  tags = {
    Project = "schulbeginn-countdown"
  }
}

resource "aws_apigatewayv2_stage" "main" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.main.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.og_image.invoke_arn
}

resource "aws_apigatewayv2_route" "og_image" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /og"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.og_image.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}
