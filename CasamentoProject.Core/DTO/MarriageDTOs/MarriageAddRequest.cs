using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.DTO.FianceDTOs;
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
        public string BrideName { get; set; } = null!;
        public string GroomName { get; set; } = null!;
        public string BrideAge { get; set; } = null!;
        public string GroomAge { get; set; } = null!;
    }
}
