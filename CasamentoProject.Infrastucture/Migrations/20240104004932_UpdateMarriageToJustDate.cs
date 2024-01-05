using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasamentoProject.Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMarriageToJustDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HourOfMarriage",
                table: "Marriages");

            migrationBuilder.RenameColumn(
                name: "DateOfMarriage",
                table: "Marriages",
                newName: "Date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Marriages",
                newName: "DateOfMarriage");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "HourOfMarriage",
                table: "Marriages",
                type: "time",
                nullable: true);
        }
    }
}
