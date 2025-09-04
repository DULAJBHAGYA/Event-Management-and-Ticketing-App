using System.ComponentModel.DataAnnotations;

namespace EZTicket.API.DTOs
{
    public class VerifyEmailDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "OTP code must be 6 digits")]
        [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP code must contain only 6 digits")]
        public string OtpCode { get; set; } = string.Empty;
    }

    public class ResendOtpDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }

    public class EmailVerificationResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime? ExpiresAt { get; set; }
    }
}
