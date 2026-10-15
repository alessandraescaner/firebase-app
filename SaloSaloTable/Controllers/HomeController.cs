using System.Web.Mvc;

namespace _SaloSaloTable.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.WelcomeMessage = "Welcome to Salo-Salo Table!";
            ViewBag.Tagline = "Where every meal brings us together.";

            return View();
        }

        public ActionResult Registration()
        {
            return View("~/Views/Account/Registration.cshtml");
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}