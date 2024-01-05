using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasamentoProject.Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMarriageSplitLocalColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Local",
                table: "Marriages",
                newName: "Street");

            migrationBuilder.AddColumn<string>(
                name: "Neighborhood",
                table: "Marriages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NumberAddress",
                table: "Marriages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Neighborhood",
                table: "Marriages");

            migrationBuilder.DropColumn(
                name: "NumberAddress",
                table: "Marriages");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "Marriages",
                newName: "Local");
        }
    }
}
