using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.FianceDTOs
{
    public class FianceUpdateRequest : FianceAbstraction
    {
        public Guid Id { get; set; }
        public string? PhotoPath { get; set; }
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }

        public override Fiance ToFiance()
        {
            return new Fiance()
            {
                Id = Id,
                Name = Name,
                Age = Age,
                PhotoPath = PhotoPath,
                Marriage = Marriage,
                MarriageId = MarriageId
            };
        }

    }
}
