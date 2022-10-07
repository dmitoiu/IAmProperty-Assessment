using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(options =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    string connStr;
    if (env == "Development")
    {
        connStr = builder.Configuration.GetConnectionString("DefaultConnection");
    }
    else
    {
        var connURL = Environment.GetEnvironmentVariable("DATABASE_URL");
        connURL = connURL.Replace("postgres://", string.Empty);
        var pgUserPass = connURL.Split("@")[0];
        var pgHostPortDb = connURL.Split("@")[1];
        var pgHostPort = connURL.Split("/")[1];
        var pgDb = connURL.Split("/")[1];
        var pgUser = connURL.Split(":")[0];
        var pgPass = connURL.Split(":")[1];
        var pgHost = connURL.Split(":")[0];
        var pgPort = connURL.Split(":")[1];
        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
    }
    options.UseNpgsql(connStr);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(options =>
{
    options.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});
//app.UseHttpsRedirection();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToController("Index", "Fallback");
});
app.Run();