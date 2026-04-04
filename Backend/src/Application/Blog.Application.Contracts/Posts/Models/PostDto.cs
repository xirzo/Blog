using System;

namespace Blog.Application.Contracts.Posts.Models;

public sealed record PostDto(
    Guid PostId,
    string Name,
    string Description,
    string MarkdownContent,
    DateTime Created,
    Guid AuthorId);