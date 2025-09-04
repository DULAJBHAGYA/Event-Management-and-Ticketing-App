using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.DTOs
{
    public class TicketTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public int AvailableTickets { get; set; }
        public int SoldTickets { get; set; }
        public bool IsActive { get; set; }
        public List<string> Benefits { get; set; } = new List<string>();
    }

    public class CreateTicketTypeDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
        public decimal Price { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Original price must be greater than or equal to 0")]
        public decimal? OriginalPrice { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Available tickets must be greater than 0")]
        public int AvailableTickets { get; set; }

        public List<string> Benefits { get; set; } = new List<string>();
    }
}
