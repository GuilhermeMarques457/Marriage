using System.Net;

namespace CasamentoProject.Core.Utils
{
    public class ErrorResponse
    {
        public string? Message { get; set; }
        public string? Details { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}
