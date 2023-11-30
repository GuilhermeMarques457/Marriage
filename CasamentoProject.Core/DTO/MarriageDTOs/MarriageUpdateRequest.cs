using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.MarriageDTOs
{
    public class MarriageUpdateRequest : MarriageAbstraction
    {
        public Guid Id { get; set; }

        public override Marriage ToMarriage()
        {
            return new Marriage()
            {
                Id = Id,
                PhotoOfCouplePath = PhotoOfCouplePath,
                DateOfMarriage = DateOfMarriage,
                HourOfMarriage = HourOfMarriage,
                MoneyRaised = MoneyRaised,
                MoneyExpected = MoneyExpected,
                Local = Local,
            };
        }

    }
}
