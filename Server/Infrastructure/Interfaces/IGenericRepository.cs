﻿namespace Infrastructure.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<List<T>> ListAsync(int offset, int limit);

    Task<T?> GetById(int id);

    Task<T?> GetByCombinedId(int id1, int id2);

    Task<T> Add(T entity);

    Task AddRangeAsync(IEnumerable<T> entities);

    Task<T> Update(T entity, uint? originalVersion = null);

    Task<T?> Delete(int id);

    Task<T?> DeleteByCombinedId(int id1, int id2);

    Task Detach(T entity);
}