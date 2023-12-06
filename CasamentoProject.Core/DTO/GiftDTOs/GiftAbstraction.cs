using CasamentoProject.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.DTO.GiftDTOs
{
    public abstract class GiftAbstraction
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public double? Price { get; set; }
        public bool Recieved { get; set; } = false;
        public string PhotoPath { get; set; } = null!;
        public string GiftUrl { get; set; } = null!;
        public Guid? GuestId { get; set; }
        public Guest? Guest { get; set; }

        public virtual Gift ToGift()
        {
            return new Gift()
            {
                Name = Name, 
                Description = Description,
                PhotoPath = PhotoPath,
                Recieved = Recieved,
                GiftUrl = GiftUrl,
                GuestId = GuestId,
                Guest = Guest,
                Price = Price
            };
        }
    }
}
