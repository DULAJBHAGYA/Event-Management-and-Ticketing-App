using EZTicket.API.DTOs;

namespace EZTicket.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto refreshTokenDto);
        Task LogoutAsync(string refreshToken);
        Task LogoutAllAsync(string userId);
        Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto changePasswordDto);
        Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
        Task<UserDto> GetUserProfileAsync(string userId);
        Task<bool> UpdateUserProfileAsync(string userId, UserDto userDto);
        Task<bool> DeactivateAccountAsync(string userId);
        Task<User?> GetUserByEmailAsync(string email);
    }
}
