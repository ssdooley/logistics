using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Data.Migrations
{
    public partial class AddMissiontoRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Mission",
                table: "Request",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mission",
                table: "Request");
        }
    }
}
