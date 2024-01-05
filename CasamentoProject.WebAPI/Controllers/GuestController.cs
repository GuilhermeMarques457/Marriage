
using CasamentoProject.Core.DTO.GuestDTOs;
using CasamentoProject.Core.ServiceContracts.GuestContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasamentoProject.WebAPI.Controllers
{
    public class GuestController : BaseAPIController
    {
        private IGuestAdderService _GuestAdderService;
        private IGuestDeleterService _GuestDeleterService;
        private IGuestUpdaterService _GuestUpdaterService;
        private IGuestGetterService _GuestGetterService;
        public GuestController(
            IGuestAdderService GuestAdderService,
            IGuestDeleterService GuestDeleterService,
            IGuestUpdaterService GuestUpdaterService,
            IGuestGetterService GuestGetterService
        )
        {
            _GuestAdderService = GuestAdderService;
            _GuestDeleterService = GuestDeleterService;
            _GuestUpdaterService = GuestUpdaterService;
            _GuestGetterService = GuestGetterService;
        }

        [HttpGet("get-guests")]
        public async Task<ActionResult<GuestResponse>> GetGuests()
        {
            try
            {
                var allGuests = await _GuestGetterService.GetAllGuests();

                return Ok(allGuests);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-guest/{id:guid}")]
        public async Task<ActionResult<GuestResponse>> GetGuest([FromRoute] Guid id)
        {
            try
            {
                var foundGuest = await _GuestGetterService.GetGuestById(id);

                return Ok(foundGuest);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-guest")]
        public async Task<ActionResult<GuestResponse>> PostGuest([FromBody] GuestAddRequest Guest)
        {
            try
            {
                var addedGuest = await _GuestAdderService.AddGuest(Guest);

                return Ok(addedGuest);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-guest")]
        public async Task<ActionResult<GuestResponse>> PutGuest([FromBody] GuestUpdateRequest Guest)
        {
            try
            {
                var updateGuest = await _GuestUpdaterService.UpdateGuest(Guest);

                return Ok(updateGuest);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-guest/{id:guid}")]
        public async Task<ActionResult<GuestResponse>> DeleteGuest([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _GuestDeleterService.DeleteGuest(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
