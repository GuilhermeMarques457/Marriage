using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageServices
{
    public class MarriageAdderService : IMarriageAdderService
    {
        private readonly IMarriageRepository _repository;

        public MarriageAdderService(IMarriageRepository repository)
        {
            _repository = repository;
        }

        public async Task<MarriageResponse?> AddMarriage(MarriageAddRequest MarriageRequest)
        {
            if (MarriageRequest == null)
                throw new ArgumentNullException(nameof(MarriageRequest), "Casamento não informado");

            Marriage marriage = MarriageRequest.ToMarriage();
            marriage.Id = Guid.NewGuid();

            await _repository.AddMarriage(marriage);

            return marriage.ToMarriageResponse();

        }
    }
}
