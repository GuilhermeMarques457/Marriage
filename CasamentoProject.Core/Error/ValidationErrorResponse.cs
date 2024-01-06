
using CasamentoProject.Core.Error;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Errors
{
    public class ValidationErrorResponse : ErrorResponse
    {
        public ValidationErrorResponse() : base(400) { }

        public IEnumerable<string>? Errors { get; set; }
    }
}
