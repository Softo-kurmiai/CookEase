import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import BlackLogo from "../../images/BlackLogo.png";
import SearchBar from "../HelperComponents/MenuBar/SearchBar";
import MenuBarProfile from "../HelperComponents/MenuBar/MenuBarProfile";
import ProfilePicutre from "../../images/Gabubu.jpg";
import AddRecipeButton from "../HelperComponents/MenuBar/AddRecipeButton";
import SignUpButton from "../HelperComponents/MenuBar/SignUpButton";
import LogInButton from "../HelperComponents/MenuBar/LogInButton";
import MenuBarCategories from "../HelperComponents/MenuBar/MenuBarCategories";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

interface MenuBarProps {
  isAuthenticated: boolean;
}

function ResponsiveMenuBar({ isAuthenticated = false }: MenuBarProps) {
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
            <AddRecipeButton display={isAuthenticated} />
            <SignUpButton display={!isAuthenticated} />
            <LogInButton display={!isAuthenticated} />
            <MenuBarProfile source={ProfilePicutre} display={isAuthenticated} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveMenuBar;
