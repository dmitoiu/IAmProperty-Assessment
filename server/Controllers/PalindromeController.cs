using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.WebEncoders.Testing;
using static System.Net.Mime.MediaTypeNames;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PalindromeController : ControllerBase
    {
        public PalindromeController()
        {
        }

        public static bool isPalindrome(string palindrome)
        {
            string clean = palindrome.Replace(" ", "").ToLower();
            int length = clean.Length;
            int forward = 0;
            int backward = length - 1;
            while (backward > forward)
            {
                char forwardChar = clean[forward++];
                char backwardChar = clean[backward--];
                if (forwardChar != backwardChar)
                    return false;
            }
            return true;
        }

        [HttpPost]
        public ActionResult<bool> GetPalindrome([FromBody] string palindrome)
        {
            var result = isPalindrome(palindrome);
            return Ok(result);
        }
    }
}