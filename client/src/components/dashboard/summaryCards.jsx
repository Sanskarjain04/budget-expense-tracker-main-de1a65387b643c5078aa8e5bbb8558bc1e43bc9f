import { Box, Grid2, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../Iconify';

export const SummaryCards = () => {
    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,
        display: 'flex', // Ensure icon is centered
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const hardcodedTotalExp = 38000; // Hardcoded total expenses

    return (
        <Grid2 container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid2 item xs={12} md={4}> {/* Changed md to 4 */}
                <Stack
                    spacing={2}
                    direction='row'
                    sx={{
                        bgcolor: (theme) => theme.palette['primary'].lighter,
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark }}>
                        <Iconify icon=":nimbus:invoice" sx={{ width: '100%', height: '100%', color: 'white' }} />
                    </LabelIconStyle>
                    <Box>
                        <Typography variant="caption2" sx={{ color: (theme) => theme.palette['primary'].dark }}>
                            Total
                        </Typography>
                        <Typography variant="h5" sx={{ color: (theme) => theme.palette['primary'].darker }}>
                            ₹ {hardcodedTotalExp.toLocaleString()} {/* Format the number with commas */}
                        </Typography>
                    </Box>
                </Stack>
            </Grid2>
        </Grid2>
    );
};
