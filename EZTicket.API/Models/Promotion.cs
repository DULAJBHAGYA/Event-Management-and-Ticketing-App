using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EZTicket.API.Models
{
    public class Promotion
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // discount, early-bird, bundle, flash-sale, vip

        [Column(TypeName = "decimal(5,2)")]
        public decimal? DiscountPercentage { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? FixedDiscountAmount { get; set; }

        [MaxLength(50)]
        public string? PromoCode { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidUntil { get; set; }

        public int? MaxUsage { get; set; }
        public int UsageCount { get; set; } = 0;

        [Column(TypeName = "decimal(10,2)")]
        public decimal? MinOrderAmount { get; set; }

        public int? MinTickets { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? MaxDiscountAmount { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsFeatured { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        [Required]
        public string CreatedById { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("CreatedById")]
        public virtual User CreatedBy { get; set; } = null!;
        public virtual ICollection<EventPromotion> EventPromotions { get; set; } = new List<EventPromotion>();
    }
}
