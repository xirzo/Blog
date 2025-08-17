using Blog.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.IO.Db;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Core.Entities.Blog> Blogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new BlogConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);
    }
}

public class BlogConfiguration : IEntityTypeConfiguration<Core.Entities.Blog>
{
    public void Configure(EntityTypeBuilder<Core.Entities.Blog> builder)
    {
        builder.HasKey(blog => blog.Id);
        builder.HasOne(blog => blog.Author)
            .WithMany()
            .HasForeignKey(blog => blog.AuthorId)
            .IsRequired();
    }
}