
using CasamentoProject.Core.DTO.GiftDTOs;
using CasamentoProject.Core.ServiceContracts.GiftContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasamentoProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
        private IGiftAdderService _GiftAdderService;
        private IGiftDeleterService _GiftDeleterService;
        private IGiftUpdaterService _GiftUpdaterService;
        private IGiftGetterService _GiftGetterService;
        public GiftController(
            IGiftAdderService GiftAdderService,
            IGiftDeleterService GiftDeleterService,
            IGiftUpdaterService GiftUpdaterService,
            IGiftGetterService GiftGetterService
        )
        {
            _GiftAdderService = GiftAdderService;
            _GiftDeleterService = GiftDeleterService;
            _GiftUpdaterService = GiftUpdaterService;
            _GiftGetterService = GiftGetterService;
        }

        [HttpGet("get-gifts")]
        public async Task<ActionResult<GiftResponse>> GetGifts()
        {
            try
            {
                var allGifts = await _GiftGetterService.GetAllGifts();

                return Ok(allGifts);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-gift/{id:guid}")]
        public async Task<ActionResult<GiftResponse>> GetGift([FromRoute] Guid id)
        {
            try
            {
                var foundGift = await _GiftGetterService.GetGiftById(id);

                return Ok(foundGift);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-gift")]
        public async Task<ActionResult<GiftResponse>> PostGift([FromBody] GiftAddRequest Gift)
        {
            try
            {
                var addedGift = await _GiftAdderService.AddGift(Gift);

                return Ok(addedGift);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-gift")]
        public async Task<ActionResult<GiftResponse>> PutGift([FromBody] GiftUpdateRequest Gift)
        {
            try
            {
                var updateGift = await _GiftUpdaterService.UpdateGift(Gift);

                return Ok(updateGift);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-gift/{id:guid}")]
        public async Task<ActionResult<GiftResponse>> DeleteGift([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _GiftDeleterService.DeleteGift(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
