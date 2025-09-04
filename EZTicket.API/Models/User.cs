using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.Models
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ProfileImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
        public bool EmailVerified { get; set; } = false;
        public DateTime? EmailVerifiedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Event> OrganizedEvents { get; set; } = new List<Event>();
        public virtual ICollection<Ticket> PurchasedTickets { get; set; } = new List<Ticket>();
        public virtual ICollection<Promotion> CreatedPromotions { get; set; } = new List<Promotion>();
    }
}
