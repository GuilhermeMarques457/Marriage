using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GuestDTOs
{
    public class GuestUpdateRequest : GuestAbstraction
    {
        public Guid Id { get; set; }

        public override Guest ToGuest()
        {
            return new Guest()
            {
                Id = Id,
                Name = Name,
                Confirmed = Confirmed,
                GiftGiven = GiftGiven,
                GiftMoney = GiftMoney,
                Gift = Gift,
                Marriage = Marriage,
                MarriageId = MarriageId
            };
        }

    }
}
