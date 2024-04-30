using Application.DTOs.Comment;
using AutoMapper;
using Infrastructure.Models;

namespace CookEase.Api.AutoMapper.Profiles;

public class CommentProfile : Profile
{
    public CommentProfile()
    {
        CreateMap<CommentCreateRequest, Comment>();
        CreateMap<Comment, CommentResponse>();
    }
}