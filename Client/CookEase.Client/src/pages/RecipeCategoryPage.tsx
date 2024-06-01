import { RecipeCategoryHeader } from "../components/HelperComponents/RecipeCategoryPage/RecipeCategoryHeader";
import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import { RecipeCategorySearchResults } from "../components/HelperComponents/RecipeCategoryPage/RecipeCategorySearchResults";
import Dessert from "../images/CategoryImages/dessert.jpg";
import Drinks from "../images/CategoryImages/drinks.jpg";
import Meat from "../images/CategoryImages/meat.jpg";
import Pancake from "../images/CategoryImages/pancake.jpg";
import Pasta from "../images/CategoryImages/pasta.jpg";
import Pizza from "../images/CategoryImages/pizza.jpeg";
import Salad from "../images/CategoryImages/salad.jpg";
import SeaFood from "../images/CategoryImages/sea_food.jpg";
import Soup from "../images/CategoryImages/soup.jpg";
import Vegan from "../images/CategoryImages/vegan.jpg";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


export function RecipeCategoryPage() {
  const { categoryName } = useParams();
  const { user, isAuthenticated } = useAuth();

  const categoryDetails = {
    Pasta: {
      name: "Simple pasta recipes",
      description:
        "Indulge in the art of pasta-making with a tantalizing array of recipes. From classic Spaghetti Carbonara to inventive Spinach and Ricotta Stuffed Shells, explore a world of flavors, textures, and sauces.",
      imageSrc: Pasta,
      imageAlt: "Pasta category image",
    },
    Pizza: {
      name: "Delicious pizza recipes",
      description:
        "Discover a variety of mouth-watering pizza recipes, from traditional Margherita to gourmet combinations. Explore the endless possibilities of toppings, sauces, and crusts.",
      imageSrc: Pizza,
      imageAlt: "Pizza category image",
    },
    Meat: {
      name: "Savory meat dishes",
      description:
        "Satisfy your carnivorous cravings with our collection of savory meat dishes. From juicy steaks to tender roasts, explore a world of flavors and cooking techniques.",
      imageSrc: Meat,
      imageAlt: "Meat category image",
    },
    Salads: {
      name: "Fresh and vibrant salads",
      description:
        "Experience the freshness and vibrancy of our collection of salads. From crisp greens to colorful vegetables, explore a variety of textures and flavors.",
      imageSrc: Salad,
      imageAlt: "Salad category image",
    },
    Dessert: {
      name: "Irresistible dessert delights",
      description:
        "Indulge your sweet tooth with our irresistible dessert delights. From decadent cakes to creamy puddings, satisfy your cravings with our delectable desserts.",
      imageSrc: Dessert,
      imageAlt: "Dessert category image",
    },
    Vegan: {
      name: "Delicious vegan recipes",
      description:
        "Explore the delicious world of vegan cuisine with our collection of plant-based recipes. From hearty mains to delectable desserts, discover flavorful vegan dishes for every occasion.",
      imageSrc: Vegan,
      imageAlt: "Vegan category image",
    },
    Pancake: {
      name: "Fluffy pancake recipes",
      description:
        "Start your day with our fluffy pancake recipes. From classic buttermilk to creative toppings, enjoy a delicious breakfast that's perfect for any morning.",
      imageSrc: Pancake,
      imageAlt: "Pancake category image",
    },
    Soup: {
      name: "Comforting soup recipes",
      description:
        "Warm up with our comforting soup recipes. From hearty stews to creamy bisques, find the perfect bowl of soup to cozy up with on a chilly day.",
      imageSrc: Soup,
      imageAlt: "Soup category image",
    },
    Drink: {
      name: "Refreshing drink recipes",
      description:
        "Quench your thirst with our refreshing drink recipes. From fruity smoothies to classic cocktails, discover a variety of beverages to suit every taste.",
      imageSrc: Drinks,
      imageAlt: "Drinks category image",
    },
    Seafood: {
      name: "Delicious seafood dishes",
      description:
        "Dive into a world of delicious seafood dishes. From succulent shrimp to tender fish fillets, explore a variety of flavors and cooking styles.",
      imageSrc: SeaFood,
      imageAlt: "Seafood category image",
    },
  };

  if (!categoryName || !(categoryName in categoryDetails)) {
    return <Link to="/404">Go to 404 page</Link>;
  }

  const validCategoryName = categoryName as keyof typeof categoryDetails;

  const { name, description, imageSrc, imageAlt } = categoryDetails[validCategoryName];

  return (
    <>
      <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
      <RecipeCategoryHeader
        name={name}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      ></RecipeCategoryHeader>
      <RecipeCategorySearchResults categoryName={categoryName}></RecipeCategorySearchResults>
    </>
  );
}

export default RecipeCategoryPage;
