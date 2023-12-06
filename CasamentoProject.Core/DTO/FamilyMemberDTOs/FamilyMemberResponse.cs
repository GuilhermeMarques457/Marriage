using CasamentoProject.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CasamentoProject.Core.DTO.FamilyMemberDTOs
{
    public class FamilyMemberResponse : FamilyMemberAbstraction
    {
        public Guid Id { get; set; }

        public override FamilyMember ToFamilyMember()
        {
            return new FamilyMember()
            {
                Id = Id,
                Name = Name,
                GuestId = GuestId,
                Guest = Guest,
            };
        }

        public FamilyMemberUpdateRequest ToFamilyMemberUpdateRequest()
        {
            return new FamilyMemberUpdateRequest
            {
                Id = Id,
                Name = Name,
                GuestId = GuestId,
                Guest = Guest,
            };
        }

    }

    public static class FamilyMemberExtensions
    {
        public static FamilyMemberResponse ToFamilyMemberResponse(this FamilyMember FamilyMember)
        {
            return new FamilyMemberResponse
            {
                Id = FamilyMember.Id,
                Name = FamilyMember.Name,
                GuestId = FamilyMember.GuestId,
                Guest = FamilyMember.Guest,
            };
        }
    }
}
