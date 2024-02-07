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
    public class GuestRepository : IGuestRepository
    {
        private readonly ApplicationDbContext _context;

        public GuestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guest?> AddGuest(Guest Guest)
        {
            await _context.Guests.AddAsync(Guest);

            await _context.SaveChangesAsync();

            return Guest;
        }

        public async Task<bool> DeleteGuest(Guid? GuestID)
        {
            Guest? Guest = await GetGuestById(GuestID);

            if (Guest == null) return false;

            _context.Guests.Remove(Guest);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<Guest>> GetAllGuests()
        {
            return await _context.Guests.ToListAsync();
        }

        public async Task<Guest?> GetGuestById(Guid? GuestID)
        {
            return await _context.Guests
                .Include(temp => temp.FamilyMembers)
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == GuestID);
        }

        public async Task<List<Guest>> GetGuestsByMarriageId(Guid? MarriageID)
        {
            return await _context.Guests
                .AsNoTracking()
                .Include(temp => temp.FamilyMembers)
                .Where(temp => temp.MarriageId == MarriageID)
                .ToListAsync();
        }

        public async Task<Guest?> UpdateGuest(Guest Guest)
        {
            Guest? matchingGuest = await GetGuestById(Guest.Id);

            if (matchingGuest == null) return matchingGuest;

            matchingGuest.GiftGiven = Guest.GiftGiven;
            matchingGuest.GiftMoney = Guest.GiftMoney;
            matchingGuest.Gift = Guest.Gift;
            matchingGuest.Marriage = Guest.Marriage;
            matchingGuest.Name = Guest.Name;
            matchingGuest.FamilyMembers = Guest.FamilyMembers;
            matchingGuest.MarriageId = Guest.MarriageId;
            matchingGuest.Confirmed = Guest.Confirmed;

            _context.Guests.Update(matchingGuest);

            await _context.SaveChangesAsync();

            return matchingGuest;
        }
    }
}
