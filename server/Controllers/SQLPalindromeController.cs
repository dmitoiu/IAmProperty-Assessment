using System;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.WebEncoders.Testing;
using Npgsql;
using static System.Net.Mime.MediaTypeNames;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SQLPalindromeController : ControllerBase
    {
        public SQLPalindromeController()
        {
        }

        public static bool isPalindrome(string palindrome)
        {
            var builder = WebApplication.CreateBuilder();
            NpgsqlConnection _connPg = new NpgsqlConnection(builder.Configuration.GetConnectionString("DefaultConnection"));
            string sql = string.Format("SELECT  (reverse(REPLACE('{0}', ' ', '')) = REPLACE('{0}', ' ', ''))", palindrome);
            bool result = false;
            _connPg.Open();
            using (NpgsqlCommand command = new NpgsqlCommand(sql, _connPg))
            {
                NpgsqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    result = bool.Parse(reader[0].ToString());
                }
                _connPg.Close();
            }
            return result;
        }

        [HttpPost]
        public ActionResult<bool> GetSQLPalindrome([FromBody] string palindrome)
        {
            var result = isPalindrome(palindrome);
            return Ok(result);
        }
    }
}
