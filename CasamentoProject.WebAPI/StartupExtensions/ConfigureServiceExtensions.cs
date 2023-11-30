using CasamentoProject.Core.Domain.RepositoryContracts;
using CasamentoProject.Core.Identity;
using CasamentoProject.Core.ServiceContracts.AccountContracts;
using CasamentoProject.Core.ServiceContracts.MarriageContracts;
using CasamentoProject.Core.ServiceContracts.MarriageServices;
using CasamentoProject.Core.Services.AccountServices;
using CasamentoProject.Infrastucture.DbContext;
using CasamentoProject.Infrastucture.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CasamentoProject.WebAPI.StartupExtensions
{
    public static class ConfigureServiceExtensions
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));

                options.Filters.Add(new ConsumesAttribute("application/json"));

                // Adding the [Authorize] attribute as a global filter, to make authentication work
                //var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                //options.Filters.Add(new AuthorizeFilter(policy));

            });

            services.AddScoped<IMarriageAdderService, MarriageAdderService>();
            services.AddScoped<IMarriageUpdaterService, MarriageUpdaterService>();
            services.AddScoped<IMarriageDeleterService, MarriageDeleterService>();
            services.AddScoped<IMarriageGetterService, MarriageGetterService>();

            services.AddScoped<IMarriageRepository, MarriageRepository>();


            services.AddTransient<IJwtService, JwtService>();

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options
                    .UseSqlServer(configuration.GetConnectionString("Default"))
                    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(config =>
                {
                    config.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>()!)
                        .WithHeaders("Authorization", "origin", "accept", "content-type")
                        .WithMethods("GET", "POST", "PUT", "DELETE");
                });
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
            }).AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddUserStore<UserStore<ApplicationUser, ApplicationRole, ApplicationDbContext, Guid>>()
                .AddRoleStore<RoleStore<ApplicationRole, ApplicationDbContext, Guid>>();

            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,
                    ValidAudience = configuration["Jwt:Audience"],
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
                };
            });

            services.AddAuthorization(options => {});

            return services;
        }
    }
}
