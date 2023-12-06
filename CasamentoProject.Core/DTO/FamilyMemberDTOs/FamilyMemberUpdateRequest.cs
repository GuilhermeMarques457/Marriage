using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.FamilyMemberDTOs
{
    public class FamilyMemberUpdateRequest : FamilyMemberAbstraction
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

    }
}
