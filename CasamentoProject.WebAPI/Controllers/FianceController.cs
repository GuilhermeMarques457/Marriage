
using CasamentoProject.Core.DTO.FianceDTOs;
using CasamentoProject.Core.ServiceContracts.FianceContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasamentoProject.WebAPI.Controllers
{
    public class FianceController : BaseAPIController
    {
        private IFianceAdderService _FianceAdderService;
        private IFianceDeleterService _FianceDeleterService;
        private IFianceUpdaterService _FianceUpdaterService;
        private IFianceGetterService _FianceGetterService;
        public FianceController(
            IFianceAdderService FianceAdderService,
            IFianceDeleterService FianceDeleterService,
            IFianceUpdaterService FianceUpdaterService,
            IFianceGetterService FianceGetterService
        )
        {
            _FianceAdderService = FianceAdderService;
            _FianceDeleterService = FianceDeleterService;
            _FianceUpdaterService = FianceUpdaterService;
            _FianceGetterService = FianceGetterService;
        }

        [HttpGet("get-fiances")]
        public async Task<ActionResult<FianceResponse>> GetFiances()
        {
            try
            {
                var allFiances = await _FianceGetterService.GetAllFiances();

                return Ok(allFiances);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-fiance/{id:guid}")]
        public async Task<ActionResult<FianceResponse>> GetFiance([FromRoute] Guid id)
        {
            try
            {
                var foundFiance = await _FianceGetterService.GetFianceById(id);

                return Ok(foundFiance);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-fiance")]
        public async Task<ActionResult<FianceResponse>> PostFiance([FromBody] FianceAddRequest Fiance)
        {
            try
            {
                var addedFiance = await _FianceAdderService.AddFiance(Fiance);

                return Ok(addedFiance);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-fiance")]
        public async Task<ActionResult<FianceResponse>> PutFiance([FromBody] FianceUpdateRequest Fiance)
        {
            try
            {
                var updateFiance = await _FianceUpdaterService.UpdateFiance(Fiance);

                return Ok(updateFiance);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-fiance/{id:guid}")]
        public async Task<ActionResult<FianceResponse>> DeleteFiance([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _FianceDeleterService.DeleteFiance(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
