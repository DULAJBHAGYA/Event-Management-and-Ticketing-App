using System.Net;
using System.Net.Mail;
using System.Text;

namespace EZTicket.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendVerificationEmailAsync(string email, string otpCode, string firstName)
        {
            try
            {
                var subject = "EZTicket - Verify Your Email Address";
                var body = CreateVerificationEmailBody(otpCode, firstName);

                return await SendEmailAsync(email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending verification email to {Email}", email);
                return false;
            }
        }

        public async Task<bool> SendPasswordResetEmailAsync(string email, string resetToken, string firstName)
        {
            try
            {
                var subject = "EZTicket - Reset Your Password";
                var body = CreatePasswordResetEmailBody(resetToken, firstName);

                return await SendEmailAsync(email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending password reset email to {Email}", email);
                return false;
            }
        }

        public async Task<bool> SendWelcomeEmailAsync(string email, string firstName)
        {
            try
            {
                var subject = "Welcome to EZTicket!";
                var body = CreateWelcomeEmailBody(firstName);

                return await SendEmailAsync(email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending welcome email to {Email}", email);
                return false;
            }
        }

        private async Task<bool> SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                // For development: Check if SMTP is properly configured
                var smtpUsername = _configuration["EmailSettings:SMTPUsername"] ?? "";
                var smtpPassword = _configuration["EmailSettings:SMTPPassword"] ?? "";
                
                if (string.IsNullOrEmpty(smtpUsername) || string.IsNullOrEmpty(smtpPassword) || 
                    smtpUsername == "your-email@gmail.com" || smtpPassword == "your-app-password")
                {
                    // Development mode: Log email to console instead of sending
                    _logger.LogInformation("=== DEVELOPMENT MODE: EMAIL NOT SENT ===");
                    _logger.LogInformation("To: {Email}", to);
                    _logger.LogInformation("Subject: {Subject}", subject);
                    _logger.LogInformation("Body: {Body}", body);
                    _logger.LogInformation("=== END EMAIL ===");
                    
                    // Extract OTP from verification emails for easy testing
                    if (subject.Contains("Verify Your Email"))
                    {
                        var otpMatch = System.Text.RegularExpressions.Regex.Match(body, @"<strong>(\d{6})</strong>");
                        if (otpMatch.Success)
                        {
                            _logger.LogWarning("🔑 VERIFICATION CODE FOR {Email}: {OTP}", to, otpMatch.Groups[1].Value);
                        }
                    }
                    
                    return true; // Return true so the flow continues
                }

                // Production mode: Send actual email
                var smtpHost = _configuration["EmailSettings:SMTPHost"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["EmailSettings:SMTPPort"] ?? "587");
                var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@ezticket.com";
                var fromName = _configuration["EmailSettings:FromName"] ?? "EZTicket";

                using var client = new SmtpClient(smtpHost, smtpPort);
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                using var message = new MailMessage();
                message.From = new MailAddress(fromEmail, fromName);
                message.To.Add(to);
                message.Subject = subject;
                message.Body = body;
                message.IsBodyHtml = true;

                await client.SendMailAsync(message);
                _logger.LogInformation("Email sent successfully to {Email}", to);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {Email}", to);
                return false;
            }
        }

        private string CreateVerificationEmailBody(string otpCode, string firstName)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Email Verification - EZTicket</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #10b981, #0d9488, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
        .otp-code {{ background: #fff; border: 2px solid #10b981; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; font-size: 32px; font-weight: bold; color: #10b981; letter-spacing: 5px; }}
        .warning {{ background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; color: #92400e; }}
        .footer {{ text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎫 EZTicket</h1>
            <h2>Verify Your Email Address</h2>
        </div>
        <div class='content'>
            <p>Hello <strong>{firstName}</strong>,</p>
            <p>Welcome to EZTicket! To complete your registration, please verify your email address using the OTP code below:</p>
            
            <div class='otp-code'>{otpCode}</div>
            
            <div class='warning'>
                <strong>⚠️ Important:</strong> This code will expire in <strong>1 minute</strong>. If you don't verify within this time, you'll need to request a new verification code.
            </div>
            
            <p>If you didn't create an account with EZTicket, please ignore this email.</p>
            
            <p>Best regards,<br>The EZTicket Team</p>
        </div>
        <div class='footer'>
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© 2024 EZTicket. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
        }

        private string CreatePasswordResetEmailBody(string resetToken, string firstName)
        {
            var resetUrl = $"{_configuration["FrontendUrl"]}/reset-password?token={resetToken}&email={Uri.EscapeDataString("user@example.com")}";
            
            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Password Reset - EZTicket</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #10b981, #0d9488, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
        .reset-button {{ background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }}
        .footer {{ text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎫 EZTicket</h1>
            <h2>Reset Your Password</h2>
        </div>
        <div class='content'>
            <p>Hello <strong>{firstName}</strong>,</p>
            <p>You requested to reset your password. Click the button below to reset your password:</p>
            
            <a href='{resetUrl}' class='reset-button'>Reset Password</a>
            
            <p>If you didn't request this password reset, please ignore this email.</p>
            
            <p>Best regards,<br>The EZTicket Team</p>
        </div>
        <div class='footer'>
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© 2024 EZTicket. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
        }

        private string CreateWelcomeEmailBody(string firstName)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Welcome to EZTicket</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #10b981, #0d9488, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
        .footer {{ text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎫 EZTicket</h1>
            <h2>Welcome Aboard!</h2>
        </div>
        <div class='content'>
            <p>Hello <strong>{firstName}</strong>,</p>
            <p>Welcome to EZTicket! Your email has been successfully verified and your account is now active.</p>
            
            <p>You can now:</p>
            <ul>
                <li>Browse and book events</li>
                <li>Create and manage your own events (as an organizer)</li>
                <li>Access exclusive promotions and deals</li>
                <li>Manage your tickets and bookings</li>
            </ul>
            
            <p>Thank you for choosing EZTicket for your event management needs!</p>
            
            <p>Best regards,<br>The EZTicket Team</p>
        </div>
        <div class='footer'>
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© 2024 EZTicket. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
        }
    }
}
