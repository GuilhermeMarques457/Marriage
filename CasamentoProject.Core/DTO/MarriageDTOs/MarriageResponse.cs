using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
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
                DateOfMarriage = DateOfMarriage,
                HourOfMarriage = HourOfMarriage,
                MoneyRaised = MoneyRaised,
                MoneyExpected = MoneyExpected,
                Local = Local,
            };
        }

        public MarriageUpdateRequest ToMarriageUpdateRequest()
        {
            return new MarriageUpdateRequest
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

    public static class MarriageExtensions
    {
        public static MarriageResponse ToMarriageResponse(this Marriage Marriage)
        {
            return new MarriageResponse
            {
                Id = Marriage.Id,
                PhotoOfCouplePath = Marriage.PhotoOfCouplePath,
                DateOfMarriage = Marriage.DateOfMarriage,
                HourOfMarriage = Marriage.HourOfMarriage,
                MoneyRaised = Marriage.MoneyRaised,
                MoneyExpected = Marriage.MoneyExpected,
                Local = Marriage.Local,
                Fiances = Marriage.Fiances,
                Gifts = Marriage.Gifts,
                GuestsPlusFamily = Marriage.GuestsPlusFamily,
            };
        }
    }
}
