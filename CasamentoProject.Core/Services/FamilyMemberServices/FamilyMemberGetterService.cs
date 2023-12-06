using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberServices
{
    public class FamilyMemberGetterService : IFamilyMemberGetterService
    {
        private readonly IFamilyMemberRepository _repository;

        public FamilyMemberGetterService(IFamilyMemberRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<FamilyMemberResponse>?> GetAllFamilyMembers()
        {
            List<FamilyMember> FamilyMember = await _repository.GetAllFamilyMembers();
           

            return FamilyMember.Select(temp => temp.ToFamilyMemberResponse()).ToList();
        }

        public async Task<FamilyMemberResponse?> GetFamilyMemberById(Guid? FamilyMemberID)
        {
            if (FamilyMemberID == null)
                throw new ArgumentNullException(nameof(FamilyMemberID), "Membro da Família não informado");

            FamilyMember? existingFamilyMember = await _repository.GetFamilyMemberById(FamilyMemberID);

            if (existingFamilyMember == null)
                throw new NotFoundException(nameof(existingFamilyMember), "Membro da Família não encontrado");

            return existingFamilyMember.ToFamilyMemberResponse();
        }
    }
}
