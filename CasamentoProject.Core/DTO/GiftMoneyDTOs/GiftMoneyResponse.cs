using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.GiftMoneyDTOs
{
    public class GiftMoneyResponse : GiftMoneyAbstraction
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

        public GiftMoneyUpdateRequest ToGiftMoneyUpdateRequest()
        {
            return new GiftMoneyUpdateRequest
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

    public static class GiftMoneyExtensions
    {
        public static GiftMoneyResponse ToGiftMoneyResponse(this GiftMoney GiftMoney)
        {
            return new GiftMoneyResponse
            {
                Id = GiftMoney.Id,
                Quantity = GiftMoney.Quantity,
                Confirmed = GiftMoney.Confirmed,
                MoneyReceivedDate = GiftMoney.MoneyReceivedDate,
                GuestId = GiftMoney.GuestId,
                Guest = GiftMoney.Guest,
            };
        }
    }
}
