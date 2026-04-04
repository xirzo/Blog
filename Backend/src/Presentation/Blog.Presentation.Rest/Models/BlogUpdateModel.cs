namespace Blog.Presentation.Rest.Models;

public class BlogUpdateModel
{
    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? MarkdownContent { get; set; }
}