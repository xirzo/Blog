using Blog.Application.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Abstractions.Persistence.Repositories;

public interface IPostRepository
{
    Task<Post> AddAsync(Post post, CancellationToken cancellationToken);

    IAsyncEnumerable<Post> GetAllAsync(CancellationToken cancellationToken);

    Task<Post?> FindByPostIdAsync(Guid postId, CancellationToken cancellationToken);

    IAsyncEnumerable<Post> GetAllByUserIdAsync(Guid userId, CancellationToken cancellationToken);

    Task<Post> UpdateAsync(Post post, CancellationToken cancellationToken);

    Task DeleteAsync(Post post, CancellationToken cancellationToken);
}