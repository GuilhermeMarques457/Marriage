using CasamentoProject.Core.Utils;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;

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

            var errorResponse = new ErrorResponse
            {
                Message = "Ocorreu um erro no servidor.",
                Details = exception.Message,
                StatusCode = HttpStatusCode.InternalServerError
            };

            switch (exception)
            {
                case ArgumentNullException _:
                    errorResponse.Message = "Argumento nulo encontrado.";
                    errorResponse.StatusCode = HttpStatusCode.BadRequest;
                    context.Response.StatusCode = 400;
                    break;

                case ArgumentException _:
                    errorResponse.Message = "Argumento inválido encontrado.";
                    errorResponse.StatusCode = HttpStatusCode.BadRequest;
                    context.Response.StatusCode = 400;
                    break;

                case ValidationException _:
                    errorResponse.Message = "Erro de validação.";
                    errorResponse.StatusCode = HttpStatusCode.BadRequest;
                    context.Response.StatusCode = 400;
                    break;

                case NotFoundException _:
                    errorResponse.Message = "Erro de busca.";
                    errorResponse.StatusCode = HttpStatusCode.NotFound;
                    context.Response.StatusCode = 404;
                    break;

                default:
                    break;
            }

            var jsonError = JsonConvert.SerializeObject(errorResponse);
            return context.Response.WriteAsync(jsonError);
        }
    }
}
