using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Domain.RepositoryContracts
{
    public interface IMarriageRepository
    {
        Task<Marriage?> AddMarriage(Marriage Marriage);
        Task<Marriage?> UpdateMarriage(Marriage Marriage);
        Task<bool> DeleteMarriage(Guid? MarriageID);
        Task<Marriage?> GetMarriageById(Guid? MarriageID);
        Task<Marriage?> GetMarriageByUserId(Guid? UserID);
        Task<List<Marriage>> GetAllMarriages();
    }
}
