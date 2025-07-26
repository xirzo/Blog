FROM mcr.microsoft.com/dotnet/runtime:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Blog/Blog.csproj", "Blog/"]
COPY ["Blog.Core/Blog.Core.csproj", "Blog.Core/"]
COPY ["Blog.IO/Blog.IO.csproj", "Blog.IO/"]
RUN dotnet restore "Blog/Blog.csproj"
COPY . .
WORKDIR "/src/Blog"
RUN dotnet build "./Blog.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Blog.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Blog.dll"]
