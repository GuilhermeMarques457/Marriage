
using CasamentoProject.Core.DTO.GiftMoneyDTOs;
using CasamentoProject.Core.ServiceContracts.GiftMoneyContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasamentoProject.WebAPI.Controllers
{
    public class GiftMoneyController : BaseAPIController
    {
        private IGiftMoneyAdderService _GiftMoneyAdderService;
        private IGiftMoneyDeleterService _GiftMoneyDeleterService;
        private IGiftMoneyUpdaterService _GiftMoneyUpdaterService;
        private IGiftMoneyGetterService _GiftMoneyGetterService;
        public GiftMoneyController(
            IGiftMoneyAdderService GiftMoneyAdderService,
            IGiftMoneyDeleterService GiftMoneyDeleterService,
            IGiftMoneyUpdaterService GiftMoneyUpdaterService,
            IGiftMoneyGetterService GiftMoneyGetterService
        )
        {
            _GiftMoneyAdderService = GiftMoneyAdderService;
            _GiftMoneyDeleterService = GiftMoneyDeleterService;
            _GiftMoneyUpdaterService = GiftMoneyUpdaterService;
            _GiftMoneyGetterService = GiftMoneyGetterService;
        }

        [HttpGet("get-GiftMoneys")]
        public async Task<ActionResult<GiftMoneyResponse>> GetGiftMoneys()
        {
            try
            {
                var allGiftMoneys = await _GiftMoneyGetterService.GetAllGiftMoneys();

                return Ok(allGiftMoneys);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-gift-money/{id:guid}")]
        public async Task<ActionResult<GiftMoneyResponse>> GetGiftMoney([FromRoute] Guid id)
        {
            try
            {
                var foundGiftMoney = await _GiftMoneyGetterService.GetGiftMoneyById(id);

                return Ok(foundGiftMoney);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-gift-money")]
        public async Task<ActionResult<GiftMoneyResponse>> PostGiftMoney([FromBody] GiftMoneyAddRequest GiftMoney)
        {
            try
            {
                var addedGiftMoney = await _GiftMoneyAdderService.AddGiftMoney(GiftMoney);

                return Ok(addedGiftMoney);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-gift-money")]
        public async Task<ActionResult<GiftMoneyResponse>> PutGiftMoney([FromBody] GiftMoneyUpdateRequest GiftMoney)
        {
            try
            {
                var updateGiftMoney = await _GiftMoneyUpdaterService.UpdateGiftMoney(GiftMoney);

                return Ok(updateGiftMoney);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-gift-money/{id:guid}")]
        public async Task<ActionResult<GiftMoneyResponse>> DeleteGiftMoney([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _GiftMoneyDeleterService.DeleteGiftMoney(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
