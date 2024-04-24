import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import BlackLogo from '../../images/BlackLogo.png'
import SearchBar from '../HelperComponents/MenuBar/SearchBar';
import MenuBarProfile from '../HelperComponents/MenuBar/MenuBarProfile';
import ProfilePicutre from '../../images/Gabubu.jpg'
import AddRecipeButton from '../HelperComponents/MenuBar/AddRecipeButton';
import SignUpButton from '../HelperComponents/MenuBar/SignUpButton';
import LogInButton from '../HelperComponents/MenuBar/LogInButton';
import MenuBarCategories from '../HelperComponents/MenuBar/MenuBarCategories';
import Stack from '@mui/material/Stack';

function ResponsiveMenuBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* CookEase icon */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
          <img
              src={BlackLogo}
              alt="Logo"
              style={{ width: '100px'}}
            />
          </Box>
          
          <MenuBarCategories/>
          <SearchBar/>
          <Stack direction="row" spacing={1}>
            <AddRecipeButton/>
            <SignUpButton display={true}/>
            <LogInButton display={true}/>
            <MenuBarProfile source={ProfilePicutre} display={false}/>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveMenuBar;