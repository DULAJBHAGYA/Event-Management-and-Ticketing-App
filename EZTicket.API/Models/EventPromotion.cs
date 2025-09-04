using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EZTicket.API.Models
{
    public class EventPromotion
    {
        [Key]
        public int Id { get; set; }

        // Foreign Keys
        [Required]
        public int EventId { get; set; }

        [Required]
        public int PromotionId { get; set; }

        // Navigation properties
        [ForeignKey("EventId")]
        public virtual Event Event { get; set; } = null!;

        [ForeignKey("PromotionId")]
        public virtual Promotion Promotion { get; set; } = null!;
    }
}
