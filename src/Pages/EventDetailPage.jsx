import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {GetEvent, GetEventMeasures} from "../DataProvider/provider";
import {useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    pageContainer: {
        margin: theme.spacing(4)
    },
    progressBox: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
}));

function EventDetailPage() {
    let classes = useStyles();
    let {id} = useParams();
    const [event, setEvent] = useState({})
    const [eventMeasures, setEventMeasures] = useState([])
    let history = useHistory();

    useEffect(() => {
        GetEvent(id).then((event) => {
            setEvent(event)
            event["measures"] && GetEventMeasures(event["measures"]).then((measures) => {
                setEventMeasures(measures)
            })
        })
    }, [id])

    const splitWords = (word) => word.split(/(?=[A-Z][a-z])/).join(" ");

    return (
        <div className={classes.pageContainer}>
            {
                Object.keys(event).length !== 0 ? <div>
                    <Box m={1}>
                        <Paper className={classes.root}>
                            <Box p={2}>
                                <Typography id={"event-name"} variant="h4">
                                    Event n°{event["id"]}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                    <Box m={1}>
                        <Paper className={classes.root}>
                            <Box p={2}>
                                <Typography id={"information-title"} variant="h5" gutterBottom>
                                    Information
                                </Typography>
                                <Box m={2}>
                                    <Typography id={"type-of-source-title"} variant="h6" gutterBottom>
                                        Type of source
                                    </Typography>
                                    <Typography id={"type-of-source"} variant="body2" gutterBottom>
                                        {event["type_of_source"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"type-of-threat-title"} variant="h6" gutterBottom>
                                        Type of threat
                                    </Typography>
                                    <Typography id={"type-of-threat"} variant="body2" gutterBottom>
                                        {event["type_of_threat"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"type-of-event-title"} variant="h6" gutterBottom>
                                        Type of event
                                    </Typography>
                                    <Typography id={"type-of-event"} variant="body2" gutterBottom>
                                        {event["type_of_event"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"supporting-asset-title"} variant="h6" gutterBottom>
                                        Supporting asset
                                    </Typography>
                                    <Typography id={"supporting-asset"} variant="body2" gutterBottom>
                                        {event["supporting_asset"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"composite-asset-title"} variant="h6" gutterBottom>
                                        Composite asset
                                    </Typography>
                                    <Typography id={"composite-asset"} variant="body2" gutterBottom>
                                        {event["composite_asset"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"primary-asset-title"} variant="h6" gutterBottom>
                                        Primary asset
                                    </Typography>
                                    <Typography id={"primary-asset"} variant="body2" gutterBottom>
                                        {event["primary_asset"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"consequence-title"} variant="h6" gutterBottom>
                                        Consequence
                                    </Typography>
                                    <Typography id={"consequence"} variant="body2" gutterBottom>
                                        {event["consequence"]}
                                    </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography id={"description-title"} variant="h6" gutterBottom>
                                        Description
                                    </Typography>
                                    <Typography id={"description"} variant="body2" gutterBottom>
                                        {event["description"]}
                                    </Typography>
                                </Box>
                                {
                                    event["exemple"] ? <Box m={2}>
                                        <Typography id={"example-title"} variant="h6" gutterBottom>
                                            Example
                                        </Typography>
                                        <Typography id={"example"} variant="body2" gutterBottom>
                                            {event["example"]}
                                        </Typography>
                                    </Box> : null
                                }
                            </Box>
                        </Paper>
                    </Box>
                    <Box m={1}>
                        <Paper className={classes.root}>
                            <Box p={2}>
                                <Typography id={"measures-title"} variant="h5" gutterBottom>
                                    Measures
                                </Typography>
                                {
                                    eventMeasures.length > 0 ?
                                        <ul>
                                            {
                                                eventMeasures.map((measure, idx) =>
                                                    <li key={idx} style={{marginBottom: "1em"}}>
                                                        <Link href="" onClick={() => history.push('/measures/' + measure["id"])}>{measure["id"] + " - " + splitWords(measure["short_name"])}</Link>
                                                    </li>)
                                            }
                                        </ul> : <Typography id={"measures-title"} variant="body1">
                                            No measures
                                        </Typography>
                                }
                            </Box>
                        </Paper>
                    </Box>
                </div> : null
            }
        </div>
    )
}

export default EventDetailPage;