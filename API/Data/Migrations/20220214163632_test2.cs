using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class test2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Offers_AppOfferId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_AppOfferId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "AppOfferId",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "PublicId",
                table: "Photos",
                newName: "OfferId");

            migrationBuilder.AlterColumn<string>(
                name: "Path",
                table: "Photos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Offers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Offers_PhotoId",
                table: "Offers",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Photos_PhotoId",
                table: "Offers",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Photos_PhotoId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_PhotoId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Offers");

            migrationBuilder.RenameColumn(
                name: "OfferId",
                table: "Photos",
                newName: "PublicId");

            migrationBuilder.AlterColumn<string>(
                name: "Path",
                table: "Photos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "AppOfferId",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppOfferId",
                table: "Photos",
                column: "AppOfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Offers_AppOfferId",
                table: "Photos",
                column: "AppOfferId",
                principalTable: "Offers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
