using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GiftMoneyDTOs
{
    public class GiftMoneyUpdateRequest : GiftMoneyAbstraction
    {
        public Guid Id { get; set; }

        public override GiftMoney ToGiftMoney()
        {
            return new GiftMoney()
            {
                Id = Id,
                Quantity = Quantity,
                Confirmed = Confirmed,
                MoneyReceivedDate = MoneyReceivedDate,
                GuestId = GuestId,
                Guest = Guest,
            };
        }

    }
}
