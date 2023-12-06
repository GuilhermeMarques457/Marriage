using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftDTOs;
using CasamentoProject.Core.ServiceContracts.GiftContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftServices
{
    public class GiftAdderService : IGiftAdderService
    {
        private readonly IGiftRepository _repository;

        public GiftAdderService(IGiftRepository repository)
        {
            _repository = repository;
        }

        public async Task<GiftResponse?> AddGift(GiftAddRequest GiftRequest)
        {
            if (GiftRequest == null)
                throw new ArgumentNullException(nameof(GiftRequest), "Presente não informado");

            Gift Gift = GiftRequest.ToGift();
            Gift.Id = Guid.NewGuid();

            await _repository.AddGift(Gift);

            return Gift.ToGiftResponse();

        }
    }
}
