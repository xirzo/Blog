FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Blog.Web/Blog.Web.csproj", "Blog.Web/"]
COPY ["Blog.IO/Blog.IO.csproj", "Blog.IO/"]
COPY ["Blog.Core/Blog.Core.csproj", "Blog.Core/"]
RUN dotnet restore "Blog.Web/Blog.Web.csproj"
COPY . .
WORKDIR "/src/Blog.Web"
RUN dotnet build "./Blog.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Blog.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Blog.Web.dll"]
