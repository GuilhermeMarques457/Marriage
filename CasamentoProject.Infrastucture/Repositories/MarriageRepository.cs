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
    public class MarriageRepository : IMarriageRepository
    {
        private readonly ApplicationDbContext _context;

        public MarriageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Marriage?> AddMarriage(Marriage Marriage)
        {
            await _context.Marriages.AddAsync(Marriage);

            await _context.SaveChangesAsync();

            return Marriage;
        }

        public async Task<bool> DeleteMarriage(Guid? MarriageID)
        {
            Marriage? Marriage = await GetMarriageById(MarriageID);

            if (Marriage == null) return false;

            _context.Marriages.Remove(Marriage);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<Marriage>> GetAllMarriages()
        {
            return await _context.Marriages.ToListAsync();
        }

        public async Task<Marriage?> GetMarriageById(Guid? MarriageID)
        {
            return await _context.Marriages
                .Include(temp => temp.Gifts)
                .Include(temp => temp.Fiances)
                .Include(temp => temp.GuestsPlusFamily)
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == MarriageID);
        }

        public async Task<Marriage?> UpdateMarriage(Marriage Marriage)
        {
            Marriage? matchingMarriage = await GetMarriageById(Marriage.Id);

            if (matchingMarriage == null) return matchingMarriage;

            matchingMarriage.HourOfMarriage = Marriage.HourOfMarriage;
            matchingMarriage.DateOfMarriage = Marriage.DateOfMarriage;
            matchingMarriage.PhotoOfCouplePath = Marriage.PhotoOfCouplePath;
            matchingMarriage.Local = Marriage.Local;
            matchingMarriage.MoneyExpected = Marriage.MoneyExpected;
            matchingMarriage.MoneyRaised = Marriage.MoneyRaised;

            _context.Marriages.Update(matchingMarriage);

            await _context.SaveChangesAsync();

            return matchingMarriage;
        }
    }
}
