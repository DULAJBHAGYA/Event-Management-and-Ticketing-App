using EZTicket.API.Models;

namespace EZTicket.API.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        string GenerateRefreshToken();
        bool ValidateToken(string token);
        string GetUserIdFromToken(string token);
        Task<RefreshToken> CreateRefreshTokenAsync(string userId);
        Task<RefreshToken?> GetRefreshTokenAsync(string token);
        Task RevokeRefreshTokenAsync(string token);
        Task RevokeAllRefreshTokensAsync(string userId);
    }
}
