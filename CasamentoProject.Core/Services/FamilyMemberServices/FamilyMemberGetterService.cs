using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
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

        public async Task<List<FamilyMemberResponse>?> GetFamilyMembersByGuestId(Guid? GuestId)
        {
            if (GuestId == null)
                throw new ArgumentNullException(nameof(GuestId), "Convidado não informado");

            List<FamilyMember> FamilyMembers = await _repository.GetFamilyMembersGusetById(GuestId);

            if(FamilyMembers.Count() == 0)
                return null;

            return FamilyMembers.Select(temp => temp.ToFamilyMemberResponse()).ToList();
        }
    }
}
