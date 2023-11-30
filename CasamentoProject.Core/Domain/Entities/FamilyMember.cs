using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class FamilyMember
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid GuestId { get; set; }
        public Guest Guest { get; set; } = null!;
    }
}
