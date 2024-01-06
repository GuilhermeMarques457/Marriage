using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.GiftContracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftServices
{
    public class GiftUpdaterService : IGiftUpdaterService
    {
        private readonly IGiftRepository _repository;

        public GiftUpdaterService(IGiftRepository repository)
        {
            _repository = repository;
        }



        public async Task<GiftResponse?> UpdateGift(GiftUpdateRequest Gift)
        {
            if (Gift == null)
                throw new ArgumentNullException(nameof(Gift), "Presente não informado");

            Gift? existingGift = await _repository.GetGiftById(Gift.Id);

            if (existingGift == null)
                throw new NotFoundException(nameof(existingGift), "Presente não encontrado");

            Gift? updatedGift = await _repository.UpdateGift(Gift.ToGift());

            if (updatedGift == null)
                throw new ValidationException("Presente falhou ao ser atualizado");

            return updatedGift.ToGiftResponse();
        }
    }
}
