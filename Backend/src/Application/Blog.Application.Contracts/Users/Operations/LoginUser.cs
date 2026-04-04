using Blog.Application.Contracts.Users.Models;

namespace Blog.Application.Contracts.Users.Operations;

public static class LoginUser
{
    public sealed record Request(string Email, string Password);

    public abstract record Response
    {
        private Response() { }

        public sealed record Success(string Token, UserDto User) : Response;

        public sealed record WrongPassword(string Message) : Response;

        public sealed record UserNotFound(string Message) : Response;
    }
}