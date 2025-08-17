namespace Blog.Core.Entities;

public class Post
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string MarkdownContent { get; set; }
    public DateTime Created { get; set; }
    public Guid AuthorId { get; set; }
    public User? Author { get; set; }
}
