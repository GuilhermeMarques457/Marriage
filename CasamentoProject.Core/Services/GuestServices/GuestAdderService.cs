using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GuestDTOs;
using CasamentoProject.Core.ServiceContracts.GuestContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GuestServices
{
    public class GuestAdderService : IGuestAdderService
    {
        private readonly IGuestRepository _repository;

        public GuestAdderService(IGuestRepository repository)
        {
            _repository = repository;
        }

        public async Task<GuestResponse?> AddGuest(GuestAddRequest GuestRequest)
        {
            if (GuestRequest == null)
                throw new ArgumentNullException(nameof(GuestRequest), "Convidado não informado");

            Guest Guest = GuestRequest.ToGuest();
            Guest.Id = Guid.NewGuid();

            await _repository.AddGuest(Guest);


            return Guest.ToGuestResponse();

        }
    }
}
