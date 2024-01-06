using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberServices
{
    public class FamilyMemberDeleterService : IFamilyMemberDeleterService
    {
        private readonly IFamilyMemberRepository _repository;

        public FamilyMemberDeleterService(IFamilyMemberRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteFamilyMember(Guid? FamilyMemberID)
        {
            if (FamilyMemberID == null)
                throw new ArgumentNullException(nameof(FamilyMemberID), "Membro da Família não informado");

            FamilyMember? existingFamilyMember = await _repository.GetFamilyMemberById(FamilyMemberID);

            if (existingFamilyMember == null)
                throw new NotFoundException(nameof(existingFamilyMember), "Membro da Família não encontrado");

            return await _repository.DeleteFamilyMember(FamilyMemberID);
        }
    }
}
