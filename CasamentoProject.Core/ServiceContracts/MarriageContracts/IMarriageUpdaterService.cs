using CasamentoProject.Core.DTO.MarriageDTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageContracts
{
    public interface IMarriageUpdaterService
    {
        Task<MarriageResponse?> UpdateMarriage(MarriageUpdateRequest Marriage);
        Task<MarriageResponse> AddImageMarriage(Guid? marriageID, IFormFile? formFile, string? imagePathFolder);
    }
}
