using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.Entities
{
    public class Gift
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Price { get; set; }
        public bool Recieved { get; set; } = false;
        public string PhotoPath { get; set; } = null!;
        public string GiftUrl { get; set; } = null!;
        public Guid MarriageId { get; set; }
        public Marriage? Marriage { get; set; }
    }
}
