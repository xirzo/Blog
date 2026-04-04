using Blog.Application.Abstractions.Persistence;
using Blog.Application.Contracts.Posts;
using Blog.Application.Contracts.Posts.Models;
using Blog.Application.Contracts.Posts.Operations;
using Blog.Application.Models;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Services;

public class PostService : IPostService
{
    private readonly IPersistenceContext _context;

    public PostService(IPersistenceContext context)
    {
        _context = context;
    }

    public async Task<CreatePost.Response> CreatePostAsync(CreatePost.Request request, CancellationToken cancellationToken)
    {
        User? author = await _context.UserRepository.FindByUserIdAsync(request.AuthorId, cancellationToken);

        if (author is null)
        {
            return new CreatePost.Response.AuthorNotFound($"Author not found: {request.AuthorId}");
        }

        var post = new Post(
            PostId: Guid.NewGuid(),
            Name: request.Name,
            Description: request.Description,
            MarkdownContent: request.MarkdownContent,
            Created: DateTime.UtcNow,
            AuthorId: request.AuthorId);

        Post addedPost = await _context.PostRepository.AddAsync(post, cancellationToken);

        return new CreatePost.Response.Success(MapToDto(addedPost));
    }

    public async IAsyncEnumerable<PostDto> GetAllAsync([EnumeratorCancellation] CancellationToken cancellationToken)
    {
        await foreach (Post post in _context.PostRepository.GetAllAsync(cancellationToken))
        {
            yield return MapToDto(post);
        }
    }

    public async Task<PostDto?> FindByPostId(Guid postId, CancellationToken cancellationToken)
    {
        Post? post = await _context.PostRepository.FindByPostIdAsync(postId, cancellationToken);

        return post is null ? null : MapToDto(post);
    }

    public async Task<UpdatePost.Response> UpdatePostAsync(UpdatePost.Request request, CancellationToken cancellationToken)
    {
        Post? existing = await _context.PostRepository.FindByPostIdAsync(request.PostId, cancellationToken);

        if (existing is null)
        {
            return new UpdatePost.Response.PostRepositoryError($"Post not found: {request.PostId}");
        }

        Post updated = existing with
        {
            Name = request.Name ?? existing.Name,
            Description = request.Description ?? existing.Description,
            MarkdownContent = request.MarkdownContent ?? existing.MarkdownContent,
        };

        Post savedPost = await _context.PostRepository.UpdateAsync(updated, cancellationToken);

        return new UpdatePost.Response.Success(MapToDto(savedPost));
    }

    public async IAsyncEnumerable<PostDto> GetByUserIdAsync(Guid userId, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        await foreach (Post post in _context.PostRepository.GetAllByUserIdAsync(userId, cancellationToken))
        {
            yield return MapToDto(post);
        }
    }

    public async Task<DeletePost.Response> DeletePostAsync(DeletePost.Request request, CancellationToken cancellationToken)
    {
        Post? post = await _context.PostRepository.FindByPostIdAsync(request.PostId, cancellationToken);

        if (post is null)
        {
            return new DeletePost.Response.PostNotFound();
        }

        await _context.PostRepository.DeleteAsync(post, cancellationToken);

        return new DeletePost.Response.Success(MapToDto(post));
    }

    private static PostDto MapToDto(Post post)
    {
        return new PostDto(post.PostId, post.Name, post.Description, post.MarkdownContent, post.Created, post.AuthorId);
    }
}
