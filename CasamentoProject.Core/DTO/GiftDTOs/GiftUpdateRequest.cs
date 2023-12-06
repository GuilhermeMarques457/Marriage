using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GiftDTOs
{
    public class GiftUpdateRequest : GiftAbstraction
    {
        public Guid Id { get; set; }

        public override Gift ToGift()
        {
            return new Gift()
            {
                Id = Id,
                Name = Name,
                Description = Description,
                PhotoPath = PhotoPath,
                Recieved = Recieved,
                GiftUrl = GiftUrl,
                GuestId = GuestId,
                Guest = Guest,
                Price = Price
            };
        }

    }
}
