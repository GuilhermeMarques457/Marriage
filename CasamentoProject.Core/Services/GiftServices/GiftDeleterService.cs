using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.ServiceContracts.GiftContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftServices
{
    public class GiftDeleterService : IGiftDeleterService
    {
        private readonly IGiftRepository _repository;

        public GiftDeleterService(IGiftRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteGift(Guid? GiftID)
        {
            if (GiftID == null)
                throw new ArgumentNullException(nameof(GiftID), "Presente não informado");

            Gift? existingGift = await _repository.GetGiftById(GiftID);

            if (existingGift == null)
                throw new NotFoundException(nameof(existingGift), "Presente não encontrado");

            return await _repository.DeleteGift(GiftID);
        }
    }
}
