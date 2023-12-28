
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;

namespace CasamentoProject.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarriageController : ControllerBase
    {
        private IMarriageAdderService _marriageAdderService;
        private IMarriageDeleterService _marriageDeleterService;
        private IMarriageUpdaterService _marriageUpdaterService;
        private IMarriageGetterService _marriageGetterService;
        public MarriageController(
            IMarriageAdderService marriageAdderService,
            IMarriageDeleterService marriageDeleterService,
            IMarriageUpdaterService marriageUpdaterService,
            IMarriageGetterService marriageGetterService
        )
        {
            _marriageAdderService = marriageAdderService;
            _marriageDeleterService = marriageDeleterService;
            _marriageUpdaterService = marriageUpdaterService;
            _marriageGetterService = marriageGetterService;
        }

        [HttpGet("get-marriages")]
        public async Task<ActionResult<MarriageResponse>> GetMarriages()
        {
            try
            {
                var allMarriages = await _marriageGetterService.GetAllMarriages();

                return Ok(allMarriages);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-marriages2")]
        public async Task<ActionResult<MarriageResponse>> TirarIssoDaquiDepois()
        {
            try
            {
                var allMarriages = await _marriageGetterService.GetAllMarriages();

                return Ok(allMarriages);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-marriage/{id:guid}")]
        public async Task<ActionResult<MarriageResponse>> GetMarriage([FromRoute] Guid id)
        {
            try
            {
                var foundMarriage = await _marriageGetterService.GetMarriageById(id);

                return Ok(foundMarriage);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-marriage")]
        public async Task<ActionResult<MarriageResponse>> PostMarriage([FromBody] MarriageAddRequest marriage)
        {
            var httpContext = HttpContext;
            try
            {
                marriage.CurrentUserId = Guid.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
 
                var addedMarriage = await _marriageAdderService.AddMarriage(marriage);
     
                return Ok(addedMarriage);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-marriage")]
        public async Task<ActionResult<MarriageResponse>> PutMarriage([FromBody] MarriageUpdateRequest marriage)
        {
            try
            {
                var updateMarriage = await _marriageUpdaterService.UpdateMarriage(marriage);

                return Ok(updateMarriage);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-marriage/{id:guid}")]
        public async Task<ActionResult<MarriageResponse>> DeleteMarriage([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _marriageDeleterService.DeleteMarriage(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
