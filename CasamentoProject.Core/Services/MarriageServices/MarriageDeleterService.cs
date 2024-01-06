using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageServices
{
    public class MarriageDeleterService : IMarriageDeleterService
    {
        private readonly IMarriageRepository _repository;

        public MarriageDeleterService(IMarriageRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteMarriage(Guid? MarriageID)
        {
            if (MarriageID == null)
                throw new ArgumentNullException(nameof(MarriageID), "Casamento não informado");

            Marriage? existingMarriage = await _repository.GetMarriageById(MarriageID);

            if (existingMarriage == null)
                throw new NotFoundException(nameof(existingMarriage), "Casamento não encontrado");

            return await _repository.DeleteMarriage(MarriageID);
        }
    }
}
