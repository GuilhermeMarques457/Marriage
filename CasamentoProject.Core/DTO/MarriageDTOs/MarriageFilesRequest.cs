using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.MarriageDTOs
{
    public class MarriageFilesRequest
    {
        public Guid Id { get; set; }
        public IFormFile? PhotoOfCouple { get; set; }
        public IFormFile? PhotoOfGroom { get; set; }
        public IFormFile? PhotoOfBride { get; set; }
    }
}
