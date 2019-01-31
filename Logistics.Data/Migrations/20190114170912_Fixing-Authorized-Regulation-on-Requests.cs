using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Data.Migrations
{
    public partial class FixingAuthorizedRegulationonRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_AuthorizedRegulation_AuthorizedRegulationId",
                table: "Request");

            migrationBuilder.DropIndex(
                name: "IX_Request_AuthorizedRegulationId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "AuthorizedRegulationId",
                table: "Request");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorizedRegulationId",
                table: "Request",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Request_AuthorizedRegulationId",
                table: "Request",
                column: "AuthorizedRegulationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_AuthorizedRegulation_AuthorizedRegulationId",
                table: "Request",
                column: "AuthorizedRegulationId",
                principalTable: "AuthorizedRegulation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
