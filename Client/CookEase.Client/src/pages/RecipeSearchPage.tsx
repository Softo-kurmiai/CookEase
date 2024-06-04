import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import { useAuth } from "../utils/AuthContext";
import { SearchResults } from "../components/HelperComponents/Search/SearchResults";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { showToastError} from "../utils/Notifications/toastUtils";
import CustomToastContainer from "../utils/Notifications/CustomToastContainer";
import axios from 'axios';

export function RecipeSearchPage (){

    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('searchTerm');
    const [searchResults, SetSearchResults] = useState([]);

    //TODO: change to not be hardcoded values
    const recipesPerPage = 20;
    const page = 1

    useEffect(() => {
        const handleSearch = async () => {
          try {
            const response = await axios.get(`api/recipes/search?searchTerm=${searchTerm}&recipesPerPage=${recipesPerPage}&page=${page}`);
            SetSearchResults(response.data);
          } catch (error) {
            showToastError("Could not return search results");
          }
        };
      
        handleSearch();
      }, [searchTerm]);


    

    const { user, isAuthenticated } = useAuth();
    return (
        <>
            <CustomToastContainer/>
            <ResponsiveMenuBar user={user} isAuthenticated={isAuthenticated}></ResponsiveMenuBar>
            <SearchResults searchResults={searchResults}></SearchResults>
        </>
    );
}

export default RecipeSearchPage;
