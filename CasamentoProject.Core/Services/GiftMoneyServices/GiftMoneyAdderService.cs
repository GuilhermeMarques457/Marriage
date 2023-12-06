using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftMoneyDTOs;
using CasamentoProject.Core.ServiceContracts.GiftMoneyContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftMoneyServices
{
    public class GiftMoneyAdderService : IGiftMoneyAdderService
    {
        private readonly IGiftMoneyRepository _repository;

        public GiftMoneyAdderService(IGiftMoneyRepository repository)
        {
            _repository = repository;
        }

        public async Task<GiftMoneyResponse?> AddGiftMoney(GiftMoneyAddRequest GiftMoneyRequest)
        {
            if (GiftMoneyRequest == null)
                throw new ArgumentNullException(nameof(GiftMoneyRequest), "Dinheiro presenteado não informado");

            GiftMoney GiftMoney = GiftMoneyRequest.ToGiftMoney();
            GiftMoney.Id = Guid.NewGuid();

            await _repository.AddGiftMoney(GiftMoney);

            return GiftMoney.ToGiftMoneyResponse();

        }
    }
}
