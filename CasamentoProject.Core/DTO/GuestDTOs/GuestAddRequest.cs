using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GuestDTOs
{
    public class GuestAddRequest : GuestAbstraction
    {
        public List<string>? FamilyMembers { get; set; }
    }
}
