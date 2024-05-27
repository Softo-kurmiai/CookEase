using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Interfaces;


namespace Infrastructure.Repositories
{
    internal class TokenRepository : GenericRepository<Token>, ITokenRepository
    {
        private readonly DbSet<Token> _tokens;

        public TokenRepository(AppDbContext context) : base(context) 
        {
            _tokens = context.Set<Token>();
        }

        public async Task<Token?> GetTokenByValue(string tokenValue)
        {
            return await _tokens.Where(x => x.Value == tokenValue).SingleOrDefaultAsync();
        }
    }
}
