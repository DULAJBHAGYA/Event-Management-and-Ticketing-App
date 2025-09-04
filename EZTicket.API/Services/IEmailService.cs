namespace EZTicket.API.Services
{
    public interface IEmailService
    {
        Task<bool> SendVerificationEmailAsync(string email, string otpCode, string firstName);
        Task<bool> SendPasswordResetEmailAsync(string email, string resetToken, string firstName);
        Task<bool> SendWelcomeEmailAsync(string email, string firstName);
    }
}
