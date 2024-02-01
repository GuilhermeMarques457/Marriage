using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;

namespace CasamentoProject.Core.ServiceContracts.MarriageServices
{
    public class MarriageGetterService : IMarriageGetterService
    {
        private readonly IMarriageRepository _repository;

        public MarriageGetterService(IMarriageRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<MarriageResponse>?> GetAllMarriages()
        {
            List<Marriage> marriage = await _repository.GetAllMarriages();
           

            return marriage.Select(temp => temp.ToMarriageResponse()).ToList();
        }

        public async Task<MarriageResponse> GetMarriageById(Guid? MarriageID)
        {
            if (MarriageID == null)
                throw new ArgumentNullException(nameof(MarriageID), "Casamento não informado");

            Marriage? existingMarriage = await _repository.GetMarriageById(MarriageID);

            if (existingMarriage == null)
                throw new NotFoundException(nameof(existingMarriage), "Casamento não encontrado");

            return existingMarriage.ToMarriageResponse();
        }

        public async Task<MarriageResponse> GetMarriageByUserId(Guid? UserId)
        {
            if (UserId == null)
                throw new ArgumentNullException(nameof(UserId), "Usuario não informado");

            Marriage? existingMarriage = await _repository.GetMarriageByUserId(UserId);

            if (existingMarriage == null)
                throw new NotFoundException(nameof(existingMarriage), "Casamento não encontrado");

            return existingMarriage.ToMarriageResponse();
        }
    }
}
