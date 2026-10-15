using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using SaloSaloTable.Models;

namespace SaloSaloTable.Controllers
{
    public class AccountController : Controller
    {
        private static List<EmployeeModel> employees =
            new List<EmployeeModel>();

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Registration()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            var employee = employees.FirstOrDefault(e =>
                e.username == username &&
                e.password == password
            );


            if (employee != null)
            {
                Session["Username"] = employee.username;

                return Json(new
                {
                    success = true,
                    redirect = Url.Action("Index", "Home")
                });
            }


            return Json(new
            {
                success = false,
                message = "Invalid username or password."
            });
        }


        [HttpGet]
        public JsonResult GetUsername()
        {
            string username = "";

            if (Session["Username"] != null)
            {
                username = Session["Username"].ToString();
            }

            return Json(
                username,
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpGet]
        public JsonResult GetEmployees()
        {
            return Json(
                employees,
                JsonRequestBehavior.AllowGet
            );
        }


        [HttpPost]
        public JsonResult SaveEmployee(EmployeeModel employee)
        {
            if (employee == null)
            {
                return Json(new
                {
                    success = false,
                    message = "Employee information is required."
                });
            }


            bool employeeExists = employees.Any(e =>
                e.employeeId == employee.employeeId
            );


            bool usernameExists = employees.Any(e =>
                e.username == employee.username
            );


            if (employeeExists)
            {
                return Json(new
                {
                    success = false,
                    message = "Employee ID already exists."
                });
            }


            if (usernameExists)
            {
                return Json(new
                {
                    success = false,
                    message = "Username already exists."
                });
            }


            employees.Add(employee);


            return Json(new
            {
                success = true,
                message = "Employee registered successfully."
            });
        }


        [HttpPost]
        public JsonResult UpdateEmployee(EmployeeModel employee)
        {
            if (employee == null)
            {
                return Json(new
                {
                    success = false,
                    message = "Employee information is required."
                });
            }


            var existingEmployee = employees.FirstOrDefault(e =>
                e.employeeId == employee.employeeId
            );


            if (existingEmployee == null)
            {
                return Json(new
                {
                    success = false,
                    message = "Employee not found."
                });
            }


            existingEmployee.firstName =
                employee.firstName;

            existingEmployee.lastName =
                employee.lastName;

            existingEmployee.position =
                employee.position;

            existingEmployee.email =
                employee.email;

            existingEmployee.contactNumber =
                employee.contactNumber;

            existingEmployee.username =
                employee.username;

            existingEmployee.password =
                employee.password;

            existingEmployee.confirmPassword =
                employee.confirmPassword;

            existingEmployee.address =
                employee.address;


            return Json(new
            {
                success = true,
                message = "Employee updated successfully."
            });
        }

        [HttpPost]
        public JsonResult DeleteEmployee(string employeeId)
        {
            var employee = employees.FirstOrDefault(e =>
                e.employeeId == employeeId
            );


            if (employee == null)
            {
                return Json(new
                {
                    success = false,
                    message = "Employee not found."
                });
            }


            employees.Remove(employee);


            return Json(new
            {
                success = true,
                message = "Employee deleted successfully."
            });
        }
    }
}