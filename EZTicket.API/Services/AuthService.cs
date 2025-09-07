using AutoMapper;
using EZTicket.API.Data;
using EZTicket.API.DTOs;
using EZTicket.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EZTicket.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly EZTicketDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthService> _logger;
        private readonly IEmailVerificationService _emailVerificationService;
        private readonly IEmailService _emailService;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJwtService jwtService,
            EZTicketDbContext context,
            IMapper mapper,
            ILogger<AuthService> logger,
            IEmailVerificationService emailVerificationService,
            IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _emailVerificationService = emailVerificationService;
            _emailService = emailService;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            try
            {
                // Check if user already exists
                var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
                if (existingUser != null)
                {
                    throw new InvalidOperationException("User with this email already exists");
                }

                // Create new user
                var user = new User
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Email = registerDto.Email,
                    UserName = registerDto.Email,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);
                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    throw new InvalidOperationException($"User creation failed: {errors}");
                }

                // Add to default role
                await _userManager.AddToRoleAsync(user, "User");

                // Send email verification
                await _emailVerificationService.GenerateAndSendOtpAsync(user.Email, user.FirstName);

                _logger.LogInformation("User {Email} registered successfully. Verification email sent.", user.Email);

                // Don't generate tokens yet - user needs to verify email first
                throw new InvalidOperationException("Registration successful! Please check your email and verify your account before signing in.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration for {Email}", registerDto.Email);
                throw;
            }
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(loginDto.Email);
                if (user == null || !user.IsActive)
                {
                    throw new UnauthorizedAccessException("Invalid email or password");
                }

                // Check if email is verified
                if (!user.EmailVerified)
                {
                    throw new UnauthorizedAccessException("Please verify your email address before signing in. Check your email for verification instructions.");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, lockoutOnFailure: true);
                if (!result.Succeeded)
                {
                    if (result.IsLockedOut)
                    {
                        throw new InvalidOperationException("Account is locked due to multiple failed login attempts");
                    }
                    throw new UnauthorizedAccessException("Invalid email or password");
                }

                // Generate tokens
                var token = _jwtService.GenerateToken(user);
                var refreshToken = await _jwtService.CreateRefreshTokenAsync(user.Id);

                _logger.LogInformation("User {Email} logged in successfully", user.Email);

                return new AuthResponseDto
                {
                    Token = token,
                    RefreshToken = refreshToken.Token,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(60), // JWT expiry
                    User = _mapper.Map<UserDto>(user)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login for {Email}", loginDto.Email);
                throw;
            }
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var refreshToken = await _jwtService.GetRefreshTokenAsync(refreshTokenDto.RefreshToken);
                if (refreshToken == null)
                {
                    throw new UnauthorizedAccessException("Invalid refresh token");
                }

                var user = await _userManager.FindByIdAsync(refreshToken.UserId);
                if (user == null || !user.IsActive)
                {
                    throw new UnauthorizedAccessException("User not found or inactive");
                }

                // Revoke old refresh token
                await _jwtService.RevokeRefreshTokenAsync(refreshToken.Token);

                // Generate new tokens
                var newToken = _jwtService.GenerateToken(user);
                var newRefreshToken = await _jwtService.CreateRefreshTokenAsync(user.Id);

                return new AuthResponseDto
                {
                    Token = newToken,
                    RefreshToken = newRefreshToken.Token,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(60),
                    User = _mapper.Map<UserDto>(user)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token refresh");
                throw;
            }
        }

        public async Task LogoutAsync(string refreshToken)
        {
            try
            {
                await _jwtService.RevokeRefreshTokenAsync(refreshToken);
                _logger.LogInformation("User logged out successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during logout");
                throw;
            }
        }

        public async Task LogoutAllAsync(string userId)
        {
            try
            {
                await _jwtService.RevokeAllRefreshTokensAsync(userId);
                _logger.LogInformation("All sessions revoked for user {UserId}", userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during logout all for user {UserId}", userId);
                throw;
            }
        }

        public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto changePasswordDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return false;
                }

                var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);
                if (result.Succeeded)
                {
                    // Revoke all refresh tokens for security
                    await _jwtService.RevokeAllRefreshTokensAsync(userId);
                    _logger.LogInformation("Password changed successfully for user {UserId}", userId);
                }

                return result.Succeeded;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error changing password for user {UserId}", userId);
                return false;
            }
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    // Don't reveal if user exists
                    return true;
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                // In a real application, you would send this token via email
                _logger.LogInformation("Password reset token generated for user {Email}", user.Email);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating password reset token for {Email}", forgotPasswordDto.Email);
                return false;
            }
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
                if (user == null)
                {
                    return false;
                }

                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
                if (result.Succeeded)
                {
                    // Revoke all refresh tokens for security
                    await _jwtService.RevokeAllRefreshTokensAsync(user.Id);
                    _logger.LogInformation("Password reset successfully for user {Email}", user.Email);
                }

                return result.Succeeded;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting password for user {Email}", resetPasswordDto.Email);
                return false;
            }
        }

        public async Task<UserDto> GetUserProfileAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new UnauthorizedAccessException("User not found");
                }

                return _mapper.Map<UserDto>(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user profile for {UserId}", userId);
                throw;
            }
        }

        public async Task<bool> UpdateUserProfileAsync(string userId, UserDto userDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return false;
                }

                user.FirstName = userDto.FirstName;
                user.LastName = userDto.LastName;
                user.ProfileImageUrl = userDto.ProfileImageUrl;
                user.UpdatedAt = DateTime.UtcNow;

                var result = await _userManager.UpdateAsync(user);
                return result.Succeeded;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user profile for {UserId}", userId);
                return false;
            }
        }

        public async Task<bool> DeactivateAccountAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return false;
                }

                user.IsActive = false;
                user.UpdatedAt = DateTime.UtcNow;

                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    // Revoke all refresh tokens
                    await _jwtService.RevokeAllRefreshTokensAsync(userId);
                    _logger.LogInformation("Account deactivated for user {UserId}", userId);
                }

                return result.Succeeded;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deactivating account for user {UserId}", userId);
                return false;
            }
        }

        public async Task<Models.User?> GetUserByEmailAsync(string email)
        {
            try
            {
                return await _userManager.FindByEmailAsync(email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by email {Email}", email);
                return null;
            }
        }
    }
}
