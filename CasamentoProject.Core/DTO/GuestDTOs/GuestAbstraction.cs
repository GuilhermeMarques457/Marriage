using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GuestDTOs
{
    public abstract class GuestAbstraction
    {
        public string Name { get; set; } = null!;
        public bool Confirmed { get; set; }
        public bool GiftGiven { get; set; } = false;
        public ICollection<FamilyMember>? FamilyMembers { get; set; }
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }
        public Gift? Gift { get; set; }
        public GiftMoney? GiftMoney { get; set; }

        public virtual Guest ToGuest()
        {
            return new Guest()
            {
                Name = Name, 
                Confirmed = Confirmed,
                GiftGiven = GiftGiven,
                FamilyMembers = FamilyMembers,
                GiftMoney = GiftMoney,
                Gift = Gift,Marriage = Marriage,
                MarriageId = MarriageId
            };
        }
    }
}
