using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IGiftMoneyRepository
    {
        Task<GiftMoney?> AddGiftMoney(GiftMoney GiftMoney);
        Task<GiftMoney?> UpdateGiftMoney(GiftMoney GiftMoney);
        Task<bool> DeleteGiftMoney(Guid? GiftMoneyID);
        Task<GiftMoney?> GetGiftMoneyById(Guid? GiftMoneyID);
        Task<List<GiftMoney>> GetAllGiftMoneys();
    }
}
