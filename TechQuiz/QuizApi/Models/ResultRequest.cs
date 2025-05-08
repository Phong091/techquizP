namespace QuizApi.Models
{
    public class ResultRequest
    {
        public int TotalCorrect { get; set; }

        public int TotalQuestions { get; set; }

        public int DurationSeconds { get; set; }
    }
}
