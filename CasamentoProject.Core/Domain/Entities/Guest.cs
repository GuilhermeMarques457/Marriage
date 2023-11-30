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
        public bool GiftGiven { get; set; }
        public GiftTypeOptions? GiftType { get; set; }
        public ICollection<FamilyMember>? FamilyMembers { get; set; }
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }
    }
}
