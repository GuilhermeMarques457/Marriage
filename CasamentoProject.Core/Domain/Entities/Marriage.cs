using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class Marriage
    {
        public Guid Id { get; set; }
        public string? PhotoOfCouplePath { get; set; }
        public DateTime? DateOfMarriage { get; set; } = null!;
        public TimeSpan? HourOfMarriage { get; set; } = null!;
        public double? MoneyRaised { get; set; }
        public double? MoneyExpected { get; set; }
        public string Local { get; set; } = null!;

        public ICollection<Fiance> Fiances { get; set; } = new List<Fiance>();
        public ICollection<Gift>? Gifts { get; set; }
        public ICollection<Guest>? GuestsPlusFamily { get; set; }
    }
}
