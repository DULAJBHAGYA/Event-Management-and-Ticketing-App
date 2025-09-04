using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.DTOs
{
    public class PromotionDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal? DiscountPercentage { get; set; }
        public decimal? FixedDiscountAmount { get; set; }
        public string? PromoCode { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidUntil { get; set; }
        public int? MaxUsage { get; set; }
        public int UsageCount { get; set; }
        public decimal? MinOrderAmount { get; set; }
        public int? MinTickets { get; set; }
        public decimal? MaxDiscountAmount { get; set; }
        public bool IsActive { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<int> ApplicableEventIds { get; set; } = new List<int>();
    }

    public class CreatePromotionDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;

        [Range(0, 100, ErrorMessage = "Discount percentage must be between 0 and 100")]
        public decimal? DiscountPercentage { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Fixed discount amount must be greater than or equal to 0")]
        public decimal? FixedDiscountAmount { get; set; }

        [MaxLength(50)]
        public string? PromoCode { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidUntil { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Max usage must be greater than 0")]
        public int? MaxUsage { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Min order amount must be greater than or equal to 0")]
        public decimal? MinOrderAmount { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Min tickets must be greater than 0")]
        public int? MinTickets { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Max discount amount must be greater than or equal to 0")]
        public decimal? MaxDiscountAmount { get; set; }

        public bool IsFeatured { get; set; } = false;

        public List<int> ApplicableEventIds { get; set; } = new List<int>();
    }

    public class UpdatePromotionDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;

        [Range(0, 100, ErrorMessage = "Discount percentage must be between 0 and 100")]
        public decimal? DiscountPercentage { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Fixed discount amount must be greater than or equal to 0")]
        public decimal? FixedDiscountAmount { get; set; }

        [MaxLength(50)]
        public string? PromoCode { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidUntil { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Max usage must be greater than 0")]
        public int? MaxUsage { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Min order amount must be greater than or equal to 0")]
        public decimal? MinOrderAmount { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Min tickets must be greater than 0")]
        public int? MinTickets { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Max discount amount must be greater than or equal to 0")]
        public decimal? MaxDiscountAmount { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;

        public List<int> ApplicableEventIds { get; set; } = new List<int>();
    }
}
