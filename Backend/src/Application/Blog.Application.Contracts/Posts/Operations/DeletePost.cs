using Blog.Application.Contracts.Posts.Models;
using System;

namespace Blog.Application.Contracts.Posts.Operations;

public class DeletePost
{
    public sealed record Request(Guid PostId);

    public abstract record Response
    {
        private Response() { }

        public record Success(PostDto Post) : Response;

        public record PostNotFound : Response;

        public record PostRepositoryError(string Message) : Response;
    }
}