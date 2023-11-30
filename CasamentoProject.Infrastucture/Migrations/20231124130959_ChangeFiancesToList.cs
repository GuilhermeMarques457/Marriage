using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasamentoProject.Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFiancesToList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Marriages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhotoOfCouplePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfMarriage = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HourOfMarriage = table.Column<TimeSpan>(type: "time", nullable: true),
                    MoneyRaised = table.Column<double>(type: "float", nullable: true),
                    MoneyExpected = table.Column<double>(type: "float", nullable: true),
                    Local = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marriages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fiances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Idade = table.Column<int>(type: "int", nullable: true),
                    PhotoPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MarriageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fiances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fiances_Marriages_MarriageId",
                        column: x => x.MarriageId,
                        principalTable: "Marriages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Gifts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true),
                    Recieved = table.Column<bool>(type: "bit", nullable: false),
                    PhotoPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiftUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MarriageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gifts_Marriages_MarriageId",
                        column: x => x.MarriageId,
                        principalTable: "Marriages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Confirmed = table.Column<bool>(type: "bit", nullable: false),
                    GiftGiven = table.Column<bool>(type: "bit", nullable: false),
                    GiftType = table.Column<int>(type: "int", nullable: true),
                    MarriageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Guests_Marriages_MarriageId",
                        column: x => x.MarriageId,
                        principalTable: "Marriages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FamilyMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GuestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FamilyMembers_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FamilyMembers_GuestId",
                table: "FamilyMembers",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_Fiances_MarriageId",
                table: "Fiances",
                column: "MarriageId");

            migrationBuilder.CreateIndex(
                name: "IX_Gifts_MarriageId",
                table: "Gifts",
                column: "MarriageId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_MarriageId",
                table: "Guests",
                column: "MarriageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FamilyMembers");

            migrationBuilder.DropTable(
                name: "Fiances");

            migrationBuilder.DropTable(
                name: "Gifts");

            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropTable(
                name: "Marriages");
        }
    }
}
