using CasamentoProject.Core.Domain.Entities;
using CasamentoProject.Core.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Infrastucture.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public ApplicationDbContext()
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Marriage>()
                .HasMany(marr => marr.Fiances)
                .WithOne(marr => marr.Marriage)
                .HasForeignKey(f => f.MarriageId)
                .OnDelete(DeleteBehavior.Cascade);
           
        }

        public virtual DbSet<FamilyMember> FamilyMembers { get; set; }
        public virtual DbSet<Fiance> Fiances { get; set; }
        public virtual DbSet<Gift> Gifts { get; set; }
        public virtual DbSet<Guest> Guests { get; set; }
        public virtual DbSet<Marriage> Marriages { get; set; }


    }
}
