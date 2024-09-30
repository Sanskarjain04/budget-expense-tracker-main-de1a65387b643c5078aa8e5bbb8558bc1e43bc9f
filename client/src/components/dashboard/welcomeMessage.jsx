import { Box, Button, Grid2, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import configData from '../../config.json'

export const WelcomeMessage = () => {
    return (
        <Box
            sx={{
                boxShadow: 5,
                p: 5,
                bgcolor: (theme) => theme.palette['primary'].lighter,
                color: (theme) => theme.palette['primary'].darker,
                borderRadius: 2,
                height: { xs: 'auto', md: 500 }, // Responsive height
            }}
        >
            <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                <Grid2 container>
                    <Grid2 item lg={6} md={6} xs={12}>
                        <Typography variant="h5" pb={2}>
                            Hello there, Welcome back!
                        </Typography>
                        <Typography variant="body2" pb={2}>
                            Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
                        </Typography>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={configData.USER_GROUPS_URL}
                        >
                            View Groups
                        </Button>
                    </Grid2>
                    <Grid2 item lg={5} md={6} xs={12} display="flex" justifyContent="center">
                        <img
                            src="/static/illustrations/dashboard-card.png"
                            alt="dashboard"
                            style={{ maxWidth: '100%', height: 'auto' }} // Responsive image
                        />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    )
}
