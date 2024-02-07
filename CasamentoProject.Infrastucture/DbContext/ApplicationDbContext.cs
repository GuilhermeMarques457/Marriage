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

            builder.Entity<GiftMoney>().ToTable("GiftsMoney");

            #region Marriage Relations

            builder.Entity<Marriage>().Ignore(marriage => marriage.Gifts);

            builder.Entity<Marriage>()
                .HasMany(marriage => marriage.Fiances)
                .WithOne(fiance => fiance.Marriage)
                .HasForeignKey(fiance => fiance.MarriageId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Marriage>()
                .HasMany(marriage => marriage.GuestsPlusFamily)
                .WithOne(guest => guest.Marriage)
                .HasForeignKey(guest => guest.MarriageId)
                .OnDelete(DeleteBehavior.Cascade);


            //builder.Entity<Marriage>()
            //    .HasMany(marriage => marriage.Gifts)
            //    .WithOne(gift => gift.)

            #endregion

            #region Guest Relations

            builder.Entity<Guest>()
                .HasMany(guest => guest.FamilyMembers)
                .WithOne(family => family.Guest)
                .HasForeignKey(family => family.GuestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Guest>()
                .HasOne(guest => guest.Gift)
                .WithOne(gift => gift.Guest)
                .HasForeignKey<Gift>(gift => gift.GuestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Guest>()
                .HasOne(guest => guest.GiftMoney)
                .WithOne(money => money.Guest)
                .HasForeignKey<GiftMoney>(money => money.GuestId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Guest>().Ignore(guest => guest.Marriage);

            #endregion

            #region Family Relations

            builder.Entity<FamilyMember>().Ignore(member => member.Guest);
            #endregion

        }

        public virtual DbSet<FamilyMember> FamilyMembers { get; set; }
        public virtual DbSet<Fiance> Fiances { get; set; }
        public virtual DbSet<Gift> Gifts { get; set; }
        public virtual DbSet<Guest> Guests { get; set; }
        public virtual DbSet<Marriage> Marriages { get; set; }
        public virtual DbSet<GiftMoney> GiftsMoney { get; set; }


    }
}
