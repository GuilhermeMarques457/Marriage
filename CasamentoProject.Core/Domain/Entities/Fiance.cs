using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class Fiance
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public int? Age { get; set; } = null!;
        public string? PhotoPath { get; set; }
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }
    }
}
