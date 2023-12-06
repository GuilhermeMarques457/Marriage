using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IFamilyMemberRepository
    {
        Task<FamilyMember?> AddFamilyMember(FamilyMember FamilyMember);
        Task<FamilyMember?> UpdateFamilyMember(FamilyMember FamilyMember);
        Task<bool> DeleteFamilyMember(Guid? FamilyMemberID);
        Task<FamilyMember?> GetFamilyMemberById(Guid? FamilyMemberID);
        Task<List<FamilyMember>> GetAllFamilyMembers();
    }
}
