using Application.DTOs;

namespace Application.Interfaces;

public interface IUserService {

    List<UserDTO> GetAll(int countPerPage, int page);
    UserDTO? GetById(int id);
    UserDTO Create(UserRequestDTO userDTO);
    UserDTO? Update(int id, UserRequestDTO userDTO);
    UserDTO? Delete(int id);
    }
