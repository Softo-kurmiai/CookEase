import Grid from "@mui/material/Grid";
import AddCollectionButton from "../Collections/AddCollectionButton";
import CollectionCard from "../Collections/CollectionCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";

export function MyCollectionPage() {
  //Remove after we add api calls
  const numberOfCards = 8;

  const [page, setPage] = React.useState(1);
  //Remove after we add api calls
  const cardArray = Array.from({ length: numberOfCards }, (_, index) => index);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <AddCollectionButton />
      <Stack justifyContent="center" alignItems="center">
        <Grid container spacing={2}>
          {cardArray.map((index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CollectionCard />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{
            padding: "0.5rem",
          }}
        />
      </Stack>
    </>
  );
}

export default MyCollectionPage;
