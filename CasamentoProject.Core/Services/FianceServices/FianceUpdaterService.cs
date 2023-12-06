using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FianceDTOs;
using CasamentoProject.Core.ServiceContracts.FianceContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FianceServices
{
    public class FianceUpdaterService : IFianceUpdaterService
    {
        private readonly IFianceRepository _repository;

        public FianceUpdaterService(IFianceRepository repository)
        {
            _repository = repository;
        }



        public async Task<FianceResponse?> UpdateFiance(FianceUpdateRequest Fiance)
        {
            if (Fiance == null)
                throw new ArgumentNullException(nameof(Fiance), "Noivo(a) não informado");

            Fiance? existingFiance = await _repository.GetFianceById(Fiance.Id);

            if (existingFiance == null)
                throw new NotFoundException(nameof(existingFiance), "Noivo(a) não encontrado");

            Fiance? updatedFiance = await _repository.UpdateFiance(Fiance.ToFiance());

            if (updatedFiance == null)
                throw new ValidationException("Noivo(a) falhou ao ser atualizado");

            return updatedFiance.ToFianceResponse();
        }
    }
}
