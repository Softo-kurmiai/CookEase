import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyCollectionPage from "./MyCollectionPage";
import FavoriteDisplay from "../MyFavorites/FavoriteDisplay";
import MyRecipesDisplay from "../MyRecipes/RecipesDisplay";

export default function ProfileTabPanel() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "80%", margin: "0 auto"}}>
      <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="my profile tab list"
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Tab
              label="My recipes"
              value="1"
              sx={{
                fontWeight: "bold",
              }}
            />
            <Tab
              label="My collections"
              value="2"
              sx={{
                fontWeight: "bold",
              }}
            />
            <Tab
              label="My favorites"
              value="3"
              sx={{
                fontWeight: "bold",
              }}
            />
          </TabList>
        <TabPanel value="1"><MyRecipesDisplay isEditable={true}/></TabPanel>
        <TabPanel value="2">
          <MyCollectionPage />
        </TabPanel>
        <TabPanel value="3"><FavoriteDisplay/></TabPanel>
      </TabContext>
    </Box>
  );
}
