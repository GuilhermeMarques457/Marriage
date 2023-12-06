using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GiftMoneyDTOs
{
    public abstract class GiftMoneyAbstraction
    {
        public double Quantity { get; set; }
        public bool Confirmed { get; set; }
        public DateTime? MoneyReceivedDate { get; set; }
        public Guid GuestId { get; set; }
        public Guest? Guest { get; set; }

        public virtual GiftMoney ToGiftMoney()
        {
            return new GiftMoney()
            {
                Quantity = Quantity,
                Confirmed = Confirmed,
                MoneyReceivedDate = MoneyReceivedDate,
                GuestId = GuestId,
                Guest = Guest,
            };
        }
    }
}
