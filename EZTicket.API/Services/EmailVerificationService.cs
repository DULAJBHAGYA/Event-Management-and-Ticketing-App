using EZTicket.API.Data;
using EZTicket.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EZTicket.API.Services
{
    public class EmailVerificationService : IEmailVerificationService
    {
        private readonly EZTicketDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<EmailVerificationService> _logger;

        public EmailVerificationService(
            EZTicketDbContext context,
            IEmailService emailService,
            ILogger<EmailVerificationService> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<string> GenerateAndSendOtpAsync(string email, string firstName)
        {
            try
            {
                // Clean up expired OTPs first
                await CleanupExpiredOtpsAsync();

                // Generate 6-digit OTP
                var otpCode = GenerateOtpCode();

                // Create or update verification record
                var existingVerification = await _context.EmailVerifications
                    .FirstOrDefaultAsync(ev => ev.Email == email && !ev.IsUsed);

                if (existingVerification != null)
                {
                    // Update existing record
                    existingVerification.OtpCode = otpCode;
                    existingVerification.ExpiresAt = DateTime.UtcNow.AddMinutes(1);
                    existingVerification.CreatedAt = DateTime.UtcNow;
                }
                else
                {
                    // Create new record
                    var verification = new EmailVerification
                    {
                        Email = email,
                        OtpCode = otpCode,
                        ExpiresAt = DateTime.UtcNow.AddMinutes(1),
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.EmailVerifications.Add(verification);
                }

                await _context.SaveChangesAsync();

                // Send email
                var emailSent = await _emailService.SendVerificationEmailAsync(email, otpCode, firstName);
                if (!emailSent)
                {
                    _logger.LogWarning("Failed to send verification email to {Email}", email);
                }

                _logger.LogInformation("OTP generated and sent to {Email}", email);
                return otpCode; // Return for testing purposes
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating and sending OTP to {Email}", email);
                throw;
            }
        }

        public async Task<bool> VerifyOtpAsync(string email, string otpCode)
        {
            try
            {
                // Clean up expired OTPs first
                await CleanupExpiredOtpsAsync();

                var verification = await _context.EmailVerifications
                    .FirstOrDefaultAsync(ev => 
                        ev.Email == email && 
                        ev.OtpCode == otpCode && 
                        !ev.IsUsed && 
                        ev.ExpiresAt > DateTime.UtcNow);

                if (verification == null)
                {
                    _logger.LogWarning("Invalid or expired OTP for {Email}", email);
                    return false;
                }

                // Mark as used
                verification.IsUsed = true;
                verification.UsedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Email verified successfully for {Email}", email);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying OTP for {Email}", email);
                return false;
            }
        }

        public async Task<bool> ResendOtpAsync(string email)
        {
            try
            {
                // Get user info for email
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                var firstName = user?.FirstName ?? "User";

                // Generate and send new OTP
                await GenerateAndSendOtpAsync(email, firstName);

                _logger.LogInformation("OTP resent to {Email}", email);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resending OTP to {Email}", email);
                return false;
            }
        }

        public async Task<bool> IsEmailVerifiedAsync(string email)
        {
            try
            {
                var verification = await _context.EmailVerifications
                    .FirstOrDefaultAsync(ev => 
                        ev.Email == email && 
                        ev.IsUsed);

                return verification != null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking email verification status for {Email}", email);
                return false;
            }
        }

        public async Task CleanupExpiredOtpsAsync()
        {
            try
            {
                var expiredOtps = await _context.EmailVerifications
                    .Where(ev => ev.ExpiresAt < DateTime.UtcNow && !ev.IsUsed)
                    .ToListAsync();

                if (expiredOtps.Any())
                {
                    _context.EmailVerifications.RemoveRange(expiredOtps);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Cleaned up {Count} expired OTPs", expiredOtps.Count);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error cleaning up expired OTPs");
            }
        }

        private string GenerateOtpCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }
    }
}
