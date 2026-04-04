using Blog.Application.Abstractions.Persistence.Repositories;

namespace Blog.Application.Abstractions.Persistence;

public interface IPersistenceContext
{
    IPostRepository PostRepository { get; }

    IUserRepository UserRepository { get; }
}