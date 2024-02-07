using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.GuestDTOs
{
    public class GuestResponse : GuestAbstraction
    {
        public Guid Id { get; set; }
        public List<FamilyMemberResponse>? FamilyMembers { get; set; }
        public int NumberOfFamilyMembers { get; set; }

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

        public GuestUpdateRequest ToGuestUpdateRequest()
        {
            return new GuestUpdateRequest
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

    public static class GuestExtensions
    {
        public static GuestResponse ToGuestResponse(this Guest Guest)
        {
            return new GuestResponse
            {
                Id = Guest.Id,
                Name = Guest.Name,
                Confirmed = Guest.Confirmed,
                GiftGiven = Guest.GiftGiven,
                GiftMoney = Guest.GiftMoney,
                FamilyMembers = Guest.FamilyMembers != null ? Guest.FamilyMembers.Select(x => x.ToFamilyMemberResponse()).ToList() : null,
                NumberOfFamilyMembers = Guest.FamilyMembers != null ? Guest.FamilyMembers.Count() : 0,
                Gift = Guest.Gift,
                Marriage = Guest.Marriage,
                MarriageId = Guest.MarriageId
            };
        }
    }
}
