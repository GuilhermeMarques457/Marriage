using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberContracts
{
    public interface IFamilyMemberDeleterService
    {
        Task<bool> DeleteFamilyMember(Guid? FamilyMemberId);
    }
}
