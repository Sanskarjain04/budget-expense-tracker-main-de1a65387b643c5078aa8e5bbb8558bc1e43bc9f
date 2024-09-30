import { Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

UserDetails.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailId: PropTypes.string,
};

export default function UserDetails() {
    // Hardcoded user data
    const user = {
        firstName: "User",
        lastName: "145",
        emailId: "User@gmail.com"
    };

    return (
        <Stack spacing={3}>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <TextField 
                    disabled 
                    id="outlined-disabled" 
                    label="First Name" 
                    defaultValue={user.firstName} 
                    sx={{ width: "100%" }} 
                />
                <TextField 
                    disabled 
                    id="outlined-disabled" 
                    label="Last Name" 
                    defaultValue={user.lastName} 
                    sx={{ width: "100%" }} 
                />
            </Stack>
            <TextField 
                disabled 
                id="outlined-disabled" 
                label="Email address" 
                defaultValue={user.emailId} 
                sx={{ width: "100%" }} 
            />
        </Stack>
    );
}
