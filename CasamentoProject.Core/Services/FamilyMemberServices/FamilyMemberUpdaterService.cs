using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FamilyMemberServices
{
    public class FamilyMemberUpdaterService : IFamilyMemberUpdaterService
    {
        private readonly IFamilyMemberRepository _repository;

        public FamilyMemberUpdaterService(IFamilyMemberRepository repository)
        {
            _repository = repository;
        }



        public async Task<FamilyMemberResponse?> UpdateFamilyMember(FamilyMemberUpdateRequest FamilyMember)
        {
            if (FamilyMember == null)
                throw new ArgumentNullException(nameof(FamilyMember), "Membro da Família não informado");

            FamilyMember? existingFamilyMember = await _repository.GetFamilyMemberById(FamilyMember.Id);

            if (existingFamilyMember == null)
                throw new NotFoundException(nameof(existingFamilyMember), "Membro da Família não encontrado");

            FamilyMember? updatedFamilyMember = await _repository.UpdateFamilyMember(FamilyMember.ToFamilyMember());

            if (updatedFamilyMember == null)
                throw new ValidationException("Membro da Família falhou ao ser atualizado");

            return updatedFamilyMember.ToFamilyMemberResponse();
        }
    }
}
