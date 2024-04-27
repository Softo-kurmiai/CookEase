import Stack from '@mui/material/Stack';
import RecipeDetailCard from "../components/HelperComponents/RecipeDetailPage/RecipeCard/RecipeDetailCard";
import LeaveReviewCard from "../components/HelperComponents/RecipeDetailPage/Reviews/LeaveReviewCard";
import CommentCard from '../components/HelperComponents/RecipeDetailPage/Reviews/CommentCard';

export default function RecipeDetails(){
    return (
        <>
            <Stack>
                <LeaveReviewCard></LeaveReviewCard>
                <CommentCard></CommentCard>
            </Stack>       
        </>
    );
}