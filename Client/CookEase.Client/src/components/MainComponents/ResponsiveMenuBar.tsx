import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import BlackLogo from "../../images/BlackLogo.png";
import SearchBar from "../HelperComponents/MenuBar/SearchBar";
import MenuBarProfile from "../HelperComponents/MenuBar/MenuBarProfile";
import AddRecipeButton from "../HelperComponents/MenuBar/AddRecipeButton";
import SignUpButton from "../HelperComponents/MenuBar/SignUpButton";
import LogInButton from "../HelperComponents/MenuBar/LogInButton";
import MenuBarCategories from "../HelperComponents/MenuBar/MenuBarCategories";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/Interfaces";

interface MenuBarProps {
  user: User | null;
  isAuthenticated: boolean;
}

function ResponsiveMenuBar(menuProps: MenuBarProps) {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#FFFFFF", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* CookEase icon */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 0 }}>
            <Link to="/">
              <img src={BlackLogo} alt="Logo" style={{ width: "150px" }} />
            </Link>
          </Box>

          <MenuBarCategories />
          <SearchBar />
          <Stack direction="row" spacing={1}>
            <AddRecipeButton display={menuProps.isAuthenticated} />
            <SignUpButton display={!menuProps.isAuthenticated} />
            <LogInButton display={!menuProps.isAuthenticated} />
            <MenuBarProfile source={menuProps.user?.profilePicture ?? ""} display={menuProps.isAuthenticated} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveMenuBar;
