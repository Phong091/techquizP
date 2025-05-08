namespace QuizApi.Models
{
    public class AnswerResponse
    {
        public bool IsCorrect { get; set; }

        public string CorrectAnswer { get; set; } = string.Empty;
    }
}
