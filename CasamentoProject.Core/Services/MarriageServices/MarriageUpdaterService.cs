using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageServices
{
    public class MarriageUpdaterService : IMarriageUpdaterService
    {
        private readonly IMarriageRepository _repository;

        public MarriageUpdaterService(IMarriageRepository repository)
        {
            _repository = repository;
        }



        public async Task<MarriageResponse?> UpdateMarriage(MarriageUpdateRequest Marriage)
        {
            if (Marriage == null)
                throw new ArgumentNullException(nameof(Marriage), "Casamento não informado");

            Marriage? existingMarriage = await _repository.GetMarriageById(Marriage.Id);

            if (existingMarriage == null)
                throw new NotFoundException(nameof(existingMarriage), "Casamento não encontrado");

            Marriage? updatedMarriage = await _repository.UpdateMarriage(Marriage.ToMarriage());

            if (updatedMarriage == null)
                throw new ValidationException("Casamento falhou ao ser atualizado");

            return updatedMarriage.ToMarriageResponse();
        }
    }
}
