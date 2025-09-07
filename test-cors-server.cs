using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

// Simple test endpoint
app.MapGet("/health", () => new { status = "Healthy" });

app.MapPost("/api/auth/register", (object data) => new { 
    success = true, 
    message = "Registration successful! Please check your email for verification instructions." 
});

app.MapPost("/api/auth/login", (object data) => new { 
    success = true, 
    data = new {
        token = "test-token",
        refreshToken = "test-refresh-token",
        expiresAt = DateTime.UtcNow.AddMinutes(60),
        user = new {
            id = "test-user-id",
            firstName = "Test",
            lastName = "User",
            email = "test@example.com",
            emailVerified = true
        }
    }
});

app.MapGet("/api/auth/me", () => new {
    id = "test-user-id",
    firstName = "Test",
    lastName = "User", 
    email = "test@example.com",
    emailVerified = true
});

app.Run("http://localhost:5001");
