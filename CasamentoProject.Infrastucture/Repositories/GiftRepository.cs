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
    public class GiftRepository : IGiftRepository
    {
        private readonly ApplicationDbContext _context;

        public GiftRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Gift?> AddGift(Gift Gift)
        {
            await _context.Gifts.AddAsync(Gift);

            await _context.SaveChangesAsync();

            return Gift;
        }

        public async Task<bool> DeleteGift(Guid? GiftID)
        {
            Gift? Gift = await GetGiftById(GiftID);

            if (Gift == null) return false;

            _context.Gifts.Remove(Gift);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<Gift>> GetAllGifts()
        {
            return await _context.Gifts.ToListAsync();
        }

        public async Task<Gift?> GetGiftById(Guid? GiftID)
        {
            return await _context.Gifts
                .Include(temp => temp.Guest)
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == GiftID);
        }

        public async Task<Gift?> UpdateGift(Gift Gift)
        {
            Gift? matchingGift = await GetGiftById(Gift.Id);

            if (matchingGift == null) return matchingGift;

            matchingGift.PhotoPath = Gift.PhotoPath;
            matchingGift.GiftUrl = Gift.GiftUrl;
            matchingGift.Price = Gift.Price;
            matchingGift.Recieved = Gift.Recieved;
            matchingGift.Description = Gift.Description;
            matchingGift.Guest = Gift.Guest;
            matchingGift.GuestId = Gift.GuestId;
            matchingGift.Name = Gift.Name;

            _context.Gifts.Update(matchingGift);

            await _context.SaveChangesAsync();

            return matchingGift;
        }
    }
}
