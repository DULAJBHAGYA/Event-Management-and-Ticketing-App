using EZTicket.API.DTOs;

namespace EZTicket.API.Services
{
    public interface IEmailVerificationService
    {
        Task<string> GenerateAndSendOtpAsync(string email, string firstName);
        Task<bool> VerifyOtpAsync(string email, string otpCode);
        Task<bool> ResendOtpAsync(string email);
        Task<bool> IsEmailVerifiedAsync(string email);
        Task CleanupExpiredOtpsAsync();
    }
}
