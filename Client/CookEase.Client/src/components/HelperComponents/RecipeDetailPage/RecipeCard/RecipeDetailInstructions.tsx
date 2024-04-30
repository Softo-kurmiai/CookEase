import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Stack } from '@mui/material';
import {InstructionIndex} from './InstructionIndex';

export function RecipeDetailInstructions({ instructions = "none" }) {
    const instructionsList = instructions.split(/[\r\n]+/).map((instruction, index) => (
        <li key={index}>
            <Grid container spacing={4}>
                <Grid xs={1} alignItems="center" justifyContent="center">
                    <InstructionIndex index={index}></InstructionIndex>
                </Grid>
                <Grid xs={10} alignItems="center" justifyContent="center">
                    <Typography variant="body1" sx={{ pt:"0.6rem"}}>{instruction}</Typography>
                </Grid>
            </Grid>
        </li>
    ));

    return (
        <Stack>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Instructions: </Typography>
            <ul style={{ listStyleType: 'none' }}>
                {instructionsList}
            </ul>
        </Stack>
    );
}

export default RecipeDetailInstructions;
