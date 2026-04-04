using System;

namespace Blog.Presentation.Rest.Models;

public class BlogCreateModel
{
    public required string Name { get; set; }

    public required string Description { get; set; }

    public required string MarkdownContent { get; set; }

    public Guid AuthorId { get; set; }
}