namespace Blog.Core.Domain.Entities;

public class Post
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string MarkdownContent { get; private set; }
    public DateTime Created { get; private set; }
    public Guid AuthorId { get; private set; }
    public User? Author { get; private set; }

    // EF Core constructor
    private Post()
    {
        Name = null!;
        Description = null!;
        MarkdownContent = null!;
    }

    private Post(Guid id, string name, string description, string markdownContent, Guid authorId, DateTime created)
    {
        Id = id;
        Name = name;
        Description = description;
        MarkdownContent = markdownContent;
        AuthorId = authorId;
        Created = created;
    }

    public static Post Create(string name, string description, string markdownContent, Guid authorId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be empty", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Description cannot be empty", nameof(description));

        if (string.IsNullOrWhiteSpace(markdownContent))
            throw new ArgumentException("Markdown content cannot be empty", nameof(markdownContent));

        if (authorId == Guid.Empty)
            throw new ArgumentException("Author ID cannot be empty", nameof(authorId));

        return new Post(Guid.NewGuid(), name, description, markdownContent, authorId, DateTime.UtcNow);
    }

    public static Post Restore(Guid id, string name, string description, string markdownContent, Guid authorId, DateTime created)
    {
        return new Post(id, name, description, markdownContent, authorId, created);
    }

    public void Update(string? name, string? description, string? markdownContent)
    {
        if (name != null)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name cannot be empty", nameof(name));
            Name = name;
        }

        if (description != null)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new ArgumentException("Description cannot be empty", nameof(description));
            Description = description;
        }

        if (markdownContent != null)
        {
            if (string.IsNullOrWhiteSpace(markdownContent))
                throw new ArgumentException("Markdown content cannot be empty", nameof(markdownContent));
            MarkdownContent = markdownContent;
        }
    }
}
