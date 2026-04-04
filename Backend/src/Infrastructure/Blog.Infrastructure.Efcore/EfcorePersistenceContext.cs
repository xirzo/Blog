using Blog.Application.Abstractions.Persistence;
using Blog.Application.Abstractions.Persistence.Repositories;

namespace Blog.Infrastructure.Efcore;

public class EfcorePersistenceContext : IPersistenceContext
{
    public EfcorePersistenceContext(IPostRepository postRepository, IUserRepository userRepository)
    {
        PostRepository = postRepository;
        UserRepository = userRepository;
    }

    public IPostRepository PostRepository { get; }

    public IUserRepository UserRepository { get; }
}