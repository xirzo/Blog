using Blog.Application.Contracts.Users.Operations;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Application.Contracts.Users;

public interface IUserService
{
    Task<RegisterUser.Response> RegisterAsync(RegisterUser.Request request, CancellationToken cancellationToken);

    Task<LoginUser.Response> LoginAsync(LoginUser.Request request, CancellationToken cancellationToken);
}