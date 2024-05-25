﻿using Application.DTOs.Recipe;
using Application.DTOs.User;
using AutoMapper;
using CookEase.Api.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CookEase.Api.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<List<UserResponse>> GetAll(int countPerPage = 20, int page = 1)
    {
        var offset = countPerPage * (page - 1);

        var users = await _userRepository.ListAsync(offset, countPerPage);

        var mappedUsers = _mapper.Map<List<UserResponse>>(users);

        return mappedUsers;
    }

    public async Task<UserResponse?> GetById(int id)
    {

        var user = await _userRepository.GetById(id);

        var mappedUser = _mapper.Map<UserResponse>(user);

        return mappedUser;
    }

    public async Task<UserResponse> Create(UserCreateRequest userCreateRequest)
    {
        var user = _mapper.Map<User>(userCreateRequest);

        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = null;

        var userDbResponse = await _userRepository.Add(user);

        var mappedUser = _mapper.Map<UserResponse>(userDbResponse);

        return mappedUser;
    }

    public async Task<UserResponse?> Update(int id, UserUpdateRequest request)
    {
        var user = await _userRepository.GetById(id);
        if (user is null)
        {
            return null;
        }

        user.Name = request.Name;
        user.Email = request.Email;
        user.Password = request.Password;
        user.Description = request.Description;
        user.ProfilePicture = request.ProfilePicture;
        user.UpdatedAt = DateTime.UtcNow;

        try
        {
            var userDBResponse = await _userRepository.Update(user, request.Version);
            var mappedUser = _mapper.Map<UserResponse>(userDBResponse);
            return mappedUser;
        }
        catch (DbUpdateConcurrencyException ex)
        {
            var entry = ex.Entries.Single();
            var clientValues = (User)entry.Entity;
            clientValues.Version = request.Version;

            var databaseEntry = entry.GetDatabaseValues();
            if (databaseEntry == null)
            {
                throw new DbUpdateConcurrencyException("Unable to save changes. The object was deleted by another user.");
            }

            var dbValues = (User)databaseEntry.ToObject();

            // Create a simplified version of the conflicting data
            var conflictData = new
            {
                Message = "The record you attempted to edit was modified by another user.",
                ClientValues = new
                {
                    clientValues.Id,
                    clientValues.Name,
                    clientValues.Email,
                    clientValues.Password,
                    clientValues.Description,
                    clientValues.ProfilePicture,
                    clientValues.UpdatedAt,
                    clientValues.Version
                },
                DatabaseValues = new
                {
                    dbValues.Id,
                    dbValues.Name,
                    dbValues.Email,
                    dbValues.Password,
                    dbValues.Description,
                    dbValues.ProfilePicture,
                    dbValues.UpdatedAt,
                    dbValues.Version
                }
            };

            throw new DbUpdateConcurrencyException("Concurrency conflict", ex)
            {
                Data =
                {
                    { "ConflictData", conflictData }
                }
            };
        }
    }

    public async Task<UserResponse?> Delete(int id)
    {
        var userDbResponce = await _userRepository.Delete(id);
        if (userDbResponce is null)
        {
            return null;
        }

        var mappedUser = _mapper.Map<UserResponse>(userDbResponce);

        return mappedUser;
    }
}