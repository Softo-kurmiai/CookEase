using Application.DTOs;

namespace Application.Interfaces {

    public interface IUserService {

        List<UserDTO> GetAll(int? countPerPage, int? page);
        UserDTO? GetById(int id);
        UserDTO Create(UserDTO userDTO);
        UserDTO? Update(UserDTO userDTO);
        UserDTO? Delete(int id);
    }
}
