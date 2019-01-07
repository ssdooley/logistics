using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Data.Migrations
{
    public partial class added_AuthorizedRegulationModel_added_reference_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reference",
                table: "AuthorizedRegulation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reference",
                table: "AuthorizedRegulation");
        }
    }
}
