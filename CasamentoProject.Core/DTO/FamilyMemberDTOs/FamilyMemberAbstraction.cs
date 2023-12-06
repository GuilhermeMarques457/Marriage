using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.FamilyMemberDTOs
{
    public abstract class FamilyMemberAbstraction
    {
        public string Name { get; set; } = null!;
        public Guid GuestId { get; set; }
        public Guest Guest { get; set; } = null!;

        public virtual FamilyMember ToFamilyMember()
        {
            return new FamilyMember()
            {
                Name = Name, 
                GuestId = GuestId,
                Guest = Guest,
            };
        }
    }
}
