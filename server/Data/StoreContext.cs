using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }
    }
}
