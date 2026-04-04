FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 6123

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["Blog.slnx", "Blog.slnx"]
COPY ["Directory.Build.props", "Directory.Build.props"]
COPY ["Directory.Packages.props", "Directory.Packages.props"]
COPY ["src/Blog/Blog.csproj", "src/Blog/"]
COPY ["src/Application/Blog.Application/Blog.Application.csproj", "src/Application/Blog.Application/"]
COPY ["src/Application/Blog.Application.Abstractions/Blog.Application.Abstractions.csproj", "src/Application/Blog.Application.Abstractions/"]
COPY ["src/Application/Blog.Application.Contracts/Blog.Application.Contracts.csproj", "src/Application/Blog.Application.Contracts/"]
COPY ["src/Application/Blog.Application.Models/Blog.Application.Models.csproj", "src/Application/Blog.Application.Models/"]
COPY ["src/Infrastructure/Blog.Infrastructure.Efcore/Blog.Infrastructure.Efcore.csproj", "src/Infrastructure/Blog.Infrastructure.Efcore/"]
COPY ["src/Presentation/Blog.Presentation.Rest/Blog.Presentation.Rest.csproj", "src/Presentation/Blog.Presentation.Rest/"]

RUN dotnet restore "Blog.slnx"

COPY . .
WORKDIR "/src/src/Blog"
RUN dotnet build "./Blog.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Blog.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://0.0.0.0:6123

ENTRYPOINT ["dotnet", "Blog.dll"]
