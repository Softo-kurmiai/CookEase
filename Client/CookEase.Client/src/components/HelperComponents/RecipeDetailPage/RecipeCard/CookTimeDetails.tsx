import React from 'react';
import { Typography, Stack } from '@mui/material';

export function CookTimeDetails({ Total = 0, Prep = 0, Cook = 0 , Difficulty = "Medium" }) {
    const constLabelsAndValues = [
        { label: 'Total: ', value: Total },
        { label: 'Prep: ', value: Prep },
        { label: 'Cook: ', value: Cook },
        { label: 'Difficulty: ', value: Difficulty },
    ];

    return (
        <Stack direction="row">
            {constLabelsAndValues.map((item, index) => (
                <React.Fragment key={index}>
                    <Typography variant="body1">{item.label}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, pr:'0.5rem' }}>
                        {Number.isInteger(item.value) ? `${item.value} min.` : item.value}
                    </Typography>
                </React.Fragment>
            ))}
        </Stack>
    );
}

export default CookTimeDetails;