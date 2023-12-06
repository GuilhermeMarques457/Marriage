using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Infrastucture.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Infrastucture.Repositories
{
    public class FianceRepository : IFianceRepository
    {
        private readonly ApplicationDbContext _context;

        public FianceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Fiance?> AddFiance(Fiance Fiance)
        {
            await _context.Fiances.AddAsync(Fiance);

            await _context.SaveChangesAsync();

            return Fiance;
        }

        public async Task<bool> DeleteFiance(Guid? FianceID)
        {
            Fiance? Fiance = await GetFianceById(FianceID);

            if (Fiance == null) return false;

            _context.Fiances.Remove(Fiance);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<Fiance>> GetAllFiances()
        {
            return await _context.Fiances.ToListAsync();
        }

        public async Task<Fiance?> GetFianceById(Guid? FianceID)
        {
            return await _context.Fiances
                .Include(f => f.Marriage)
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == FianceID);
        }

        public async Task<Fiance?> UpdateFiance(Fiance Fiance)
        {
            Fiance? matchingFiance = await GetFianceById(Fiance.Id);

            if (matchingFiance == null) return matchingFiance;

            matchingFiance.PhotoPath = Fiance.PhotoPath;
            matchingFiance.Marriage = Fiance.Marriage;
            matchingFiance.MarriageId = Fiance.MarriageId;
            matchingFiance.Age = Fiance.Age;
            matchingFiance.Name = Fiance.Name;

            _context.Fiances.Update(matchingFiance);

            await _context.SaveChangesAsync();

            return matchingFiance;
        }
    }
}
