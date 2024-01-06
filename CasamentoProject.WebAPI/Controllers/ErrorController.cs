using Microsoft.AspNetCore.Mvc;

namespace CasamentoProject.WebAPI.Controllers
{
    [Route("errors/{code}")]
    public class ErrorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
