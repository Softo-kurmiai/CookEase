using AutoMapper;
using Application.DTOs.Token;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using System.Security.Cryptography;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly ITokenRepository _tokenRepository;
        private readonly IMapper _mapper;

        public TokenService(ITokenRepository tokenRepository, IMapper mapper)
        {
            _tokenRepository = tokenRepository;
            _mapper = mapper;
        }

        public async Task<bool> ValidateTokenAsync(string userToken)
        {
            var dbToken = await _tokenRepository.GetTokenByValue(userToken);
            if (dbToken == null || dbToken.ExpiryDate < DateTime.UtcNow)
            {
                return false;
            }

            return true;
        }

        public async Task<TokenResponse> Create(int UserId, int expirationTimerMinutes = 60)
        {
            var tokenRecord = new Token();
            tokenRecord.UserId = UserId;
            tokenRecord.ExpiryDate = DateTime.UtcNow.AddMinutes(expirationTimerMinutes);
            tokenRecord.Value = GenerateToken();

            var tokenDbResponse = await _tokenRepository.Add(tokenRecord);
            if (tokenDbResponse is null)
            {
                throw new NullReferenceException();
            }

            var mappedToken = _mapper.Map<TokenResponse>(tokenDbResponse);


            return mappedToken;
        }
        private string GenerateToken()
        {
            var byteArray = new byte[64];
            RandomNumberGenerator.Fill(byteArray);
            return Convert.ToBase64String(byteArray);
        }
    }
}
