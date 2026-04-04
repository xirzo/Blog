using Blog.Application.Contracts.Posts.Models;
using Blog.Application.Contracts.Posts.Operations;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Contracts.Posts;

public interface IPostService
{
    Task<CreatePost.Response> CreatePostAsync(CreatePost.Request request, CancellationToken cancellationToken);

    IAsyncEnumerable<PostDto> GetAllAsync(CancellationToken cancellationToken);

    Task<PostDto?> FindByPostId(Guid postId, CancellationToken cancellationToken);

    IAsyncEnumerable<PostDto> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken);

    Task<UpdatePost.Response> UpdatePostAsync(UpdatePost.Request request, CancellationToken cancellationToken);

    Task<DeletePost.Response> DeletePostAsync(DeletePost.Request request, CancellationToken cancellationToken);
}