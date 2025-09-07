using EZTicket.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EZTicket.API.Data
{
    public class EZTicketDbContext : IdentityDbContext<User>
    {
        public EZTicketDbContext(DbContextOptions<EZTicketDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<EventHighlight> EventHighlights { get; set; }
        public DbSet<EventTerm> EventTerms { get; set; }
        public DbSet<TicketTypeBenefit> TicketTypeBenefits { get; set; }
        public DbSet<EventPromotion> EventPromotions { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<EmailVerification> EmailVerifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Event relationships
            builder.Entity<Event>()
                .HasOne(e => e.Organizer)
                .WithMany(u => u.OrganizedEvents)
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure TicketType relationships
            builder.Entity<TicketType>()
                .HasOne(tt => tt.Event)
                .WithMany(e => e.TicketTypes)
                .HasForeignKey(tt => tt.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Ticket relationships
            builder.Entity<Ticket>()
                .HasOne(t => t.Event)
                .WithMany(e => e.Tickets)
                .HasForeignKey(t => t.EventId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .HasOne(t => t.TicketType)
                .WithMany(tt => tt.Tickets)
                .HasForeignKey(t => t.TicketTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany(u => u.PurchasedTickets)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Promotion relationships
            builder.Entity<Promotion>()
                .HasOne(p => p.CreatedBy)
                .WithMany(u => u.CreatedPromotions)
                .HasForeignKey(p => p.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure EventHighlight relationships
            builder.Entity<EventHighlight>()
                .HasOne(eh => eh.Event)
                .WithMany(e => e.Highlights)
                .HasForeignKey(eh => eh.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure EventTerm relationships
            builder.Entity<EventTerm>()
                .HasOne(et => et.Event)
                .WithMany(e => e.Terms)
                .HasForeignKey(et => et.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure TicketTypeBenefit relationships
            builder.Entity<TicketTypeBenefit>()
                .HasOne(ttb => ttb.TicketType)
                .WithMany(tt => tt.Benefits)
                .HasForeignKey(ttb => ttb.TicketTypeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure EventPromotion many-to-many relationship
            builder.Entity<EventPromotion>()
                .HasKey(ep => new { ep.EventId, ep.PromotionId });

            builder.Entity<EventPromotion>()
                .HasOne(ep => ep.Event)
                .WithMany()
                .HasForeignKey(ep => ep.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<EventPromotion>()
                .HasOne(ep => ep.Promotion)
                .WithMany()
                .HasForeignKey(ep => ep.PromotionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure indexes for better performance
            builder.Entity<Event>()
                .HasIndex(e => e.EventDate)
                .HasDatabaseName("IX_Events_EventDate");

            builder.Entity<Event>()
                .HasIndex(e => e.Category)
                .HasDatabaseName("IX_Events_Category");

            builder.Entity<Event>()
                .HasIndex(e => e.IsActive)
                .HasDatabaseName("IX_Events_IsActive");

            builder.Entity<Ticket>()
                .HasIndex(t => t.TicketNumber)
                .IsUnique()
                .HasDatabaseName("IX_Tickets_TicketNumber");

            builder.Entity<Promotion>()
                .HasIndex(p => p.PromoCode)
                .HasDatabaseName("IX_Promotions_PromoCode");

            builder.Entity<Promotion>()
                .HasIndex(p => p.IsActive)
                .HasDatabaseName("IX_Promotions_IsActive");
        }
    }
}
