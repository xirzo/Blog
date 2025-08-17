using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.IO.Migrations
{
    /// <inheritdoc />
    public partial class _html_markdown_replace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HtmlContent",
                table: "Blogs",
                newName: "MarkdownContent");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MarkdownContent",
                table: "Blogs",
                newName: "HtmlContent");
        }
    }
}
