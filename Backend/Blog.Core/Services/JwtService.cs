using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Blog.Core.Entities;
using Blog.Core.Helpers;
using Microsoft.IdentityModel.Tokens;

namespace Blog.Core.Services;

public class JwtService
{
    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim("guid", user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.Name),
        };
        var jwtKey = EnvironmentHelper.GetEnvironmentVariableOrFile("JWT_KEY");

        if (jwtKey == null)
        {
            throw new InvalidOperationException("JWT_KEY environment variable is not set.");
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var token = new JwtSecurityToken(
            issuer: EnvironmentHelper.GetEnvironmentVariableOrFile("JWT_ISSUER"),
            audience: EnvironmentHelper.GetEnvironmentVariableOrFile("JWT_AUDIENCE"),
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}