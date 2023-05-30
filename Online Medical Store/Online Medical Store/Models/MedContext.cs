using Microsoft.EntityFrameworkCore;

namespace Online_Medical_Store.Models
{
    public class MedContext : DbContext
    {
        public MedContext(DbContextOptions<MedContext> options) : base(options) { }
        public DbSet<Users> users { get; set; } = null!;
        public DbSet<Medicines> medicines { get; set; } = null!;
        public DbSet<Orders> orders { get; set; } = null!;
    }
}
