using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.MarriageDTOs
{
    public class MarriageResponse : MarriageAbstraction
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

        public MarriageUpdateRequest ToMarriageUpdateRequest()
        {
            return new MarriageUpdateRequest
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

    public static class MarriageExtensions
    {
        public static MarriageResponse ToMarriageResponse(this Marriage Marriage)
        {
            return new MarriageResponse
            {
                Id = Marriage.Id,
                PhotoOfCouplePath = "images/couple/" + Marriage.PhotoOfCouplePath,
                Date = Marriage.Date,
                MoneyRaised = Marriage.MoneyRaised,
                MoneyExpected = Marriage.MoneyExpected,
                Neighborhood = Marriage.Neighborhood,
                Street = Marriage.Street,
                NumberAddress = Marriage.NumberAddress,
                GuestsPlusFamily = Marriage.GuestsPlusFamily,
            };
        }
    }
}
