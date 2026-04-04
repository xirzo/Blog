using Blog.Application.Contracts.Posts;
using Blog.Application.Contracts.Posts.Models;
using Blog.Application.Contracts.Posts.Operations;
using Blog.Presentation.Rest.Autherization;
using Blog.Presentation.Rest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Presentation.Rest.Controllers;

[ApiController]
[Route("posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpPost]
    [Authorize(Policy = BlogPermissions.Create)]
    public async Task<IActionResult> Create([FromBody] BlogCreateModel model, CancellationToken cancellationToken)
    {
        var request = new CreatePost.Request(model.Name, model.Description, model.MarkdownContent, model.AuthorId);
        CreatePost.Response result = await _postService.CreatePostAsync(request, cancellationToken);

        return result switch
        {
            CreatePost.Response.Success success => Ok(success.Post),
            CreatePost.Response.AuthorNotFound authorNotFound => NotFound(new { message = authorNotFound.Message }),
            CreatePost.Response.PostRepositoryError error => BadRequest(new { message = error.Message }),
            _ => BadRequest(),
        };
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? userId, CancellationToken cancellationToken)
    {
        var posts = new List<PostDto>();

        IAsyncEnumerable<PostDto> postsQuery = userId.HasValue
            ? _postService.GetByUserIdAsync(userId.Value, cancellationToken)
            : _postService.GetAllAsync(cancellationToken);

        await foreach (PostDto post in postsQuery)
        {
            posts.Add(post);
        }

        return Ok(posts);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        PostDto? post = await _postService.FindByPostId(id, cancellationToken);

        if (post is null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = BlogPermissions.Update)]
    public async Task<IActionResult> UpdateById(Guid id, [FromBody] BlogUpdateModel model, CancellationToken cancellationToken)
    {
        var request = new UpdatePost.Request(id, model.Name, model.Description, model.MarkdownContent);
        UpdatePost.Response result = await _postService.UpdatePostAsync(request, cancellationToken);

        return result switch
        {
            UpdatePost.Response.Success success => Ok(success.Post),
            UpdatePost.Response.AuthorNotFound notFound => NotFound(new { message = notFound.Message }),
            UpdatePost.Response.PostRepositoryError error => BadRequest(new { message = error.Message }),
            _ => BadRequest(),
        };
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = BlogPermissions.Delete)]
    public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
    {
        var request = new DeletePost.Request(id);
        DeletePost.Response result = await _postService.DeletePostAsync(request, cancellationToken);

        return result switch
        {
            DeletePost.Response.Success success => Ok(success.Post),
            DeletePost.Response.PostNotFound => NotFound(),
            DeletePost.Response.PostRepositoryError error => BadRequest(new { message = error.Message }),
            _ => BadRequest(),
        };
    }
}