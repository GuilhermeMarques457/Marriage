using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.MarriageDTOs
{
    public class MarriageAddRequest : MarriageAbstraction
    {
        public IFormFile? PhotoOfCouple { get; set; }
    }
}
