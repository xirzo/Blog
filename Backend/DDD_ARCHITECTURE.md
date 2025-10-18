# Domain-Driven Design Architecture

This backend now follows Domain-Driven Design (DDD) principles with clear separation of concerns.

## Project Structure

### Blog.Core (Domain + Application Layer)

#### Domain Layer (`Blog.Core/Domain`)
Contains the core business logic and domain model:

**Entities** (`Domain/Entities/`)
- Rich domain entities with behavior and business rules
- `User.cs`: User aggregate with password verification and permission management
- `Post.cs`: Blog post entity with validation and update logic
- Private setters enforce encapsulation
- Factory methods (`Create`, `Restore`) for object construction

**Value Objects** (`Domain/ValueObjects/`)
- Immutable value types that represent domain concepts
- `Email.cs`: Email address with validation
- `HashedPassword.cs`: Password hashing and verification logic
- Records ensure immutability

**Repositories** (`Domain/Repositories/`)
- Repository interfaces defining data access contracts
- `IUserRepository.cs`: User data access interface
- `IPostRepository.cs`: Post data access interface
- Defined in domain layer, implemented in infrastructure

**Domain Constants** (`Domain/`)
- `Permissions.cs`: Permission constants for authorization

#### Application Layer (`Blog.Core/Application`)
Contains use cases and application services:

**Services** (`Application/Services/`)
- `UserService.cs`: User registration and login use cases
- `JwtService.cs`: JWT token generation
- Orchestrates domain logic without containing business rules

### Blog.IO (Infrastructure Layer)
Contains implementation details and external concerns:

**Database** (`Db/`)
- `BlogDbContext.cs`: Entity Framework Core DbContext with entity configurations
- Value object conversions for persistence

**Repositories** (`Repositories/`)
- `DbUserRepository.cs`: User repository implementation using EF Core
- `DbPostRepository.cs`: Post repository implementation using EF Core

**Migrations**
- EF Core database migrations

### Blog.Web (Presentation Layer)
Contains HTTP API concerns:

**Controllers**
- `AuthController.cs`: Authentication endpoints
- `PostsController.cs`: Blog post CRUD endpoints
- Thin controllers that delegate to application services

**DTOs**
- Data Transfer Objects for API contracts

**Authorization**
- Custom permission-based authorization handlers

## Key DDD Principles Applied

### 1. Rich Domain Model
Entities contain business logic and enforce invariants:
```csharp
// Before (Anemic): Properties with public setters
public string Name { get; set; }

// After (Rich): Private setters with validation
public string Name { get; private set; }
public void Update(string? name, ...) {
    if (name != null && string.IsNullOrWhiteSpace(name))
        throw new ArgumentException("Name cannot be empty");
    Name = name;
}
```

### 2. Value Objects
Encapsulate domain concepts and validation:
```csharp
var email = Email.Create(emailString); // Validates format
var password = HashedPassword.Create(plainPassword); // Hashes automatically
```

### 3. Encapsulation
Entity creation through factory methods:
```csharp
var user = User.Create(name, email, password);
var post = Post.Create(name, description, content, authorId);
```

### 4. Separation of Concerns
- **Domain**: Business rules and logic
- **Application**: Use cases and workflows
- **Infrastructure**: Technical implementation
- **Presentation**: HTTP/API concerns

### 5. Dependency Inversion
Repository interfaces defined in domain, implemented in infrastructure

## Benefits of This Architecture

1. **Testability**: Domain logic isolated from infrastructure
2. **Maintainability**: Clear boundaries between layers
3. **Flexibility**: Easy to change infrastructure without affecting domain
4. **Business Focus**: Domain model reflects business language
5. **Protection**: Encapsulation prevents invalid states

## Migration Compatibility

The new architecture maintains database compatibility through:
- EF Core value conversions for Email and HashedPassword
- Same table structure and column names
- Existing migrations remain valid
