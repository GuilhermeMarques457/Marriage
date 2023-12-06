using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FianceDTOs;
using CasamentoProject.Core.ServiceContracts.FianceContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FianceServices
{
    public class FianceAdderService : IFianceAdderService
    {
        private readonly IFianceRepository _repository;

        public FianceAdderService(IFianceRepository repository)
        {
            _repository = repository;
        }

        public async Task<FianceResponse?> AddFiance(FianceAddRequest FianceRequest)
        {
            if (FianceRequest == null)
                throw new ArgumentNullException(nameof(FianceRequest), "Noivo(a) não informado");

            Fiance Fiance = FianceRequest.ToFiance();
            Fiance.Id = Guid.NewGuid();

            await _repository.AddFiance(Fiance);

            return Fiance.ToFianceResponse();

        }
    }
}
