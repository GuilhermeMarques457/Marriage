using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.GiftDTOs
{
    public class GiftResponse : GiftAbstraction
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

        public GiftUpdateRequest ToGiftUpdateRequest()
        {
            return new GiftUpdateRequest
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

    public static class GiftExtensions
    {
        public static GiftResponse ToGiftResponse(this Gift Gift)
        {
            return new GiftResponse
            {
                Id = Gift.Id,
                Name = Gift.Name,
                Description = Gift.Description,
                PhotoPath = Gift.PhotoPath,
                Recieved = Gift.Recieved,
                GiftUrl = Gift.GiftUrl,
                GuestId = Gift.GuestId,
                Guest = Gift.Guest,
                Price = Gift.Price
            };
        }
    }
}
