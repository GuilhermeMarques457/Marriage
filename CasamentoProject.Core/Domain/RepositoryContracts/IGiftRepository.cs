using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IGiftRepository
    {
        Task<Gift?> AddGift(Gift Gift);
        Task<Gift?> UpdateGift(Gift Gift);
        Task<bool> DeleteGift(Guid? GiftID);
        Task<Gift?> GetGiftById(Guid? GiftID);
        Task<List<Gift>> GetAllGifts();
    }
}
