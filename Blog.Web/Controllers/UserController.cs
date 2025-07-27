using Blog.Core.Entities;
using Blog.Core.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers;

public class UserController : ControllerBase
{
    private readonly IUserRepository _repository;

    public UserController(IUserRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        var createdUser = await _repository.AddAsync(user);

        if (createdUser == null)
        {
            return BadRequest();
        }

        return CreatedAtAction(nameof(CreateUser), new {id = createdUser.Id}, createdUser);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<User>> GetUserByIdAsync(Guid id)
    {
        var user = await _repository.FindByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }
}