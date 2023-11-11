using CasamentoProject.Core.DTO;
using CasamentoProject.Core.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CasamentoProject.WebAPI.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AccountController(SignInManager<ApplicationUser> signInManager,
           RoleManager<ApplicationRole> roleManager,
           UserManager<ApplicationUser> userManager
           )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> PostRegister(RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                string errorMessageRegister = string.Join(" , ",
                    ModelState.Values.SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage));

                return Problem(errorMessageRegister);
            }

            ApplicationUser? user = new ApplicationUser()
            {
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                UserName = registerDTO.Email,
                PersonName = registerDTO.Email,
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerDTO.Password!);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);

                return Ok(result);
            }

            string errorMessage = string.Join(" , ", result.Errors.Select(e => e.Description));

            return Problem(errorMessage);


        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin(LoginDTO login)
        {
            if (!ModelState.IsValid)
            {
                string errorMessageLogin = string.Join(" , ",
                    ModelState.Values.SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage));

                return Problem(errorMessageLogin);
            }

            var result = await _signInManager.PasswordSignInAsync(login.Email!, login.Password!, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                ApplicationUser? user = await _userManager.FindByEmailAsync(login.Email!);

                if (user == null)
                {
                    return NoContent();
                }

                await _userManager.UpdateAsync(user);

                return Ok(user);
            }
            else
            {
                return Problem("Invalid email or password");
            }
        }

        [HttpGet("logout")]
        public async Task<ActionResult> GetLogout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult> IsEmailAlreadyRegistered(string email)
        {
            ApplicationUser? user = await _userManager.FindByNameAsync(email);

            if (user == null)
            {
                return Ok(true);
            }

            return Ok(false);
        }
    }
}
