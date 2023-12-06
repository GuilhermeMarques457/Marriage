using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberServices
{
    public class FamilyMemberAdderService : IFamilyMemberAdderService
    {
        private readonly IFamilyMemberRepository _repository;

        public FamilyMemberAdderService(IFamilyMemberRepository repository)
        {
            _repository = repository;
        }

        public async Task<FamilyMemberResponse?> AddFamilyMember(FamilyMemberAddRequest FamilyMemberRequest)
        {
            if (FamilyMemberRequest == null)
                throw new ArgumentNullException(nameof(FamilyMemberRequest), "Membro da Família não informado");

            FamilyMember FamilyMember = FamilyMemberRequest.ToFamilyMember();
            FamilyMember.Id = Guid.NewGuid();

            await _repository.AddFamilyMember(FamilyMember);

            return FamilyMember.ToFamilyMemberResponse();

        }
    }
}
