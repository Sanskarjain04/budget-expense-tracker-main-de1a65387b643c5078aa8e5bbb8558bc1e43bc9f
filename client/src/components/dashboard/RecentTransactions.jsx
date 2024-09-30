import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import AlertBanner from '../AlertBanner';
import ExpenseCard from '../expense/expenseCard';
import Loading from '../loading';

export const RecentTransactions = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [recentExp, setRecentExp] = useState([]);

  // Hardcoded array of expenses
  const expenses = [
    {
      _id: '1',
      groupName:"Nagar Nigam",
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
      groupName:"Nagar Nigam",
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
      groupName:"PWD",
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
      groupName:"PWD",
      projectName: 'PWD School Building Repair',
      expenseName: 'Equipment Purchase',
      expenseAmount: 8000,
      expensePerMember: 4000,
      expenseOwner: 'user3@example.com',
      expenseDate: '2024-09-10',
      expenseCurrency: 'INR',
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const loadExpenses = () => {
      setLoading(false);
      setTimeout(() => {
        setRecentExp(expenses);
        setLoading(false);
      }, 1000); // Simulate a network delay
    };
    loadExpenses();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            boxShadow: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <AlertBanner showAlert={alert} alertMessage={alertMessage} severity="error" />
          <Typography variant="h6" p={2}>
            Your Recent transactions,
          </Typography>
          {recentExp.map((myExpense) => (
            <ExpenseCard
              key={myExpense._id}
              expenseId={myExpense._id}
              expenseName={myExpense.expenseName}
              expenseAmount={myExpense.expenseAmount}
              expensePerMember={myExpense.expensePerMember}
              expenseOwner={myExpense.expenseOwner}
              expenseDate={myExpense.expenseDate}
              currencyType={myExpense.expenseCurrency}
            />
          ))}
        </Box>
      )}
    </>
  );
};
