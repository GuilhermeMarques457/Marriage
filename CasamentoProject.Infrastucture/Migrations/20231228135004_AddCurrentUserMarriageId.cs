using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasamentoProject.Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentUserMarriageId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiftMoney_Guests_GuestId",
                table: "GiftMoney");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GiftMoney",
                table: "GiftMoney");

            migrationBuilder.RenameTable(
                name: "GiftMoney",
                newName: "GiftsMoney");

            migrationBuilder.RenameIndex(
                name: "IX_GiftMoney_GuestId",
                table: "GiftsMoney",
                newName: "IX_GiftsMoney_GuestId");

            migrationBuilder.AddColumn<Guid>(
                name: "CurrentUserId",
                table: "Marriages",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_GiftsMoney",
                table: "GiftsMoney",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GiftsMoney_Guests_GuestId",
                table: "GiftsMoney",
                column: "GuestId",
                principalTable: "Guests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GiftsMoney_Guests_GuestId",
                table: "GiftsMoney");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GiftsMoney",
                table: "GiftsMoney");

            migrationBuilder.DropColumn(
                name: "CurrentUserId",
                table: "Marriages");

            migrationBuilder.RenameTable(
                name: "GiftsMoney",
                newName: "GiftMoney");

            migrationBuilder.RenameIndex(
                name: "IX_GiftsMoney_GuestId",
                table: "GiftMoney",
                newName: "IX_GiftMoney_GuestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GiftMoney",
                table: "GiftMoney",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GiftMoney_Guests_GuestId",
                table: "GiftMoney",
                column: "GuestId",
                principalTable: "Guests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
