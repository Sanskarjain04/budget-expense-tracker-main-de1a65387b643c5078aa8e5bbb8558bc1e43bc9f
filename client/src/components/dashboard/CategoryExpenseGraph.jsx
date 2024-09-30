import { Box } from "@mui/material";
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertBanner from '../AlertBanner';
import Loading from '../loading';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto';
import { convertToCurrency } from '../../utils/helper';

export const CategoryExpenseChart = () => {
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);

    // Sample data array of expense categories and their amounts
    const expenseData = [
        {
            category: 'Transportation',
            amount: 5000,
        },
        {
            category: 'Housing',
            amount: 10000,
        },
        {
            category: 'Public Welfare',
            amount: 15000,
        },
        {
            category: 'Education',
            amount: 8000,
        },
    ];

    useEffect(() => {
        const fetchExpenses = () => {
            setLoading(false);
            // Simulating fetching expenses
            setExpenses(expenseData);
            setLoading(false);
        };
        fetchExpenses();
    }, []);

    const data = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Category Expenses',
                data: expenses.map(expense => expense.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: true,
                formatter: (value) => {
                    return convertToCurrency(value);
                }
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 10
                },
            },
        }
    };

    return (
        <>
            {loading ? <Loading /> :
                <Box sx={{
                    p: 5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5
                }}>
                    <Typography variant="h6" mb={2}>
                        Category Expense Chart
                    </Typography>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Box height={500}>
                        <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
                    </Box>
                </Box>}
        </>
    );
};
