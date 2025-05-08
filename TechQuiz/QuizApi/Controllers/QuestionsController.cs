using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApi.Data;
using QuizApi.Models;

namespace QuizApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }

        [HttpPost("check-answer")]
        public async Task<IActionResult> CheckAnswer([FromBody] AnswerRequest req)
        {
            var q = await _context.Questions.FirstOrDefaultAsync(x => x.QuizId == req.QuizId);
            if (q == null) return NotFound();

            return Ok(new AnswerResponse
            {
                IsCorrect = req.UserAnswer == q.CorrectOption,
                CorrectAnswer = q.CorrectOption
            });
        }

        [HttpPost("submit-result")]
        public IActionResult SubmitResult([FromBody] ResultRequest result)
        {
            bool passed = result.TotalCorrect >= 8;
            return Ok(new
            {
                Passed = passed,
                result.TotalCorrect,
                result.TotalQuestions,
                result.DurationSeconds
            });
        }
    }
}
