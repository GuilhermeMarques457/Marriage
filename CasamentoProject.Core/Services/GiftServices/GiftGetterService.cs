using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GiftDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.GiftContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftServices
{
    public class GiftGetterService : IGiftGetterService
    {
        private readonly IGiftRepository _repository;

        public GiftGetterService(IGiftRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GiftResponse>?> GetAllGifts()
        {
            List<Gift> Gift = await _repository.GetAllGifts();
           

            return Gift.Select(temp => temp.ToGiftResponse()).ToList();
        }

        public async Task<GiftResponse?> GetGiftById(Guid? GiftID)
        {
            if (GiftID == null)
                throw new ArgumentNullException(nameof(GiftID), "Presente não informado");

            Gift? existingGift = await _repository.GetGiftById(GiftID);

            if (existingGift == null)
                throw new NotFoundException(nameof(existingGift), "Presente não encontrado");

            return existingGift.ToGiftResponse();
        }
    }
}
