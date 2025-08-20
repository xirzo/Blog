FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 6123

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["Blog.sln", "Blog.sln"]
COPY ["Blog.Web/Blog.Web.csproj", "Blog.Web/"]
COPY ["Blog.Adapters/Blog.Adapters.csproj", "Blog.Adapters/"]
COPY ["Blog.IO/Blog.IO.csproj", "Blog.IO/"]
COPY ["Blog.Core/Blog.Core.csproj", "Blog.Core/"]

RUN dotnet restore "Blog.sln"

COPY . .
WORKDIR "/src/Blog.Web"
RUN dotnet build "./Blog.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Blog.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://0.0.0.0:6123

ENTRYPOINT ["dotnet", "Blog.Web.dll"]
