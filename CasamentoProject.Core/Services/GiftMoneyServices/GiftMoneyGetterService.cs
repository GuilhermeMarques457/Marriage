using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftMoneyDTOs;
using CasamentoProject.Core.ServiceContracts.GiftMoneyContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftMoneyServices
{
    public class GiftMoneyGetterService : IGiftMoneyGetterService
    {
        private readonly IGiftMoneyRepository _repository;

        public GiftMoneyGetterService(IGiftMoneyRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GiftMoneyResponse>?> GetAllGiftMoneys()
        {
            List<GiftMoney> GiftMoney = await _repository.GetAllGiftMoneys();
           

            return GiftMoney.Select(temp => temp.ToGiftMoneyResponse()).ToList();
        }

        public async Task<GiftMoneyResponse?> GetGiftMoneyById(Guid? GiftMoneyID)
        {
            if (GiftMoneyID == null)
                throw new ArgumentNullException(nameof(GiftMoneyID), "Dinheiro presenteado não informado");

            GiftMoney? existingGiftMoney = await _repository.GetGiftMoneyById(GiftMoneyID);

            if (existingGiftMoney == null)
                throw new NotFoundException(nameof(existingGiftMoney), "Dinheiro presenteado não encontrado");

            return existingGiftMoney.ToGiftMoneyResponse();
        }
    }
}
