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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
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