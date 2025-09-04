using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? LongDescription { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime EventDate { get; set; }
        public TimeSpan EventTime { get; set; }
        public string? Duration { get; set; }
        public string OrganizerName { get; set; } = string.Empty;
        public string? OrganizerContact { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<TicketTypeDto> TicketTypes { get; set; } = new List<TicketTypeDto>();
        public List<string> Highlights { get; set; } = new List<string>();
        public List<string> Terms { get; set; } = new List<string>();
    }

    public class CreateEventDto
    {
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

        public List<CreateTicketTypeDto> TicketTypes { get; set; } = new List<CreateTicketTypeDto>();
        public List<string> Highlights { get; set; } = new List<string>();
        public List<string> Terms { get; set; } = new List<string>();
    }

    public class UpdateEventDto
    {
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

        public List<CreateTicketTypeDto> TicketTypes { get; set; } = new List<CreateTicketTypeDto>();
        public List<string> Highlights { get; set; } = new List<string>();
        public List<string> Terms { get; set; } = new List<string>();
    }
}
