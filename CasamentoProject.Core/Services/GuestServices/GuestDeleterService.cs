using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Error;
using CasamentoProject.Core.ServiceContracts.GuestContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.GuestServices
{
    public class GuestDeleterService : IGuestDeleterService
    {
        private readonly IGuestRepository _repository;

        public GuestDeleterService(IGuestRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteGuest(Guid? GuestID)
        {
            if (GuestID == null)
                throw new ArgumentNullException(nameof(GuestID), "Convidado não informado");

            Guest? existingGuest = await _repository.GetGuestById(GuestID);

            if (existingGuest == null)
                throw new NotFoundException(nameof(existingGuest), "Convidado não encontrado");

            return await _repository.DeleteGuest(GuestID);
        }
    }
}
