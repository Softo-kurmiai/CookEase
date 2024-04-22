
using Application.DTOs;

namespace Application.Services
{
    public interface IUserService
    {
        List<UserDTO> GetAll();
        UserDTO? GetById(int id);
        UserDTO Create(UserDTO userDTO);
        UserDTO? Update(UserDTO userDTO);
        UserDTO? Delete(int id);

    }
    public class UserService : IUserService
    {
        public List<UserDTO> GetAll()
        {
            // TODO actually implement geting from repository
            List<UserDTO> users = new List<UserDTO>();
            UserDTO user = new UserDTO();
            user.Id = 69;
            users.Add(user);
            return users;
        }

        public UserDTO? GetById(int id)
        {
            //TODO actually implement geting from repository
            if (id == 69)
            {
                UserDTO user = new UserDTO();
                user.Id = 69;
                return user;
            }else
            {
                return null;
            }

        }

        public UserDTO Create(UserDTO userDTO)
        {
            //TODO actually implement creating to repository
            if (userDTO.Id == null)
            {
                UserDTO user = new UserDTO();
                user.Id = 69;
                return user;
            }
            else
            {
                return userDTO;
            }
        }

        public UserDTO Update(UserDTO userDTO)
        {
            //TODO actually implement upadting to repository
            if (userDTO.Id == 69)
            {
                return userDTO;
            }
            else
            {
                return null;
            }
        }

        public UserDTO Delete(int id)
        {
            //TODO actually implement deleting from repository
            if(id == 69)
            {
                UserDTO user = new UserDTO();
                user.Id = 69;
                return user;
            }else
            {
                return null;
            }
        }
    }
}
