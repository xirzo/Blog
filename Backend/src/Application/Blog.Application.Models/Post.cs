using System;

namespace Blog.Application.Models;

public sealed record Post(
    Guid PostId,
    string Name,
    string Description,
    string MarkdownContent,
    DateTime Created,
    Guid AuthorId);
