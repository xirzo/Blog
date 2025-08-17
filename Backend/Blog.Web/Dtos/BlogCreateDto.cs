namespace Blog.Web.Dtos;

public class BlogCreateDto
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string MarkdownContent { get; set; }
    public Guid AuthorId { get; set; }
}