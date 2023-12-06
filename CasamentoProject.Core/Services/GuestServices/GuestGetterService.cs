using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GuestDTOs;
using CasamentoProject.Core.ServiceContracts.GuestContracts;
using CasamentoProject.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GuestServices
{
    public class GuestGetterService : IGuestGetterService
    {
        private readonly IGuestRepository _repository;

        public GuestGetterService(IGuestRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GuestResponse>?> GetAllGuests()
        {
            List<Guest> Guest = await _repository.GetAllGuests();
           

            return Guest.Select(temp => temp.ToGuestResponse()).ToList();
        }

        public async Task<GuestResponse?> GetGuestById(Guid? GuestID)
        {
            if (GuestID == null)
                throw new ArgumentNullException(nameof(GuestID), "Convidado não informado");

            Guest? existingGuest = await _repository.GetGuestById(GuestID);

            if (existingGuest == null)
                throw new NotFoundException(nameof(existingGuest), "Convidado não encontrado");

            return existingGuest.ToGuestResponse();
        }
    }
}
