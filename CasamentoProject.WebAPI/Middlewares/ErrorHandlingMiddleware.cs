using CasamentoProject.Core.Error;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CasamentoProject.WebAPI.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var errorResponse = new ErrorResponse(500, "Ocorreu um erro no servidor", exception.Message);

            switch (exception)
            {
                case ArgumentNullException _:
                    errorResponse.Message = "Argumento nulo encontrado.";
                    errorResponse.StatusCode = 400;
                    context.Response.StatusCode = 400;
                    break;

                case ArgumentException _:
                    errorResponse.Message = "Argumento inválido encontrado.";
                    errorResponse.StatusCode = 400;
                    context.Response.StatusCode = 400;
                    break;

                case ValidationException _:
                    errorResponse.Message = "Erro de validação.";
                    errorResponse.StatusCode = 400;
                    context.Response.StatusCode = 400;
                    break;

                case NotFoundException _:
                    errorResponse.Message = "Erro de busca.";
                    errorResponse.StatusCode = 404;
                    context.Response.StatusCode = 404;
                    break;

                default:
                    break;
            };

            var jsonError = JsonConvert.SerializeObject(errorResponse);
            return context.Response.WriteAsync(jsonError);
        }
    }
}
