import {  Container, Grid2, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserExpenseService} from "../../services/expenseServices"
import { getUserGroupsService } from "../../services/groupServices"
import Loading from "../loading"
import { CalenderExpenseGraph } from "./CalenderExpenseGraph"
import { CategoryExpenseChart } from "./CategoryExpenseGraph"
import { EndMessage } from "./endMessage"
import { GroupExpenseChart } from "./GroupExpenseChart"
import { RecentTransactions } from "./RecentTransactions"
import { SummaryCards } from "./summaryCards"
import { WelcomeMessage } from "./welcomeMessage"
import { Link as RouterLink } from 'react-router-dom';
import configData from '../../config.json'
import AlertBanner from "../AlertBanner"


export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userExp, setUserExp] = useState()
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const userIdJson = {
                user: profile.emailId
            }
            const response_expense = await getUserExpenseService(userIdJson, setAlert, setAlertMessage)
            setUserExp(response_expense.data);
            const response_group = await getUserGroupsService(profile)
            if (response_group.data.groups.length == 0)
                setNewUser(true)
            setLoading(false)

        }
        getUserDetails();


    }, [])

    return (
        <Container maxWidth={'xl'}>
            {loading ? <Loading /> :
                <Grid2 container spacing={3}>
                    <Grid2 item xs={12} md={8}>
                        <Grid2 container spacing={5}>
                            <Grid2 item xs={12}>
                                <WelcomeMessage />
                            </Grid2>

                            {newUser ?
                                <Grid2 item xs={12}>
                                    <Grid2 container
                                        direction="column"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            minHeight: 'calc(50vh - 200px )',
                                        }}

                                    >
                                        <Typography variant="body2" fontSize={18} textAlign={'center'}>
                                            Seems to be new here! Create your first group and add expenses <br />
                                            <Link component={RouterLink}
                                                to={configData.CREATE_GROUP_URL}>
                                                Create Group
                                            </Link>
                                        </Typography>
                                    </Grid2>
                                </Grid2>

                                :
                                <>
                                    <Grid2 item xs={12}>
                                        <SummaryCards userTotalExp={userExp?.total} />
                                    </Grid2>
                                    <Grid2 item xs={12}>
                                        <CalenderExpenseGraph />
                                    </Grid2>
                                    <Grid2 item xs={12} md={12}>
                                        <GroupExpenseChart />
                                    </Grid2>
                                    {/* <Grid2 item xs={12} md={6}>
                                <CategoryExpenseChart />
                            </Grid2> */}
                                </>
                            }
                        </Grid2>

                    </Grid2>
                    {!newUser &&
                        <Grid2 item xs={12} md={4}>
                            <Grid2 container spacing={3}>
                                <Grid2 item xs={12}>
                                    <RecentTransactions />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <CategoryExpenseChart />
                                </Grid2>
                                <Grid2 item md={12} xs={0}>
                                    <EndMessage />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    }

                </Grid2>

            }</Container>

    )
}
