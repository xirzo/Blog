using Blog.Application.Contracts.Posts.Models;
using System;

namespace Blog.Application.Contracts.Posts.Operations;

public class CreatePost
{
    public sealed record Request(
        string Name,
        string Description,
        string MarkdownContent,
        Guid AuthorId);

    public abstract record Response
    {
        private Response() { }

        public record Success(PostDto Post) : Response;

        public record AuthorNotFound(string Message) : Response;

        public record PostRepositoryError(string Message) : Response;
    }
}