using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class tlfnr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tlfnr",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "tlfnr",
                table: "Offers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tlfnr",
                table: "Offers");

            migrationBuilder.AddColumn<string>(
                name: "tlfnr",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
