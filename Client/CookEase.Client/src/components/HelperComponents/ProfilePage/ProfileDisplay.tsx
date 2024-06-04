import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface ProfileDisplayProps {
    Name: string;
    Followers: number;
    Following: number;
    Image: string | undefined;
}

export function ProfileDisplay({ profileDisplayProps }: { profileDisplayProps: ProfileDisplayProps }) {
    return (
        <Stack spacing={2} justifyContent="center" alignItems="center" sx={{
            pb:"1rem"
        }}>
            <Avatar
                alt="Your profile picture"
                src={profileDisplayProps.Image}
                sx={{ width: '7rem', height: '7rem' }} // Adjust size using rem units
            />
            <Typography variant="h5" sx={{ color: "#000000", fontWeight: 700 }}>
                {profileDisplayProps.Name}
            </Typography>
            <Stack direction="row" spacing={1}>
                <Typography variant="body1" sx={{ color: "#000000", mr: "0.5rem" }}>
                    {profileDisplayProps.Followers} followers
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                    {profileDisplayProps.Following} following
                </Typography>
            </Stack>
        </Stack>
    );
}

export default ProfileDisplay;


