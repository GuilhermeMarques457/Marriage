using CasamentoProject.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class Guest
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public bool Confirmed { get; set; }
        public bool GiftGiven { get; set; } = false;
        public ICollection<FamilyMember>? FamilyMembers { get; set; }
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }
        //public Guid? GiftId { get; set; }
        public Gift? Gift { get; set; }
        //public Guid? GiftMoneyId { get; set; }
        public GiftMoney? GiftMoney { get; set; }

        //public Guest()
        //{
        //    GiftGiven = GiftId != null || GiftMoneyId != null;
        //}
    }
}
