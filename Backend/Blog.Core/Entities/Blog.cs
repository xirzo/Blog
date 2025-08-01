namespace Blog.Core.Entities;

public class Blog
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Created { get; set; }
    public Guid AuthorId { get; set; }
    public User? Author { get; set; }
    public ICollection<Post> Posts { get; set; }
}
