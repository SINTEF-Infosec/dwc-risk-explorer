import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {GetAllEvents, GetAllMeasures} from "../DataProvider/provider";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    pageContainer: {
        margin: theme.spacing(4)
    },
    title: {
        textAlign: "center"
    }
}));

function HomePage() {
    const classes = useStyles()
    let history = useHistory()
    const [events, setEvents] = useState([])
    const [measures, setMeasures] = useState([])

    useEffect(() => {
        GetAllEvents().then((events) => GetAllMeasures().then((measures) => {
            setEvents(events); setMeasures(measures)}))
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.pageContainer}>
                <Typography id={"title"} className={classes.title} variant="h4" gutterBottom>
                    DWC - RIDB & RRMD Explorer
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Box m={2} p={2}>
                                <Typography id={"about-title"} variant="h6" gutterBottom>
                                    About the explorer
                                </Typography>
                                <Typography id={"about"} variant="body1" gutterBottom>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Typography>
                                <Typography id={"about"} variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Box m={1} p={4} className={classes.title}>
                                <Typography id={"events-counts"} variant="h4">
                                    <Link href={""} onClick={() => history.push("/events/")}>{events.length} Events</Link>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Box m={1} p={4} className={classes.title}>
                                <Typography id={"measures-counts"} variant="h4">
                                    <Link href={""} onClick={() => history.push("/measures/")}>{measures.length} Measures</Link>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default HomePage;