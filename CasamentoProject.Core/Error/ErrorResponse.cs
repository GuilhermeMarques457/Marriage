using System.Net;

namespace CasamentoProject.Core.Error
{
    public class ErrorResponse
    {
        public ErrorResponse(int statusCode, string? message = null, string? details = null)
        {
            Message = message;
            Details = details;
            StatusCode = statusCode;
        }

        public string? Message { get; set; }
        public string? Details { get; set; }
        public int StatusCode { get; set; }

        
    }
}
