using Blog.Core.UseCases;
using Blog.Web.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers;

[ApiController]
[Route("blogs")]
public class BlogController : ControllerBase
{
    private readonly IBlogRepository _repository;

    public BlogController(IBlogRepository repository)
    {
        _repository = repository;
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
    
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteById(Guid id)
    {
        var isDeleted = await _repository.DeleteByIdAsync(id);

        if (isDeleted)
        {
            return NoContent();
        }

        return NotFound();
    }
    
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateById(Guid id, [FromBody] BlogUpdateDto dto)
    {
        var blog =  await _repository.UpdateAsync(id, dto.Name, dto.Description, dto.MarkdownContent);

        if (blog == null)
        {
            return NotFound();
        }

        return Ok(blog);
    }
}
