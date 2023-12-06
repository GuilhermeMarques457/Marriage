using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class GiftMoney
    {
        public Guid Id { get; set; }
        public double Quantity { get; set; }
        public bool Confirmed { get; set; }
        public DateTime? MoneyReceivedDate { get; set; }
        public Guid GuestId { get; set; }
        public Guest? Guest { get; set; }
    }
}
