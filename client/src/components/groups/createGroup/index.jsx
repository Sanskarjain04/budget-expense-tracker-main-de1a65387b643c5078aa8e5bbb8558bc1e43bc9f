import { LoadingButton } from '@mui/lab';
import { Box, Chip, Container, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import AlertBanner from '../../AlertBanner';
import Loading from '../../loading';
import useResponsive from '../../../theme/hooks/useResponsive';

const predefinedGroups = [
    {
        groupName: "Nagar Nigam",
        groupDescription: "test one",
        groupCurrency: "INR",
        groupOwner: "User@gmail.com",
        groupMembers: ["user1@example.com"],
        groupCategory: "Trip",
        groupTotal: 2715383,
        split: [],
        __v: 0
    },
    {
        groupName: "pwd",
        groupDescription: "test two",
        groupCurrency: "INR",
        groupOwner: "User@gmail.com",
        groupMembers: ["user1@example.com"],
        groupCategory: "Trip",
        groupTotal: 2715383,
        split: [],
        __v: 0
    },
];

export default function Creategroup() {
    const mdUp = useResponsive('up', 'md');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [groups, setGroups] = useState(predefinedGroups); // Initialize with predefined groups

    // Formik validation schema
    const groupSchema = Yup.object().shape({
        groupName: Yup.string().required('Group name is required'),
        groupDescription: Yup.string(),
        groupCurrency: Yup.string().required('Currency Type is required'),
        groupCategory: Yup.string().required('Category is required'),
    });

    const formik = useFormik({
        initialValues: {
            groupName: '',
            groupDescription: '',
            groupCurrency: '',
            groupCategory: '',
            groupMembers: [],
        },
        validationSchema: groupSchema,
        onSubmit: (values, { resetForm }) => {
            // Create a new group object based on form values
            const newGroup = {
                ...values,
                groupOwner: "User@gmail.com", // Use current user's email or a hardcoded value
                groupTotal: 0, // Initialize total as needed
                split: [],
                __v: 0,
            };

            // Append the new group to the groups array
            setGroups((prevGroups) => [...prevGroups, newGroup]);

            // Reset the form
            resetForm();
            setAlert(true);
            setAlertMessage('Group created successfully!');
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container>
            {loading ? <Loading /> :
                <>
                    <Typography variant="h4" pb={2} mb={3}>
                        Create New Group
                    </Typography>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='success' />
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid2 container spacing={3} sx={{ maxWidth: 800 }}>
                                <Grid2 item xs={12}>
                                    <TextField fullWidth
                                        type="text"
                                        name="groupName"
                                        label="Group Name"
                                        variant="outlined"
                                        {...getFieldProps('groupName')}
                                        error={Boolean(touched.groupName && errors.groupName)}
                                        helperText={touched.groupName && errors.groupName}
                                    />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        name="groupDescription"
                                        label="Group Description"
                                        variant="outlined"
                                        {...getFieldProps('groupDescription')}
                                        error={Boolean(touched.groupDescription && errors.groupDescription)}
                                        helperText={touched.groupDescription && errors.groupDescription}
                                    />
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <FormControl fullWidth
                                        error={Boolean(touched.groupCurrency && errors.groupCurrency)}
                                    >
                                        <InputLabel id="group-currency-label">Currency</InputLabel>
                                        <Select
                                            name='groupCurrency'
                                            labelId="group-currency-label"
                                            {...getFieldProps('groupCurrency')}
                                        >
                                            <MenuItem value={'INR'}>₹ INR</MenuItem>
                                            <MenuItem value={'USD'}>$ USD</MenuItem>
                                            <MenuItem value={'EUR'}>€ EUR</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.groupCurrency && errors.groupCurrency}</FormHelperText>
                                    </FormControl>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <FormControl fullWidth
                                        error={Boolean(touched.groupCategory && errors.groupCategory)}
                                    >
                                        <InputLabel id="group-category-label">Category</InputLabel>
                                        <Select
                                            name='groupCategory'
                                            labelId="group-category-label"
                                            {...getFieldProps('groupCategory')}
                                        >
                                            <MenuItem value={'Home'}>Home</MenuItem>
                                            <MenuItem value={'Trip'}>Trip</MenuItem>
                                            <MenuItem value={'Office'}>Office</MenuItem>
                                            <MenuItem value={'Sports'}>Sports</MenuItem>
                                            <MenuItem value={'Others'}>Others</MenuItem>
                                        </Select>
                                        <FormHelperText>{touched.groupCategory && errors.groupCategory}</FormHelperText>
                                    </FormControl>
                                </Grid2>
                                {mdUp && <Grid2 item xs={0} md={9} />}
                                <Grid2 item xs={6} md={3}>
                                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                        Create Group
                                    </LoadingButton>
                                </Grid2>
                            </Grid2>
                        </Form>
                    </FormikProvider>
                    <Typography variant="h5" mt={3}>
                        Existing Groups
                    </Typography>
                    {groups.map((group, index) => (
                        <Box key={index} sx={{ border: '1px solid', borderRadius: 2, p: 2, my: 1, bgcolor: 'background.paper' }}>
                            <Typography variant="h6">{group.groupName}</Typography>
                            <Typography variant="body1">{group.groupDescription}</Typography>
                            <Typography variant="body2">Currency: {group.groupCurrency}</Typography>
                            <Typography variant="body2">Owner: {group.groupOwner}</Typography>
                            <Typography variant="body2">Category: {group.groupCategory}</Typography>
                            <Typography variant="body2">Total: {group.groupTotal}</Typography>
                            <Box mt={1}>
                                <Typography variant="body2">Members:</Typography>
                                {group.groupMembers.map((member, idx) => (
                                    <Chip key={idx} label={member} sx={{ mr: 1, mb: 1 }} />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </>
            }
        </Container>
    );
}
