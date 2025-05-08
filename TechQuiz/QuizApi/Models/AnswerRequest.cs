namespace QuizApi.Models
{
    public class AnswerRequest
    {
        public int QuizId { get; set; }

        public string UserAnswer { get; set; } = string.Empty;
    }
}
