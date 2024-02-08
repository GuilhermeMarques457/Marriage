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
    public class FamilyMemberRepository : IFamilyMemberRepository
    {
        private readonly ApplicationDbContext _context;

        public FamilyMemberRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FamilyMember?> AddFamilyMember(FamilyMember FamilyMember)
        {
            await _context.FamilyMembers.AddAsync(FamilyMember);

            await _context.SaveChangesAsync();

            return FamilyMember;
        }

        public async Task<bool> DeleteFamilyMember(Guid? FamilyMemberID)
        {
            FamilyMember? FamilyMember = await GetFamilyMemberById(FamilyMemberID);

            if (FamilyMember == null) return false;

            _context.FamilyMembers.Remove(FamilyMember);

            int rowsAfected = await _context.SaveChangesAsync();

            return rowsAfected > 0;
        }

        public async Task<List<FamilyMember>> GetAllFamilyMembers()
        {
            return await _context.FamilyMembers.ToListAsync();
        }

        public async Task<FamilyMember?> GetFamilyMemberById(Guid? FamilyMemberID)
        {
            return await _context.FamilyMembers
                .AsNoTracking()
                .FirstOrDefaultAsync(temp => temp.Id == FamilyMemberID);
        }

        public async Task<List<FamilyMember>> GetFamilyMembersGusetById(Guid? GuestID)
        {
            return await _context.FamilyMembers
                .AsNoTracking()
                .Where(temp => temp.GuestId == GuestID).ToListAsync();
        }

        public async Task<FamilyMember?> UpdateFamilyMember(FamilyMember FamilyMember)
        {
            FamilyMember? matchingFamilyMember = await GetFamilyMemberById(FamilyMember.Id);

            if (matchingFamilyMember == null) return matchingFamilyMember;

            matchingFamilyMember.Name = FamilyMember.Name;
            matchingFamilyMember.Guest = FamilyMember.Guest;
            matchingFamilyMember.GuestId = FamilyMember.GuestId;

            _context.FamilyMembers.Update(matchingFamilyMember);

            await _context.SaveChangesAsync();

            return matchingFamilyMember;
        }
    }
}
