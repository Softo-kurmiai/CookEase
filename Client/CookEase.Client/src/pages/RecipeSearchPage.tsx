import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import { useAuth } from "../utils/AuthContext";
import { SearchResults } from "../components/HelperComponents/Search/SearchResults";

export function RecipeSearchPage (){
    const { user, isAuthenticated } = useAuth();
    return (
        <>
            <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
            <SearchResults></SearchResults>
        </>
    );
}

export default RecipeSearchPage;
