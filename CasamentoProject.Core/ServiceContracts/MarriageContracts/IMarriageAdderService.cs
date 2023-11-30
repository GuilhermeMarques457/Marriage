using CasamentoProject.Core.DTO.MarriageDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.MarriageContracts
{
    public interface IMarriageAdderService
    {
        Task<MarriageResponse?> AddMarriage(MarriageAddRequest Marriage);
    }
}
