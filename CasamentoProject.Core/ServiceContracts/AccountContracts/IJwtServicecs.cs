using CasamentoProject.Core.DTO.AccountDTOs;
using CasamentoProject.Core.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.AccountContracts
{
    public interface IJwtService
    {
        ResponseUser CreateJwtToken(ApplicationUser user);
        ClaimsPrincipal? GetPrincipalFromJwtToken(string? token);
    }
}
