import { calculateSize } from "@iconify/react";
import { CircularProgress, Grid2, Typography } from "@mui/material";
import { Box } from "@mui/system";


export default function Loading() {

  return (
    <Grid2 container
    direction="column"
    style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: '200px' }}
  >
    <CircularProgress size={60} />
    <Typography variant="h3" textAlign={'center'}>
        Loading...
    </Typography>
    </Grid2>
  )
}
