using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GiftContracts
{
    public interface IGiftDeleterService
    {
        Task<bool> DeleteGift(Guid? GiftId);
    }
}
