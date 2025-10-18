using Blog.Core.Domain.Entities;
using Blog.Core.Domain.Repositories;
using Blog.Core.Domain;
using Blog.Web.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers;

[ApiController]
[Route("posts")]
public class PostsController : ControllerBase
{
    private readonly IPostRepository _repository;

    public PostsController(IPostRepository repository)
    {
        _repository = repository;
    }
    
    [HttpPost]
    [Authorize(Policy = Permissions.Create)]
    public async Task<IActionResult> Create([FromBody] BlogCreateDto dto)
    {
        try
        {
            var blog = Post.Create(dto.Name, dto.Description, dto.MarkdownContent, dto.AuthorId);
            
            var created = await _repository.CreateAsync(blog);

            if (created == null)
            {
                return NotFound();
            }

            return Ok(blog);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? userId)
    {
        if (userId.HasValue)
        {
            return Ok(await _repository.GetByUserIdAsync(userId.Value));
        }

        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        return Ok(await _repository.GetByIdAsync(id));
    }
    
    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Update)]
    public async Task<IActionResult> UpdateById(Guid id, [FromBody] BlogUpdateDto dto)
    {
        var blog = await _repository.GetByIdAsync(id);

        if (blog == null)
        {
            return NotFound();
        }

        try
        {
            blog.Update(dto.Name, dto.Description, dto.MarkdownContent);
            await _repository.UpdateAsync(blog);
            return Ok(blog);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Delete)]
    public async Task<IActionResult> DeleteById(Guid id)
    {
        var isDeleted = await _repository.DeleteByIdAsync(id);

        if (isDeleted)
        {
            return NoContent();
        }

        return NotFound();
    }
}
