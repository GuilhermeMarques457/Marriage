using CasamentoProject.Core.Domain.Entities;
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
        public DateTime? DateOfMarriage { get; set; } = null!;
        public TimeSpan? HourOfMarriage { get; set; } = null!;
        public double? MoneyRaised { get; set; }
        public double? MoneyExpected { get; set; }
        public string Local { get; set; } = null!;
        public Guid? CurrentUserId { get; set; }
        public ICollection<Fiance>? Fiances { get; set; }
        public ICollection<Gift>? Gifts { get; set; }
        public ICollection<Guest>? GuestsPlusFamily { get; set; }

        public virtual Marriage ToMarriage()
        {
            return new Marriage()
            {
                PhotoOfCouplePath = PhotoOfCouplePath,
                DateOfMarriage = DateOfMarriage,
                HourOfMarriage = HourOfMarriage,
                MoneyRaised = MoneyRaised,
                MoneyExpected = MoneyExpected,
                Local = Local,
                CurrentUserId = CurrentUserId,
            };
        }
    }
}
