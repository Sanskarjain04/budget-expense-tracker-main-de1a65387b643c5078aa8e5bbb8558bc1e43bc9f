import { Box, Button, Container, Divider, Fab, Grid2, Link, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import Loading from '../../loading';
import useResponsive from '../../../theme/hooks/useResponsive';
import { convertToCurrency, currencyFind, categoryIcon } from '../../../utils/helper';
import ExpenseCard from '../../expense/expenseCard';
import GroupCategoryGraph from './groupCategoryGraph';
import GroupMonthlyGraph from './groupMonthlyGraph';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../../config.json';
import { GroupSettlements } from '../settlement';

const profile = JSON.parse(localStorage.getItem('profile'));
const emailId = profile?.emailId;
var showCount = 10;

const predefinedGroups = [
    {
        _id: '1',
        groupName: 'PWD',
        groupDescription: 'Public Works Department',
        groupCurrency: 'INR',
        groupOwner: 'user1@example.com',
        groupMembers: ['user1@example.com', 'user3@example.com'],
        split: [{ 'user1@example.com': 0, 'user3@example.com': 0 }],
        groupTotal: 23000,
        groupCategory: 'Infrastructure',
    },
    {
        _id: '2',
        groupName: 'Nagar Nigam',
        groupDescription: 'Municipal Corporation',
        groupCurrency: 'INR',
        groupOwner: 'user2@example.com',
        groupMembers: ['user2@example.com', 'user1@example.com'],
        split: [{ 'user2@example.com': 0, 'user1@example.com': 0 }],
        groupTotal: 15000,
        groupCategory: 'Urban Development',
    },
];

const predefinedExpenses = [
    {
        _id: '1',
        groupName: "Nagar Nigam",
        projectName: 'Nagar Nigam Road Repair',
        expenseName: 'Material Costs',
        expenseAmount: 5000,
        expensePerMember: 2500,
        expenseOwner: 'user1@example.com',
        expenseDate: '2024-09-25',
        expenseCurrency: 'INR',
    },
    {
        _id: '2',
        groupName: "Nagar Nigam",
        projectName: 'Nagar Nigam Park Renovation',
        expenseName: 'Labor Costs',
        expenseAmount: 10000,
        expensePerMember: 5000,
        expenseOwner: 'user2@example.com',
        expenseDate: '2024-09-20',
        expenseCurrency: 'INR',
    },
    {
        _id: '3',
        groupName: "PWD",
        projectName: 'PWD Bridge Construction',
        expenseName: 'Machinery Hire',
        expenseAmount: 15000,
        expensePerMember: 7500,
        expenseOwner: 'user1@example.com',
        expenseDate: '2024-09-15',
        expenseCurrency: 'INR',
    },
    {
        _id: '4',
        groupName: "PWD",
        projectName: 'PWD School Building Repair',
        expenseName: 'Equipment Purchase',
        expenseAmount: 8000,
        expensePerMember: 4000,
        expenseOwner: 'user3@example.com',
        expenseDate: '2024-09-10',
        expenseCurrency: 'INR',
    },
];

export default function ViewGroup() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState(null);
    const [groupExpense, setGroupExpense] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertExpense, setAlertExpense] = useState(false);
    const [alertExpenseMessage, setAlertExpenseMessage] = useState('');
    const [showAllExp, setShowAllExp] = useState(false);
    const [expFocus, setExpFocus] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [viewSettlement, setViewSettlement] = useState(0);

    const toggleAllExp = () => {
        setExpenses(groupExpense.slice(0, showCount));
        if (showCount >= groupExpense.length) setShowAllExp(true);
        setExpFocus(true);
        showCount += 5;
    };

    const toggleExpView = () => {
        setViewSettlement(0);
    };

    const toggleSettleView = () => {
        setViewSettlement(1);
    };

    const toggleMySettleView = () => {
        setViewSettlement(2);
    };

    const mdUp = useResponsive('up', 'md');

    const findUserSplit = (split) => {
        if (split) {
            split = split[0];
            return split[emailId];
        }
        return 0;
    };

    const calculateUserPaid = (expenses, userEmail) => {
        return expenses
            .filter(expense => expense.expenseOwner === userEmail)
            .reduce((total, expense) => total + expense.expenseAmount, 0);
    };

    useEffect(() => {
        const fetchData = () => {
            setLoading(false);
            // Simulate backend data fetch delay
            setTimeout(() => {
                const groupData = predefinedGroups.find(g => g._id === params.groupId);
                setGroup(groupData);
                const expenseData = predefinedExpenses.filter(e => e.groupName === groupData.groupName);
                setGroupExpense(expenseData);
                setExpenses(expenseData.slice(0, 5));
                if (expenseData.length <= 5) setShowAllExp(true);
                setLoading(false);
            }, 1000);
        };
        fetchData();
    }, [params.groupId]);

    const CategoryStyle = styled('span')(({ theme }) => ({
        top: 22,
        left: -57,
        zIndex: 10,
        width: 35,
        height: 32,
        borderRadius: 50,
        position: 'relative',
    }));

    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,
    }));

    const userPaid = calculateUserPaid(predefinedExpenses, emailId);

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Box
                        sx={{
                            bgcolor: (theme) => theme.palette['info'].lighter,
                            borderRadius: 2,
                            p: 2,
                            color: (theme) => theme.palette['primary'].darker,
                            pb: 3,
                        }}
                    >
                        <AlertBanner showAlert={alert} alertMessage={alertMessage} severity="error" />

                        <Link component={RouterLink} to={dataConfig.EDIT_GROUP_URL + group._id}>
                            <Iconify icon="akar-icons:edit" sx={{ float: 'right', fontSize: 18 }} />
                        </Link>
                        <Typography variant="h4" pb={1}>
                            {group.groupName}
                        </Typography>
                        <Typography variant="subtitle2">{group.groupDescription}</Typography>

                        <Typography mt={1} variant="body2" sx={{ color: 'text.secondary' }}>
                            Created by &nbsp;
                            <Box component={'span'} sx={{ color: (theme) => theme.palette['primary'].darker }}>
                                {group.groupOwner}
                            </Box>
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    bgcolor: (theme) => theme.palette['warning'].lighter,
                                    p: 1,
                                    borderRadius: 1,
                                    color: (theme) => theme.palette['warning'].darker,
                                }}
                            >
                                Category : &nbsp;{group.groupCategory}
                            </Typography>

                            <Fab
                                component={RouterLink}
                                to={dataConfig.ADD_EXPENSE_URL + group._id}
                                color="primary"
                                aria-label="add"
                                variant="extended"
                                sx={{
                                    textDecoration: 'none',
                                    ...(!mdUp && {
                                        margin: 0,
                                        top: 'auto',
                                        right: 20,
                                        bottom: 20,
                                        left: 'auto',
                                        position: 'fixed',
                                    }),
                                }}
                            >
                                <Iconify
                                    icon="eva:file-add-fill"
                                    sx={{
                                        height: 22,
                                        ...(mdUp && {
                                            mr: 1,
                                            width: 22,
                                        }),
                                        ...(!mdUp && {
                                            width: '100%',
                                        }),
                                    }}
                                />
                                {mdUp && <>Add Expense</>}
                            </Fab>
                        </Stack>
                        <Box
                            sx={{
                                mb: -4,
                                ml: -2,
                                width: 80,
                                height: 36,
                                display: 'inline-block',
                                bgcolor: 'currentColor',
                                mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                zIndex: 10,
                                float: 'right',
                            }}
                        >
                            <CategoryStyle>
                                <Iconify
                                    icon={categoryIcon(group.groupCategory)}
                                    sx={{
                                        ml: 2,
                                        mt: 1,
                                        width: 20,
                                        height: 20,
                                        color: (theme) => theme.palette['primary'].lighter,
                                    }}
                                />
                            </CategoryStyle>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            pt: 3,
                            pl: 2,
                            pr: 2,
                            pb: 2,
                            mt: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                        }}
                    >
                        <Grid2 container spacing={3}>
                            <Grid2 item xs={12} md={4}>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{
                                        bgcolor: (theme) => theme.palette['success'].lighter,
                                        borderRadius: 2,
                                        p: 3,
                                    }}
                                >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px' }}>
                                        <Iconify icon="nimbus:paid-2" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: (theme) => theme.palette['success'].dark }}>
                                            You have paid
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: (theme) => theme.palette['success'].darker }}>
                                            {currencyFind(group.groupCurrency)}{' '}
                                            {convertToCurrency(userPaid)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid2>

                            <Grid2 item xs={12} md={4}>
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{
                                        bgcolor: (theme) => theme.palette['error'].lighter,
                                        borderRadius: 2,
                                        p: 3,
                                    }}
                                >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['error'].dark, py: '18px' }}>
                                        <Iconify icon="nimbus:currency-usd-off" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: (theme) => theme.palette['error'].dark }}>
                                            You owe
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: (theme) => theme.palette['error'].darker }}>
                                            {currencyFind(group.groupCurrency)}{' '}
                                            {groupExpense ? convertToCurrency(findUserSplit(group.split)) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <Grid2 container>
                        <Grid2 item xs={12} mt={4}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: (theme) => theme.palette['primary'].darker,
                                    }}
                                >
                                    Expenses
                                </Typography>
                                <Stack direction="row">
                                    <Button variant="contained" onClick={toggleExpView} sx={{ mr: 1 }}>
                                        Expenses
                                    </Button>
                                    <Button variant="outlined" onClick={toggleSettleView} sx={{ mr: 1 }}>
                                        Settlements
                                    </Button>
                                    <Button variant="outlined" onClick={toggleMySettleView}>
                                        My Settlements
                                    </Button>
                                </Stack>
                            </Stack>
                            <Divider sx={{ borderBottomWidth: 4, bgcolor: 'primary.darker', mb: 2 }} />
                            {viewSettlement === 0 && (
                                <Grid2 container spacing={2}>
                                    {expenses.map((myExpense) => (
                                        <Grid2 item xs={12} md={expFocus ? 6 : 12} key={myExpense._id}>
                                            <ExpenseCard
                                                expenseId={myExpense._id}
                                                expenseName={myExpense.expenseName}
                                                expenseAmount={myExpense.expenseAmount}
                                                expensePerMember={myExpense.expensePerMember}
                                                expenseOwner={myExpense.expenseOwner}
                                                expenseDate={myExpense.expenseDate}
                                                currencyType={myExpense.expenseCurrency}
                                            />
                                        </Grid2>
                                    ))}
                                    {!showAllExp && (
                                        <Grid2 item xs={12}>
                                            <Button onClick={toggleAllExp}>View More</Button>
                                        </Grid2>
                                    )}
                                </Grid2>
                            )}
                            {viewSettlement !== 0 && (
                                <GroupSettlements
                                    id={group._id}
                                    currency={group.groupCurrency}
                                    groupExpense={groupExpense}
                                    view={viewSettlement}
                                    findUserSplit={findUserSplit}
                                />
                            )}
                        </Grid2>
                    </Grid2>
                    <GroupCategoryGraph expenses={groupExpense} />
                    <GroupMonthlyGraph expenses={groupExpense} />
                </>
            )}
        </Container>
    );
}
