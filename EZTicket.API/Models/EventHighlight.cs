using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EZTicket.API.Models
{
    public class EventHighlight
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public int Order { get; set; } = 0;

        // Foreign Keys
        [Required]
        public int EventId { get; set; }

        // Navigation properties
        [ForeignKey("EventId")]
        public virtual Event Event { get; set; } = null!;
    }
}
