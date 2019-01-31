using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Data.Migrations
{
    public partial class AddedAttachmentExtensionandUploadModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Attachment",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Attachment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Attachment");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Attachment");
        }
    }
}
