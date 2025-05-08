using Microsoft.EntityFrameworkCore;
using QuizApi.Models;

namespace QuizApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            if (Questions.Any()) return;

            Questions.AddRange([
                new Question { Text = "What is the correct order of SQL clauses in a SELECT statement?",  OptionA = "FROM → SELECT → WHERE → ORDER BY", OptionB = "SELECT → FROM → WHERE → ORDER BY", OptionC = "WHERE → SELECT → FROM → ORDER BY", OptionD = "SELECT → WHERE → FROM → ORDER BY", CorrectOption = "B" },
                new Question { Text = "Which collection guarantees unique elements?", OptionA = "List", OptionB = "Array", OptionC = "HashSet", OptionD = "Queue", CorrectOption = "C" },
                new Question { Text = "What is the default access modifier for a class in C#?", OptionA = "public", OptionB = "internal", OptionC = "private", OptionD = "protected", CorrectOption = "B" },
                new Question { Text = "Which LINQ method returns the first matching element?", OptionA = "Where", OptionB = "Select", OptionC = "FirstOrDefault", OptionD = "ToList", CorrectOption = "C" },
                new Question { Text = "What does async keyword do?", OptionA = "Runs code on another computer", OptionB = "Allows using await inside method", OptionC = "Pauses the app", OptionD = "Blocks main thread", CorrectOption = "B" },
                new Question { Text = "Which interface is used for data querying in LINQ?", OptionA = "IQueryable", OptionB = "IEnumerable", OptionC = "IAsyncResult", OptionD = "IDisposable", CorrectOption = "A" },
                new Question { Text = "Which of the following types will have a default value other than 'null' when declared but not assigned?", OptionA = "string", OptionB = "object", OptionC = "int", OptionD = "class", CorrectOption = "C" },
                new Question { Text = "What is the purpose of a 'using' statement when working with 'IDisposable' objects?", OptionA = "It imports other namespaces", OptionB = "It handles memory leaks", OptionC = "It automatically disposes the object after use", OptionD = "It opens external files", CorrectOption = "C" },
                new Question { Text = "Which of the following types will have a default value of 'null' when declared but not assigned?", OptionA = "int", OptionB = "bool", OptionC = "string", OptionD = "double", CorrectOption = "C" },
                new Question { Text = "What does 'var' mean in C#?", OptionA = "Variable must be string", OptionB = "Variable has dynamic type", OptionC = "Compiler infers the type", OptionD = "Creates anonymous class", CorrectOption = "C" },
                new Question { Text = "Which SQL JOIN returns only the rows that have matching values in both tables?", OptionA = "LEFT JOIN", OptionB = "RIGHT JOIN", OptionC = "FULL OUTER JOIN", OptionD = "INNER JOIN", CorrectOption = "D" }
            ]);

            SaveChanges();
        }

        public DbSet<Question> Questions { get; set; } = null!;
    }
}
