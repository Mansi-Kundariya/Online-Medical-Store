using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Online_Medical_Store.Models;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_MyAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<MedContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDatabase"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//For axios error...
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
            .AllowAnyMethod().AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "wwwroot")),
    RequestPath = "/wwwroot"
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
