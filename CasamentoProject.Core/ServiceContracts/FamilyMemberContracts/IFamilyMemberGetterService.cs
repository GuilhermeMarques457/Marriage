using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberContracts
{
    public interface IFamilyMemberGetterService
    {
        Task<FamilyMemberResponse?> GetFamilyMemberById(Guid? FamilyMemberId);
        Task<List<FamilyMemberResponse>?> GetAllFamilyMembers();
    }
}
