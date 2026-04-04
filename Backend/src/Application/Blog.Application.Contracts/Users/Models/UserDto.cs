using System;

namespace Blog.Application.Contracts.Users.Models;

public record UserDto(Guid UserId, string Email, string Name);