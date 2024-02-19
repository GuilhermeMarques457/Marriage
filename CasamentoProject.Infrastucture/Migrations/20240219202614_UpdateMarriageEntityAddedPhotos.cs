using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasamentoProject.Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMarriageEntityAddedPhotos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoOfBridePath",
                table: "Marriages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoOfGroomPath",
                table: "Marriages",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoOfBridePath",
                table: "Marriages");

            migrationBuilder.DropColumn(
                name: "PhotoOfGroomPath",
                table: "Marriages");
        }
    }
}
