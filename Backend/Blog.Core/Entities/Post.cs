namespace Blog.Core.Entities;
public class Post { 
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime Created { get; set; }
    public Guid BlogId { get; set; }
    public Blog? Blog { get; set; }
}
