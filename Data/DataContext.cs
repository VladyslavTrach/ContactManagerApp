using ContactManagerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManagerApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<PersonModel> Persons { get; set; }
    }
}
