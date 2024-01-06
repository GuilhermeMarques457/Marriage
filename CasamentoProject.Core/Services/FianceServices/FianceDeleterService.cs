using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.FianceContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FianceServices
{
    public class FianceDeleterService : IFianceDeleterService
    {
        private readonly IFianceRepository _repository;

        public FianceDeleterService(IFianceRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteFiance(Guid? FianceID)
        {
            if (FianceID == null)
                throw new ArgumentNullException(nameof(FianceID), "Noivo(a) não informado");

            Fiance? existingFiance = await _repository.GetFianceById(FianceID);

            if (existingFiance == null)
                throw new NotFoundException(nameof(existingFiance), "Noivo(a) não encontrado");

            return await _repository.DeleteFiance(FianceID);
        }
    }
}
