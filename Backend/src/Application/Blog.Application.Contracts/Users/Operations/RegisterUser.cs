using Blog.Application.Contracts.Users.Models;

namespace Blog.Application.Contracts.Users.Operations;

public static class RegisterUser
{
    public sealed record Request(string Name, string Email, string Password);

    public abstract record Response
    {
        private Response() { }

        public sealed record Success(UserDto User, string Token) : Response;

        public sealed record UserAlreadyExists(string Message) : Response;

        public sealed record UserRepositoryError(string Message) : Response;
    }
}