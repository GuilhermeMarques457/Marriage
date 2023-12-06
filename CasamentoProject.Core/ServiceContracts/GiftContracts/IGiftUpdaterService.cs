using CasamentoProject.Core.DTO.GiftDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftContracts
{
    public interface IGiftUpdaterService
    {
        Task<GiftResponse?> UpdateGift(GiftUpdateRequest Gift);
    }
}
