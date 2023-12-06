using CasamentoProject.Core.DTO.GiftMoneyDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftMoneyContracts
{
    public interface IGiftMoneyGetterService
    {
        Task<GiftMoneyResponse?> GetGiftMoneyById(Guid? GiftMoneyId);
        Task<List<GiftMoneyResponse>?> GetAllGiftMoneys();
    }
}
