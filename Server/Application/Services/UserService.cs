
using Application.DTOs;
using Application.Interfaces;

namespace Application.Services;

public class UserService : IUserService {

    public List<UserDTO> GetAll(int countPerPage, int page) {

        // TODO actually implement geting from repository
        List<UserDTO> users = new List<UserDTO>();
        UserDTO user = new UserDTO();
        user.Id = 69;
        users.Add(user);

        return users;
    }

    public UserDTO? GetById(int id) {

        //TODO actually implement geting from repository
        if (id == 69) {

            UserDTO user = new UserDTO();
            user.Id = 69;

            return user;
        } else {

            return null;
        }
    }

    public UserDTO Create(UserRequestDTO userRequestDTO) {

        //TODO actually implement creating to repository
            UserDTO user = new UserDTO();
            user.Id = 69;

            return user;
    }

    public UserDTO Update(int id, UserRequestDTO userRequestDTO) {

        //TODO actually implement upadting to repository
        if (id == 69) {

            UserDTO user = new UserDTO();
            user.Id = 69;

            return user;
        } else {

            return null;
        }
    }

    public UserDTO Delete(int id) {

        //TODO actually implement deleting from repository
        if(id == 69) {

            UserDTO user = new UserDTO();
            user.Id = 69;

            return user;
        } else {

            return null;
        }
    }
}