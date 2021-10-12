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
                                <Typography id={"about-1"} variant="body2" gutterBottom>
                                    This application is part of Deliverable D4.2 of the <a href={"https://www.digital-water.city/"}>Digital Water City project</a>.
                                    Deliverable 4.2 (D4.2) combines the results of two sub-tasks of WP4 "Interoperable and secure flow of information", 4.2.1 and 4.2.2 aiming at developing a risk identification database (RIDB) and a risk reduction measure database (RRMD) respectively.
                                </Typography>
                                <br/>
                                <Typography id={"about-2"} variant="body2">
                                    The databases have been first implemented in MS Excel to facilitate the process of co-creation and interaction with the DWC Cities and then converted into this Explorer, which allows for an easy visualisation of the two databases, and it is complemented by exploring features that facilitate navigating through risk events and risk treatment measures.
                                </Typography>
                                <br/>
                                <Typography id={"about-3"} variant={"body2"}>
                                    The RIDB is a catalogue of risk events, related to physical and cyber threats, which could happen in the case of a cyber and/or physical attack affecting the solutions adopted in DWC. The RIDB identifies the type of threats, the sources of risk, the description of the events and the type of consequences produced. The purpose of the RIDB is not to substitute the comprehensive identification of risk events for each application. Instead, the examples given in the RIDB allow the users to commence the process and draw its attention to some possibilities that should be investigated, when local conditions evolve, indicating that an event might occur.
                                </Typography>
                                <br/>
                                <Typography id={"about-4"} variant={"body2"}>
                                    The RRMD assists risk managers in the process of finding suitable measures for an appropriate risk treatment. The RRMD lists potential measures to reduce risks included in the RIDB. The database shall not replace a fully formulated plan for risk treatment, but rather show to the user options on how risks could be treated by choosing and implementing one or several measures from the database.
                                </Typography>
                                <br/>
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