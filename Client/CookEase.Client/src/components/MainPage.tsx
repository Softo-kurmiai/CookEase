import {RecipeCard} from "./MainComponents/RecipeCard";
import ResponsiveMenuBar from "./MainComponents/ResponsiveMenuBar";

export default function MainPage(){
    return (
        <>
        <ResponsiveMenuBar></ResponsiveMenuBar>
        <RecipeCard/>
        </>
    );
}