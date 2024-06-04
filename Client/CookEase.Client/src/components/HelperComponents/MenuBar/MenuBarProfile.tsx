import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MenuBarProfileProps {
    source?: string;
    display: boolean;
}

export default function MenuBarProfile({ source, display }: MenuBarProfileProps){
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { handleLogout } = useAuth(); // Use the handleLogout function from AuthContext

    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleViewProfile = () => {
        navigate('/MyProfilePage');
    }

    return (
        <Box sx={{ flexGrow: 0, display: display ? 'block' : 'none' }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={source} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => {
            handleCloseUserMenu();
            handleViewProfile();
          }}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => {
              handleCloseUserMenu();
              handleLogout();
              navigate('/', { state: { toastMessage: "Successfully logged out" } });
            }}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
}