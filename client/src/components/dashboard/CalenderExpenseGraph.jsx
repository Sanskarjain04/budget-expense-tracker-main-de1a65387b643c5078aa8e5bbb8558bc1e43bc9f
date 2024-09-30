import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { useEffect, useState } from "react";
import Loading from "../loading";
import { monthNamesMMM } from "../../utils/helper";
import useResponsive from "../../theme/hooks/useResponsive";
import AlertBanner from "../AlertBanner";

export const CalenderExpenseGraph = () => {
    const mdUp = useResponsive('up', 'md');
    const [montlyView, setMonthlyView] = useState(false);
    const [loading, setLoading] = useState(false); // Set loading to false initially
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userMonthlyExp, setUserMonthlyExp] = useState([]);
    const [userDailyExp, setUserDailyExp] = useState([]);

    // Static array of expenses
    const expenses = [
        {
            _id: '1',
            projectName: 'Nagar Nigam Road Repair',
            expenseName: 'Material Costs',
            expenseAmount: 5000,
            expensePerMember: 2500,
            expenseOwner: 'user1@example.com',
            expenseDate: '2023-09-25',
            expenseCurrency: 'INR',
        },
        {
            _id: '2',
            projectName: 'Nagar Nigam Park Renovation',
            expenseName: 'Labor Costs',
            expenseAmount: 10000,
            expensePerMember: 5000,
            expenseOwner: 'user2@example.com',
            expenseDate: '2023-10-20',
            expenseCurrency: 'INR',
        },
        {
            _id: '3',
            projectName: 'PWD Bridge Construction',
            expenseName: 'Machinery Hire',
            expenseAmount: 15000,
            expensePerMember: 7500,
            expenseOwner: 'user1@example.com',
            expenseDate: '2023-09-15',
            expenseCurrency: 'INR',
        },
        {
            _id: '4',
            projectName: 'PWD School Building Repair',
            expenseName: 'Equipment Purchase',
            expenseAmount: 8000,
            expensePerMember: 4000,
            expenseOwner: 'user3@example.com',
            expenseDate: '2023-10-10',
            expenseCurrency: 'INR',
        },
    ];

    // Separate daily and monthly expenses
    useEffect(() => {
        const dailyExpenses = expenses.map(exp => ({
            date: exp.expenseDate,
            amount: exp.expenseAmount,
            type: 'Daily',
        }));

        const monthlyExpenses = expenses.reduce((acc, exp) => {
            const month = new Date(exp.expenseDate).toLocaleString('default', { month: 'long' });
            const existing = acc.find(item => item.month === month);
            if (existing) {
                existing.amount += exp.expenseAmount; // Sum amounts for the same month
            } else {
                acc.push({ month, amount: exp.expenseAmount });
            }
            return acc;
        }, []);

        setUserDailyExp(dailyExpenses);
        setUserMonthlyExp(monthlyExpenses);
    }, []);

    const toggleMonthlyView = () => {
        setMonthlyView(!montlyView);
    };

    const data = {
        labels: montlyView
            ? userDailyExp.map(daily => daily.date)
            : userMonthlyExp.map(monthly => monthly.month),
        datasets: [
            {
                label: montlyView ? "Daily expense" : "Monthly expense",
                data: montlyView
                    ? userDailyExp.map(daily => daily.amount)
                    : userMonthlyExp.map(monthly => monthly.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
            }
        ]
    };

    const options = {
        tension: 0.4,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: montlyView ? "Daily expense graph" : "Monthly expense graph",
                font: { size: 18 },
                padding: 19,
                position: 'bottom'
            },
            legend: {
                display: false,
            },
        }
    };

    return (
        <>
            {loading ? <Loading /> :
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                    ...(mdUp && { p: 5 }),
                    ...(!mdUp && { p: 1 })
                }}
                >
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Typography variant="h6">
                        Expense Graph - {montlyView ? "Daily View" : "Monthly View"}
                    </Typography>

                    <Box height={350} my={2}>
                        <Line data={data} options={options} />
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked onClick={toggleMonthlyView} />} label="Monthly expense view" />
                    </FormGroup>
                </Box>}
        </>
    );
};
