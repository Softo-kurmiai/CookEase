import { Typography, Stack } from '@mui/material';

interface NutritionData {
    Cal: number,
    Fat: number,
    Carbs: number,
    Fiber: number,
    Sugar: number,
    Protein: number
}

export function NutritionInfoPerServing({ nutritionData }: { nutritionData: NutritionData }) {
    const nutritionLabels = [
        { label: 'Cal', value: nutritionData.Cal },
        { label: 'Fat', value: nutritionData.Fat },
        { label: 'Carbs', value: nutritionData.Carbs },
        { label: 'Fiber', value: nutritionData.Fiber },
        { label: 'Sugar', value: nutritionData.Sugar },
        { label: 'Protein', value: nutritionData.Protein },
    ];

    return (
        <>
            <Typography variant="h6" sx={{ pt: '0.75rem', fontWeight:"600"}}>Nutrition info per serving</Typography>
            <Stack spacing={1} sx={{ maxWidth: '20%', pt:"0.5rem"}} direction="row">
                {nutritionLabels.map((item, index) => (
                    <div key={index} style={{ 
                        backgroundColor: '#9BCD6D',
                        padding: "10px",
                        borderRadius:"5px",
                        boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;" }}>
                            <Typography variant="body1" color="white" sx={{ fontWeight:"600"}}>{item.value}{item.label !== 'Cal' ? 'g' : ''}</Typography>
                            <Typography variant="body1" color="white" sx={{ fontWeight:"600"}}>{item.label}</Typography>
                    </div>
                ))}
            </Stack>
        </>
    );
}

export default NutritionInfoPerServing;