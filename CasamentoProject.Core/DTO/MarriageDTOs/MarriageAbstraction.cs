using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.MarriageDTOs
{
    public abstract class MarriageAbstraction
    {
        public string? PhotoOfCouplePath { get; set; }
        public string? PhotoOfBridePath { get; set; }
        public string? PhotoOfGroomPath { get; set; }
        public DateTime? Date { get; set; } = null!;
        public IFormFile? File { get; set; }
        public double? MoneyRaised { get; set; }
        public double? MoneyExpected { get; set; }
        public string Street { get; set; } = null!;
        public string Neighborhood { get; set; } = null!;
        public string NumberAddress { get; set; } = null!;
        public Guid? CurrentUserId { get; set; }

        public ICollection<Gift>? Gifts { get; set; }
        public ICollection<Guest>? GuestsPlusFamily { get; set; }

        public virtual Marriage ToMarriage()
        {
            return new Marriage()
            {
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
