using CasamentoProject.Core.DTO.GuestDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GuestContracts
{
    public interface IGuestUpdaterService
    {
        Task<GuestResponse?> UpdateGuest(GuestUpdateRequest Guest);
    }
}
