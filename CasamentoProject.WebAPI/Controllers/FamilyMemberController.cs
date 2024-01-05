
using CasamentoProject.Core.DTO.FamilyMemberDTOs;
using CasamentoProject.Core.ServiceContracts.FamilyMemberContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CasamentoProject.WebAPI.Controllers
{
    public class FamilyMemberController : BaseAPIController
    {
        private IFamilyMemberAdderService _FamilyMemberAdderService;
        private IFamilyMemberDeleterService _FamilyMemberDeleterService;
        private IFamilyMemberUpdaterService _FamilyMemberUpdaterService;
        private IFamilyMemberGetterService _FamilyMemberGetterService;
        public FamilyMemberController(
            IFamilyMemberAdderService FamilyMemberAdderService,
            IFamilyMemberDeleterService FamilyMemberDeleterService,
            IFamilyMemberUpdaterService FamilyMemberUpdaterService,
            IFamilyMemberGetterService FamilyMemberGetterService
        )
        {
            _FamilyMemberAdderService = FamilyMemberAdderService;
            _FamilyMemberDeleterService = FamilyMemberDeleterService;
            _FamilyMemberUpdaterService = FamilyMemberUpdaterService;
            _FamilyMemberGetterService = FamilyMemberGetterService;
        }

        [HttpGet("get-family-members")]
        public async Task<ActionResult<FamilyMemberResponse>> GetFamilyMembers()
        {
            try
            {
                var allFamilyMembers = await _FamilyMemberGetterService.GetAllFamilyMembers();

                return Ok(allFamilyMembers);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("get-family-members/{id:guid}")]
        public async Task<ActionResult<FamilyMemberResponse>> GetFamilyMember([FromRoute] Guid id)
        {
            try
            {
                var foundFamilyMember = await _FamilyMemberGetterService.GetFamilyMemberById(id);

                return Ok(foundFamilyMember);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost("post-family-members")]
        public async Task<ActionResult<FamilyMemberResponse>> PostFamilyMember([FromBody] FamilyMemberAddRequest FamilyMember)
        {
            try
            {
                var addedFamilyMember = await _FamilyMemberAdderService.AddFamilyMember(FamilyMember);

                return Ok(addedFamilyMember);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("put-family-members")]
        public async Task<ActionResult<FamilyMemberResponse>> PutFamilyMember([FromBody] FamilyMemberUpdateRequest FamilyMember)
        {
            try
            {
                var updateFamilyMember = await _FamilyMemberUpdaterService.UpdateFamilyMember(FamilyMember);

                return Ok(updateFamilyMember);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("delete-family-members/{id:guid}")]
        public async Task<ActionResult<FamilyMemberResponse>> DeleteFamilyMember([FromRoute] Guid id)
        {
            try
            {
                var isDeleted = await _FamilyMemberDeleterService.DeleteFamilyMember(id);

                return Ok(isDeleted);
            }
            catch
            {
                throw;
            }
        }
    }
}
