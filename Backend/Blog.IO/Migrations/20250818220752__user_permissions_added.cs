using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.IO.Migrations
{
    /// <inheritdoc />
    public partial class _user_permissions_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Permissions",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permissions",
                table: "Users");
        }
    }
}
