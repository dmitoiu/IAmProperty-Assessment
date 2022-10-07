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
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connStr;
            if (env == "Development")
            {
                connStr = builder.Configuration.GetConnectionString("DefaultConnection");
            }
            else
            {
                var connURL = Environment.GetEnvironmentVariable("DATABASE_URL");
                connURL = connURL.Replace("postgres://", string.Empty);
                var pgUserPass = connURL.Split("@")[0];
                var pgHostPortDb = connURL.Split("@")[1];
                var pgHostPort = connURL.Split("/")[1];
                var pgDb = connURL.Split("/")[1];
                var pgUser = connURL.Split(":")[0];
                var pgPass = connURL.Split(":")[1];
                var pgHost = connURL.Split(":")[0];
                var pgPort = connURL.Split(":")[1];
                connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
            }
            NpgsqlConnection _connPg = new NpgsqlConnection(connStr);
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
