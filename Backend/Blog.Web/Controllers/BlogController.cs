using Blog.Core.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers;

[ApiController]
[Route("blog")]
public class BlogController : ControllerBase
{
    private readonly IBlogRepository _repository;

    public BlogController(IBlogRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _repository.GetAllAsync());
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        return Ok(await _repository.GetById(id));
    }
}
