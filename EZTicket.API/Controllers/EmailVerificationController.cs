using EZTicket.API.DTOs;
using EZTicket.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace EZTicket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class EmailVerificationController : ControllerBase
    {
        private readonly IEmailVerificationService _emailVerificationService;
        private readonly IAuthService _authService;
        private readonly ILogger<EmailVerificationController> _logger;

        public EmailVerificationController(
            IEmailVerificationService emailVerificationService,
            IAuthService authService,
            ILogger<EmailVerificationController> logger)
        {
            _emailVerificationService = emailVerificationService;
            _authService = authService;
            _logger = logger;
        }

        /// <summary>
        /// Verify email with OTP code
        /// </summary>
        [HttpPost("verify")]
        public async Task<ActionResult<EmailVerificationResponseDto>> VerifyEmail(VerifyEmailDto verifyEmailDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var isValid = await _emailVerificationService.VerifyOtpAsync(verifyEmailDto.Email, verifyEmailDto.OtpCode);
                if (!isValid)
                {
                    return BadRequest(new EmailVerificationResponseDto
                    {
                        Success = false,
                        Message = "Invalid or expired OTP code. Please request a new one."
                    });
                }

                // Mark user email as verified
                var user = await _authService.GetUserByEmailAsync(verifyEmailDto.Email);
                if (user != null)
                {
                    user.EmailVerified = true;
                    user.EmailVerifiedAt = DateTime.UtcNow;
                    // Update user in database would be handled by the auth service
                }

                _logger.LogInformation("Email verified successfully for {Email}", verifyEmailDto.Email);

                return Ok(new EmailVerificationResponseDto
                {
                    Success = true,
                    Message = "Email verified successfully! You can now sign in to your account."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying email for {Email}", verifyEmailDto.Email);
                return StatusCode(500, new EmailVerificationResponseDto
                {
                    Success = false,
                    Message = "An error occurred while verifying your email. Please try again."
                });
            }
        }

        /// <summary>
        /// Resend OTP code
        /// </summary>
        [HttpPost("resend")]
        public async Task<ActionResult<EmailVerificationResponseDto>> ResendOtp(ResendOtpDto resendOtpDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var success = await _emailVerificationService.ResendOtpAsync(resendOtpDto.Email);
                if (!success)
                {
                    return BadRequest(new EmailVerificationResponseDto
                    {
                        Success = false,
                        Message = "Failed to resend verification code. Please try again later."
                    });
                }

                _logger.LogInformation("OTP resent to {Email}", resendOtpDto.Email);

                return Ok(new EmailVerificationResponseDto
                {
                    Success = true,
                    Message = "Verification code sent successfully! Please check your email.",
                    ExpiresAt = DateTime.UtcNow.AddMinutes(1)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resending OTP to {Email}", resendOtpDto.Email);
                return StatusCode(500, new EmailVerificationResponseDto
                {
                    Success = false,
                    Message = "An error occurred while resending the verification code. Please try again."
                });
            }
        }

        /// <summary>
        /// Check if email is verified
        /// </summary>
        [HttpGet("status/{email}")]
        public async Task<ActionResult<EmailVerificationResponseDto>> CheckVerificationStatus(string email)
        {
            try
            {
                var isVerified = await _emailVerificationService.IsEmailVerifiedAsync(email);
                
                return Ok(new EmailVerificationResponseDto
                {
                    Success = isVerified,
                    Message = isVerified ? "Email is verified" : "Email is not verified"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking verification status for {Email}", email);
                return StatusCode(500, new EmailVerificationResponseDto
                {
                    Success = false,
                    Message = "An error occurred while checking verification status."
                });
            }
        }
    }
}
