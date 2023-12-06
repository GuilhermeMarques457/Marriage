using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IGuestRepository
    {
        Task<Guest?> AddGuest(Guest Guest);
        Task<Guest?> UpdateGuest(Guest Guest);
        Task<bool> DeleteGuest(Guid? GuestID);
        Task<Guest?> GetGuestById(Guid? GuestID);
        Task<List<Guest>> GetAllGuests();
    }
}
