using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IFianceRepository
    {
        Task<Fiance?> AddFiance(Fiance Fiance);
        Task<Fiance?> UpdateFiance(Fiance Fiance);
        Task<bool> DeleteFiance(Guid? FianceID);
        Task<Fiance?> GetFianceById(Guid? FianceID);
        Task<List<Fiance>> GetAllFiances();
    }
}
