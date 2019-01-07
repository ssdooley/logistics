using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Data.Migrations
{
    public partial class added_AuthorizedRegulationModel_renamedOriginaltoJustifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthorizedRegulation",
                table: "Request",
                newName: "Justifications");

            migrationBuilder.AddColumn<int>(
                name: "AuthorizedRegulationId",
                table: "Request",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AuthorizedRegulation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorizedRegulation", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_AuthorizedRegulation_AuthorizedRegulationId",
                table: "Request");

            migrationBuilder.DropTable(
                name: "AuthorizedRegulation");

            migrationBuilder.DropIndex(
                name: "IX_Request_AuthorizedRegulationId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "AuthorizedRegulationId",
                table: "Request");

            migrationBuilder.RenameColumn(
                name: "Justifications",
                table: "Request",
                newName: "AuthorizedRegulation");
        }
    }
}
