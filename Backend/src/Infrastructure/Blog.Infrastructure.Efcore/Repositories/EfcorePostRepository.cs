using Blog.Application.Abstractions.Persistence.Repositories;
using Blog.Application.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Infrastructure.Efcore.Repositories;

public class EfcorePostRepository(BlogDbContext context) : IPostRepository
{
    public async Task<Post> AddAsync(Post post, CancellationToken cancellationToken)
    {
        context.Posts.Add(post);
        await context.SaveChangesAsync(cancellationToken);
        return post;
    }

    public async IAsyncEnumerable<Post> GetAllAsync([EnumeratorCancellation] CancellationToken cancellationToken)
    {
        await foreach (Post post in context.Posts
            .AsAsyncEnumerable()
            .WithCancellation(cancellationToken))
        {
            yield return post;
        }
    }

    public async Task<Post?> FindByPostIdAsync(Guid postId, CancellationToken cancellationToken)
    {
        return await context.Posts
            .FirstOrDefaultAsync(p => p.PostId == postId, cancellationToken);
    }

    public async IAsyncEnumerable<Post> GetAllByUserIdAsync(Guid userId, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        await foreach (Post post in context.Posts
            .Where(p => p.AuthorId == userId)
            .AsAsyncEnumerable()
            .WithCancellation(cancellationToken))
        {
            yield return post;
        }
    }

    public async Task<Post> UpdateAsync(Post post, CancellationToken cancellationToken)
    {
        context.Update(post);
        await context.SaveChangesAsync(cancellationToken);
        return post;
    }

    public async Task DeleteAsync(Post post, CancellationToken cancellationToken)
    {
        context.Posts.Remove(post);
        await context.SaveChangesAsync(cancellationToken);
    }
}
