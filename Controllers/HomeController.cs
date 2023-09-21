using ContactManagerApp.Data;
using ContactManagerApp.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Diagnostics;
using System.Formats.Asn1;
using System.Globalization;
using System.Globalization;
using System.IO;
using System.Numerics;
using System.Text.RegularExpressions;

namespace ContactManagerApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataContext _context;

        public HomeController(ILogger<HomeController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            List<PersonModel> users = _context.Persons.ToList();
            return View(users);
        }


        [HttpGet]
        public IActionResult EditUser(int id)
        {
            var user = _context.Persons.Where(u => u.Id == id).FirstOrDefault();
            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditUserInDb(PersonModel updatedPerson)
        {
            try
            {
                if (ModelState.IsValid && ValidateData(updatedPerson))
                {
                    // Find the existing user by ID
                    var existingUser = _context.Persons.Find(updatedPerson.Id);

                    if (existingUser == null)
                    {
                        // User not found
                        return Json(new { success = false, message = "User not found." });
                    }

                    // Update the existing user's properties with the new values
                    existingUser.Name = updatedPerson.Name;
                    existingUser.DateOfBirth = updatedPerson.DateOfBirth;
                    existingUser.Married = updatedPerson.Married;
                    existingUser.Phone = updatedPerson.Phone;
                    existingUser.Salary = updatedPerson.Salary;

                    // Save the changes to the database
                    _context.SaveChanges();

                    // Redirect back to the Index action to refresh the user list
                    return RedirectToAction("Index");
                }
                return Json(new { success = false, message = "Incorrect User Data. User not updated." });
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately.
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }




        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddUser(PersonModel person)
        {
            try
            {
                if (ModelState.IsValid && (ValidateData(person)))
                {
                    _context.Persons.Add(person);
                    _context.SaveChanges();
                    return RedirectToAction("Index");
                }
                return Json(new { success = false, message = "Incorrect User Data. User not added." });
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately.
                ModelState.AddModelError(string.Empty, "An error occurred while processing your request.");
                return View(person);
            }
        }

        [HttpPost]
        public IActionResult UploadCSV(IFormFile UserCSV)
        {
            try
            {
                if (UserCSV != null && UserCSV.Length > 0)
                {
                    using (var stream = new StreamReader(UserCSV.OpenReadStream()))
                    {
                        using (var csvReader = new CsvReader(stream, new CsvConfiguration(CultureInfo.InvariantCulture)))
                        {

                            var records = csvReader.GetRecords<CsvDataModel>().ToList();

                            foreach (var record in records)
                            {
                                if(ValidateData(record))
                                    {
                                    // Create a new PersonModel and populate it with the CSV data
                                    var person = new PersonModel
                                    {
                                        Name = record.Name,
                                        DateOfBirth = record.DateOfBirth,
                                        Married = record.Married,
                                        Phone = record.Phone,
                                        Salary = record.Salary
                                    };

                                    // Add the person to the database
                                    _context.Persons.Add(person);
                                }
                                
                            }

                            _context.SaveChanges();
                        }
                    }

                    // You can return a JSON response to indicate success if needed
                    return Json(new { success = true, message = "CSV file uploaded and data added to the database." });
                }

                // Handle the case where no file was uploaded
                return Json(new { success = false, message = "Please select a CSV file to upload." });
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately.
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }

        private bool ValidateData(CsvDataModel model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return false;
            }

            if (!DateTime.TryParse(model.DateOfBirth.ToString(), out _))
            {
                return false;
            }

            if ((model.Phone.Length != 10 || model.Phone.Length != 12 || model.Phone.Length != 13) && Regex.IsMatch(model.Phone, "[a-zA-Z]"))
            {
                return false;
            }

            if (model.Salary < 0)
            {
                return false;
            }

            return true;
        }

        private bool ValidateData(PersonModel model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return false;
            }

            if (!DateTime.TryParse(model.DateOfBirth.ToString(), out _))
            {
                return false;
            }

            if ((model.Phone.Length != 10 || model.Phone.Length != 12 || model.Phone.Length != 13) && Regex.IsMatch(model.Phone, "[a-zA-Z]"))
            {
                return false;
            }

            if (model.Salary < 0)
            {
                return false;
            }

            return true;
        }

        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                // Find the user by ID
                var user = _context.Persons.Find(id);

                if (user == null)
                {
                    // User not found
                    return Json(new { success = false, message = "User not found." });
                }

                // Remove the user from the database
                _context.Persons.Remove(user);
                _context.SaveChanges();

                return Json(new { success = true, message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately.
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}