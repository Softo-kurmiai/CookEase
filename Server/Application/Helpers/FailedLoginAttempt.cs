
namespace Application.Helpers;
public class FailedLoginAttempt
{
    public DateTime FirstAttemptTime { get; set; }
    public int AttemptCount { get; set; }
}
