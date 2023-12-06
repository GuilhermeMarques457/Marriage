using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.FianceDTOs
{
    public class FianceResponse : FianceAbstraction
    {
        public Guid Id { get; set; }

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

        public FianceUpdateRequest ToFianceUpdateRequest()
        {
            return new FianceUpdateRequest
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

    public static class FianceExtensions
    {
        public static FianceResponse ToFianceResponse(this Fiance Fiance)
        {
            return new FianceResponse
            {
                Id = Fiance.Id,
                Name = Fiance.Name,
                Age = Fiance.Age,
                PhotoPath = Fiance.PhotoPath,
                Marriage = Fiance.Marriage,
                MarriageId = Fiance.MarriageId
            };
        }
    }
}
