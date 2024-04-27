import { Avatar, Typography, Stack } from "@mui/material";
import Dessert from "../../../images/CategoryImages/dessert.jpg";
import Drinks from "../../../images/CategoryImages/drinks.jpg";
import Meat from "../../../images/CategoryImages/meat.jpg";
import Pancake from "../../../images/CategoryImages/pancake.jpg";
import Pasta from "../../../images/CategoryImages/pasta.jpg";
import Pizza from "../../../images/CategoryImages/pizza.jpeg";
import Salad from "../../../images/CategoryImages/salad.jpg";
import SeaFood from "../../../images/CategoryImages/sea_food.jpg";
import Soup from "../../../images/CategoryImages/soup.jpg";
import Vegan from "../../../images/CategoryImages/vegan.jpg";

export function FindByCategorySection() {
  const categoriesWithTags = [
    { src: Dessert, tag: "Dessert" },
    { src: Drinks, tag: "Drinks" },
    { src: Meat, tag: "Meat" },
    { src: Pancake, tag: "Pancake" },
    { src: Pasta, tag: "Pasta" },
    { src: Pizza, tag: "Pizza" },
    { src: Salad, tag: "Salad" },
    { src: SeaFood, tag: "Seafood" },
    { src: Soup, tag: "Soup" },
    { src: Vegan, tag: "Vegan" },
  ];

  return (
    <>
    <Typography variant="h6" align="center" sx={{fontWeight: 600}}>Find by category</Typography>
    <Stack direction="row" spacing={5} justifyContent="center" alignItems="center" >
      {categoriesWithTags.map((category, index) => (
        <Stack key={index} direction="column" alignItems="center">
          <Avatar src={category.src} alt={category.tag} sx={{ width: 64, height: 64 }} />
          <Typography variant="body1" align="center" sx={{fontWeight: 600}}>
            {category.tag}
          </Typography>
        </Stack>
      ))}
    </Stack>
    </>
  );
}
