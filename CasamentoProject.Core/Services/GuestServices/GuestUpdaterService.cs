using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.DTO.GuestDTOs;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.GuestContracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GuestServices
{
    public class GuestUpdaterService : IGuestUpdaterService
    {
        private readonly IGuestRepository _repository;

        public GuestUpdaterService(IGuestRepository repository)
        {
            _repository = repository;
        }



        public async Task<GuestResponse?> UpdateGuest(GuestUpdateRequest Guest)
        {
            if (Guest == null)
                throw new ArgumentNullException(nameof(Guest), "Convidado não informado");

            Guest? existingGuest = await _repository.GetGuestById(Guest.Id);

            if (existingGuest == null)
                throw new NotFoundException(nameof(existingGuest), "Convidado não encontrado");

            Guest? updatedGuest = await _repository.UpdateGuest(Guest.ToGuest());

            if (updatedGuest == null)
                throw new ValidationException("Convidado falhou ao ser atualizado");

            return updatedGuest.ToGuestResponse();
        }
    }
}
