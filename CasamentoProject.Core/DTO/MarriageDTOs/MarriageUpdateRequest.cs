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
                Date = Date,
                MoneyRaised = MoneyRaised,
                MoneyExpected = MoneyExpected,
                Neighborhood = Neighborhood,
                Street = Street,
                NumberAddress = NumberAddress,
                CurrentUserId = CurrentUserId,
            };
        }

    }
}
