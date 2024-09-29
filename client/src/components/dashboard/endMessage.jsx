import { Box, Button, Grid2, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import configData from '../../config.json'

export const EndMessage = () => {
    return (
        <Box sx={{
            p: 5,
            bgcolor: (theme) => theme.palette['success'].light,
            color: (theme) => theme.palette['success'].darker,
            borderRadius: 2,
        }}>
            <Grid2 container spacing={3} justifyContent={'center'}
                alignItems={'center'}
            >
                <Grid2 item xs={11}>
                    <img src="/static/illustrations/dashboard-card.png" alt="dashboard" />
                </Grid2>
                <Grid2 item xs={12}>
                    <Typography variant="body" pb={2} >
                        Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
                    </Typography>


                </Grid2>
                <Grid2 item>
                    <Button variant="outlined"
                        component={RouterLink}
                        to={configData.USER_GROUPS_URL}
                    >
                        View Groups
                    </Button>
                </Grid2>

            </Grid2>
        </Box>
    )
}
