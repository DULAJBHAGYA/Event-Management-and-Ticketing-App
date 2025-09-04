using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EZTicket.API.Models
{
    public class TicketTypeBenefit
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public int Order { get; set; } = 0;

        // Foreign Keys
        [Required]
        public int TicketTypeId { get; set; }

        // Navigation properties
        [ForeignKey("TicketTypeId")]
        public virtual TicketType TicketType { get; set; } = null!;
    }
}
