using CasamentoProject.Core.DTO.FianceDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.ServiceContracts.FianceContracts
{
    public interface IFianceGetterService
    {
        Task<FianceResponse?> GetFianceById(Guid? FianceId);
        Task<List<FianceResponse>?> GetAllFiances();
    }
}
