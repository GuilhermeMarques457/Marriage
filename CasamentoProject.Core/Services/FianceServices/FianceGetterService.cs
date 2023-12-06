using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.FianceDTOs;
using CasamentoProject.Core.ServiceContracts.FianceContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FianceServices
{
    public class FianceGetterService : IFianceGetterService
    {
        private readonly IFianceRepository _repository;

        public FianceGetterService(IFianceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<FianceResponse>?> GetAllFiances()
        {
            List<Fiance> Fiance = await _repository.GetAllFiances();
           

            return Fiance.Select(temp => temp.ToFianceResponse()).ToList();
        }

        public async Task<FianceResponse?> GetFianceById(Guid? FianceID)
        {
            if (FianceID == null)
                throw new ArgumentNullException(nameof(FianceID), "Noivo(a) não informado");

            Fiance? existingFiance = await _repository.GetFianceById(FianceID);

            if (existingFiance == null)
                throw new NotFoundException(nameof(existingFiance), "Noivo(a) não encontrado");

            return existingFiance.ToFianceResponse();
        }
    }
}
