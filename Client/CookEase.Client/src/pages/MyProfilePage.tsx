import ResponsiveMenuBar from "../components/MainComponents/ResponsiveMenuBar";
import ProfileDisplay from "../components/HelperComponents/ProfilePage/ProfileDisplay";
import Gabubu from "./../images/Gabubu.jpg"
import ProfileTabPanel from "../components/HelperComponents/ProfilePage/ProfileTabPanel";

export function MyProfilePage(){

    const profileToDisplay = {
        Name: "Gabubu",
        Followers: 2,
        Following: 52,
        Image: Gabubu
    }
    return (
        <>
            <ResponsiveMenuBar isAuthenticated={true} />
            <ProfileDisplay profileDisplayProps={profileToDisplay} />
            <ProfileTabPanel/>
        </>
    );
}

export default MyProfilePage; 