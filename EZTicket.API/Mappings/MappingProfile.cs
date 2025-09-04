using AutoMapper;
using EZTicket.API.DTOs;
using EZTicket.API.Models;
using Microsoft.AspNetCore.Identity;

namespace EZTicket.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Roles, opt => opt.Ignore());

            CreateMap<UserDto, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.NormalizedUserName, opt => opt.Ignore())
                .ForMember(dest => dest.NormalizedEmail, opt => opt.Ignore())
                .ForMember(dest => dest.EmailConfirmed, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore())
                .ForMember(dest => dest.ConcurrencyStamp, opt => opt.Ignore())
                .ForMember(dest => dest.PhoneNumber, opt => opt.Ignore())
                .ForMember(dest => dest.PhoneNumberConfirmed, opt => opt.Ignore())
                .ForMember(dest => dest.TwoFactorEnabled, opt => opt.Ignore())
                .ForMember(dest => dest.LockoutEnd, opt => opt.Ignore())
                .ForMember(dest => dest.LockoutEnabled, opt => opt.Ignore())
                .ForMember(dest => dest.AccessFailedCount, opt => opt.Ignore())
                .ForMember(dest => dest.OrganizedEvents, opt => opt.Ignore())
                .ForMember(dest => dest.PurchasedTickets, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedPromotions, opt => opt.Ignore());

            // Event mappings
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.TicketTypes, opt => opt.MapFrom(src => src.TicketTypes))
                .ForMember(dest => dest.Highlights, opt => opt.MapFrom(src => src.Highlights.Select(h => h.Description)))
                .ForMember(dest => dest.Terms, opt => opt.MapFrom(src => src.Terms.Select(t => t.Description)));

            CreateMap<CreateEventDto, Event>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.OrganizerId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Organizer, opt => opt.Ignore())
                .ForMember(dest => dest.TicketTypes, opt => opt.Ignore())
                .ForMember(dest => dest.Tickets, opt => opt.Ignore())
                .ForMember(dest => dest.Highlights, opt => opt.Ignore())
                .ForMember(dest => dest.Terms, opt => opt.Ignore())
                .ForMember(dest => dest.Promotions, opt => opt.Ignore());

            CreateMap<UpdateEventDto, Event>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.OrganizerId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Organizer, opt => opt.Ignore())
                .ForMember(dest => dest.TicketTypes, opt => opt.Ignore())
                .ForMember(dest => dest.Tickets, opt => opt.Ignore())
                .ForMember(dest => dest.Highlights, opt => opt.Ignore())
                .ForMember(dest => dest.Terms, opt => opt.Ignore())
                .ForMember(dest => dest.Promotions, opt => opt.Ignore());

            // TicketType mappings
            CreateMap<TicketType, TicketTypeDto>()
                .ForMember(dest => dest.Benefits, opt => opt.MapFrom(src => src.Benefits.Select(b => b.Description)));

            CreateMap<CreateTicketTypeDto, TicketType>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.EventId, opt => opt.Ignore())
                .ForMember(dest => dest.SoldTickets, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Event, opt => opt.Ignore())
                .ForMember(dest => dest.Tickets, opt => opt.Ignore())
                .ForMember(dest => dest.Benefits, opt => opt.Ignore());

            // Promotion mappings
            CreateMap<Promotion, PromotionDto>()
                .ForMember(dest => dest.ApplicableEventIds, opt => opt.MapFrom(src => src.EventPromotions.Select(ep => ep.EventId)));

            CreateMap<CreatePromotionDto, Promotion>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedById, opt => opt.Ignore())
                .ForMember(dest => dest.UsageCount, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.EventPromotions, opt => opt.Ignore());

            CreateMap<UpdatePromotionDto, Promotion>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedById, opt => opt.Ignore())
                .ForMember(dest => dest.UsageCount, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.EventPromotions, opt => opt.Ignore());

            // Ticket mappings
            CreateMap<Ticket, TicketDto>()
                .ForMember(dest => dest.EventTitle, opt => opt.MapFrom(src => src.Event.Title))
                .ForMember(dest => dest.TicketTypeName, opt => opt.MapFrom(src => src.TicketType.Name))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"));

            // EventHighlight mappings
            CreateMap<EventHighlight, string>()
                .ConvertUsing(src => src.Description);

            // EventTerm mappings
            CreateMap<EventTerm, string>()
                .ConvertUsing(src => src.Description);

            // TicketTypeBenefit mappings
            CreateMap<TicketTypeBenefit, string>()
                .ConvertUsing(src => src.Description);
        }
    }
}
