using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EZTicket.API.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(5000)]
        public string? LongDescription { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        public TimeSpan EventTime { get; set; }

        [MaxLength(50)]
        public string? Duration { get; set; }

        [Required]
        [MaxLength(200)]
        public string OrganizerName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? OrganizerContact { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public bool IsFeatured { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        [Required]
        public string OrganizerId { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("OrganizerId")]
        public virtual User Organizer { get; set; } = null!;
        public virtual ICollection<TicketType> TicketTypes { get; set; } = new List<TicketType>();
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
        public virtual ICollection<EventHighlight> Highlights { get; set; } = new List<EventHighlight>();
        public virtual ICollection<EventTerm> Terms { get; set; } = new List<EventTerm>();
        public virtual ICollection<Promotion> Promotions { get; set; } = new List<Promotion>();
    }
}
