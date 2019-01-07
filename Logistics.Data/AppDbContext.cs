using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Logistics.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ApprovalGroup> ApprovalGroups { get; set; }
        public DbSet<ApprovalTemplate> ApprovalTemplates { get; set; }
        public DbSet<ApprovalTemplateGroup> ApprovalTemplateGroups { get; set; }
        public DbSet<Approver> Approvers { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<AuthorizedRegulation> AuthorizedRegulations { get; set; }
        public DbSet<FundingAccount> FundingAccounts { get; set; }
        public DbSet<FundTransaction> FundTransactions { get; set; }
        public DbSet<FundUser> FundUsers { get; set; }
        public DbSet<HandReceipt> HandReceipts { get; set; }
        public DbSet<HandReceiptItem> HandReceiptItems { get; set; }
        public DbSet<HandReceiptVerification> HandReceiptVerifications { get; set; }
        public DbSet<HardwareItem> HardwareItems { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<InventoryVerification> InventoryVerifications { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemDecommission> ItemDecommissions { get; set; }
        public DbSet<ItemDecommissionVerification> ItemDecommissionVerifications { get; set; }
        public DbSet<ItemGroup> ItemGroups { get; set; }
        public DbSet<ItemGroupApproval> ItemGroupApprovals { get; set; }
        public DbSet<ItemGroupCategory> ItemGroupCategories { get; set; }
        public DbSet<ItemReceipt> ItemReceipts { get; set; }
        public DbSet<LogUser> LogUsers { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<NsnItem> NsnItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderAttachment> OrderAttachments { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<PropertyCustodian> PropertyCustodians { get; set; }
        public DbSet<PropertyRecord> PropertyRecords { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestAttachment> RequestAttachments { get; set; }
        public DbSet<RequestItem> RequestItems { get; set; }
        public DbSet<SerializedItem> SerializedItems { get; set; }
        public DbSet<Site> Sites { get; set; }
        public DbSet<SoftwareItem> SoftwareItems { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<TransferItem> TransferItems { get; set; }
        public DbSet<TransferReceipt> TransferReceipts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attachment>()
                .HasDiscriminator<string>("AttachmentType")
                .HasValue<Attachment>("Base")
                .HasValue<OrderAttachment>("Order")
                .HasValue<RequestAttachment>("Request");

            modelBuilder.Entity<Item>()
                .HasDiscriminator<string>("ItemType")
                .HasValue<Item>("Base")
                .HasValue<NsnItem>("NonSerialized")
                .HasValue<SerializedItem>("Serialized")
                .HasValue<HardwareItem>("Hardware")
                .HasValue<SoftwareItem>("Software");

            modelBuilder.Entity<HandReceiptVerification>()
                .HasOne(x => x.LogUser)
                .WithMany(x => x.LogHandReceiptVerifications)
                .HasForeignKey(x => x.LogUserId)
                .IsRequired();

            modelBuilder.Entity<HandReceiptVerification>()
                .HasOne(x => x.RecordUser)
                .WithMany(x => x.RecordHandReceiptVerifications)
                .HasForeignKey(x => x.RecordUserId);

            modelBuilder.Entity<Transfer>()
                .HasOne(x => x.DestinationRecord)
                .WithMany(x => x.DestinationTransfers)
                .HasForeignKey(x => x.DestinationRecordId)
                .IsRequired();

            modelBuilder.Entity<Transfer>()
                .HasOne(x => x.OriginRecord)
                .WithMany(x => x.OriginTransfers)
                .HasForeignKey(x => x.OriginRecordId)
                .IsRequired();

            modelBuilder.Entity<FundTransaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(12,2)");

            foreach (var ent in modelBuilder.Model.GetEntityTypes().Select(x => x.Name))
            {
                modelBuilder.Entity(ent).ToTable(ent.Split('.').Last());
            }

            foreach (var ent in modelBuilder.Model.GetEntityTypes().SelectMany(x => x.GetReferencingForeignKeys()))
            {
                ent.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
