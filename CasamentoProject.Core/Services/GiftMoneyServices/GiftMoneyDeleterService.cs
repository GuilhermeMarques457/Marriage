using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.GiftMoneyContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftMoneyServices
{
    public class GiftMoneyDeleterService : IGiftMoneyDeleterService
    {
        private readonly IGiftMoneyRepository _repository;

        public GiftMoneyDeleterService(IGiftMoneyRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteGiftMoney(Guid? GiftMoneyID)
        {
            if (GiftMoneyID == null)
                throw new ArgumentNullException(nameof(GiftMoneyID), "Dinheiro presenteado não informado");

            GiftMoney? existingGiftMoney = await _repository.GetGiftMoneyById(GiftMoneyID);

            if (existingGiftMoney == null)
                throw new NotFoundException(nameof(existingGiftMoney), "Dinheiro presenteado não encontrado");

            return await _repository.DeleteGiftMoney(GiftMoneyID);
        }
    }
}
