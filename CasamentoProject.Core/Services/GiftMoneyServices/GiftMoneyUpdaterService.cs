using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftMoneyDTOs;
using CasamentoProject.Core.ServiceContracts.GiftMoneyContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftMoneyServices
{
    public class GiftMoneyUpdaterService : IGiftMoneyUpdaterService
    {
        private readonly IGiftMoneyRepository _repository;

        public GiftMoneyUpdaterService(IGiftMoneyRepository repository)
        {
            _repository = repository;
        }



        public async Task<GiftMoneyResponse?> UpdateGiftMoney(GiftMoneyUpdateRequest GiftMoney)
        {
            if (GiftMoney == null)
                throw new ArgumentNullException(nameof(GiftMoney), "Dinheiro presenteado não informado");

            GiftMoney? existingGiftMoney = await _repository.GetGiftMoneyById(GiftMoney.Id);

            if (existingGiftMoney == null)
                throw new NotFoundException(nameof(existingGiftMoney), "Dinheiro presenteado não encontrado");

            GiftMoney? updatedGiftMoney = await _repository.UpdateGiftMoney(GiftMoney.ToGiftMoney());

            if (updatedGiftMoney == null)
                throw new ValidationException("Dinheiro presenteado falhou ao ser atualizado");

            return updatedGiftMoney.ToGiftMoneyResponse();
        }
    }
}
