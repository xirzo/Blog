using Blog.Application.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Infrastructure.Efcore.Configurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(post => post.PostId);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(post => post.AuthorId)
            .IsRequired();
    }
}