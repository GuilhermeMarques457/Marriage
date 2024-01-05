
using CasamentoProject.Core.DTO.MarriageDTOs;
using CasamentoProject.Core.Identity;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;

namespace CasamentoProject.WebAPI.Controllers
{
    public class MarriageController : BaseAPIController
    {
        private IMarriageAdderService _marriageAdderService;
        private IMarriageDeleterService _marriageDeleterService;
        private IMarriageUpdaterService _marriageUpdaterService;
        private IMarriageGetterService _marriageGetterService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MarriageController(IMarriageAdderService marriageAdderService, IMarriageDeleterService marriageDeleterService, IMarriageUpdaterService marriageUpdaterService, IMarriageGetterService marriageGetterService, UserManager<ApplicationUser> userManager)
        {
            _marriageAdderService = marriageAdderService;
            _marriageDeleterService = marriageDeleterService;
            _marriageUpdaterService = marriageUpdaterService;
            _marriageGetterService = marriageGetterService;
            _userManager = userManager;
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
            try
            {
                var isAuthenticatedAfterSignIn = User.Identity!.IsAuthenticated;

                ApplicationUser? currentUser = new ApplicationUser();

                if (User.Identity.IsAuthenticated == false)
                    return Unauthorized();

                var userName = User.Identity.Name;

                if (userName != null)
                {
                    currentUser = await _userManager.FindByNameAsync(userName);
                    marriage.CurrentUserId = currentUser!.Id;
                }

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
