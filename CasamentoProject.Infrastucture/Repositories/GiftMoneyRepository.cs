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
    public class GiftMoneyRepository : IGiftMoneyRepository
    {
        private readonly ApplicationDbContext _context;

        public GiftMoneyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GiftMoney?> AddGiftMoney(GiftMoney GiftMoney)
        {
            await _context.GiftsMoney.AddAsync(GiftMoney);

            await _context.SaveChangesAsync();

            return GiftMoney;
        }

        public async Task<bool> DeleteGiftMoney(Guid? GiftMoneyID)
        {
            GiftMoney? GiftMoney = await GetGiftMoneyById(GiftMoneyID);

            if (GiftMoney == null) return false;

            _context.GiftsMoney.Remove(GiftMoney);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<GiftMoney>> GetAllGiftMoneys()
        {
            return await _context.GiftsMoney.ToListAsync();
        }

        public async Task<GiftMoney?> GetGiftMoneyById(Guid? GiftMoneyID)
        {
            return await _context.GiftsMoney
                .Include(temp => temp.Guest)
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == GiftMoneyID);
        }

        public async Task<GiftMoney?> UpdateGiftMoney(GiftMoney GiftMoney)
        {
            GiftMoney? matchingGiftMoney = await GetGiftMoneyById(GiftMoney.Id);

            if (matchingGiftMoney == null) return matchingGiftMoney;

            matchingGiftMoney.MoneyReceivedDate = GiftMoney.MoneyReceivedDate;
            matchingGiftMoney.Quantity = GiftMoney.Quantity;
            matchingGiftMoney.Confirmed = GiftMoney.Confirmed;
            matchingGiftMoney.GuestId = GiftMoney.GuestId;
            matchingGiftMoney.Guest = GiftMoney.Guest;
  

            _context.GiftsMoney.Update(matchingGiftMoney);

            await _context.SaveChangesAsync();

            return matchingGiftMoney;
        }
    }
}
