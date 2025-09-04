using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.DTOs
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string TicketNumber { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? DiscountAmount { get; set; }
        public string? PromoCode { get; set; }
        public bool IsUsed { get; set; }
        public DateTime? UsedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public string EventTitle { get; set; } = string.Empty;
        public string TicketTypeName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }

    public class CreateTicketDto
    {
        [Required]
        public int EventId { get; set; }

        [Required]
        public int TicketTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        [MaxLength(50)]
        public string? PromoCode { get; set; }
    }
}
