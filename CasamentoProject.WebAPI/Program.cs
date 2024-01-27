using CasamentoProject.WebAPI.StartupExtensions;
using CasamentoProject.WebAPI.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Use(async (context, next) =>
{
    context.Request.EnableBuffering(); // Isso pode ser necessário para ler o corpo da solicitação mais de uma vez
    await next();
});

app.Run();
