namespace Application.DTOs.Token;

public class TokenResponse
{
    public int Id { get; set; }

    public string Value { get; set; }

    public int UserId { get; set; }

    public DateTime ExpiryDate { get; set; }
}
