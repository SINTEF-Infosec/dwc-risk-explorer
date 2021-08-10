import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {GetMeasure} from "../DataProvider/provider";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    pageContainer: {
        margin: theme.spacing(4),
        flexGrow: 1,
    },
    progressBox: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

function MeasureDetailPage() {
    let classes = useStyles();
    let {id} = useParams();
    const [measure, setMeasure] = useState({})

    useEffect(() => {
        GetMeasure(id).then((measure) => {
            setMeasure(measure)
        })
    }, [id])

    const joinTablesList = (data) => <ul>{data.map((elt, idx) => <li key={idx}>{elt}</li>)}</ul>;
    const splitWords = (word) => word.split(/(?=[A-Z][a-z])/).join(" ");

    return (
        <div className={classes.pageContainer}>
            {
                Object.keys(measure).length !== 0 ?
                    <div>
                        <Box style={{marginBottom: "1em"}}>
                            <Paper className={classes.root}>
                                <Box p={2}>
                                    <Typography id={"event-name"} variant="h4">
                                        {splitWords(measure["short_name"])}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={7}>
                                <Paper className={classes.paper}>
                                    <Box m={2}>
                                        <Typography id={"description-title"} variant="h6">
                                            Description
                                        </Typography>
                                        <Typography id={"description"} variant="body2">
                                            {measure["description"] ? measure["description"] : "N/A"}
                                        </Typography>
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"comments-title"} variant="h6">
                                            Comments
                                        </Typography>
                                        <Typography id={"comments"} variant="body2">
                                            {measure["comments"] ? measure["comments"] : "N/A"}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={5}>
                                <Paper className={classes.paper}>
                                    <Box m={2}>
                                        <Typography id={"measure-id-title"} variant="h6">
                                            Measure ID
                                        </Typography>
                                        <Typography id={"measure-id"} variant="body2">
                                            {measure["id"]}
                                        </Typography>
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"risk-reduction-mechanism-title"} variant="h6">
                                            Risk reduction mechanism
                                        </Typography>
                                        <Typography id={"risk-reduction-mechanism"} variant="body2">
                                            {measure["risk_reduction_mechanism"] ? measure["risk_reduction_mechanism"] : "N/A"}
                                        </Typography>
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"action-characteristics-title"} variant="h6">
                                            Action characteristics
                                        </Typography>
                                        <Typography id={"action-characteristics"} variant="body2">
                                            {measure["characteristics_of_action"] ? measure["characteristics_of_action"] : "N/A"}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Box m={2}>
                                        <Typography id={"type-of-threat-title"} variant="h6">
                                            Types of threat
                                        </Typography>
                                        {measure["type_of_threat"].length > 0 ? joinTablesList(measure["type_of_threat"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"event-source-type-title"} variant="h6">
                                            Event source types
                                        </Typography>
                                        {measure["type_of_source"].length > 0 ? joinTablesList(measure["type_of_source"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"event-type-title"} variant="h6">
                                            Event types
                                        </Typography>
                                        {measure["type_of_event"].length > 0 ? joinTablesList(measure["type_of_event"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"measure-type-title"} variant="h6">
                                            Measure type
                                        </Typography>
                                        {measure["type_of_measure"].length > 0 ? joinTablesList(measure["type_of_measure"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"type-of-assets-title"} variant="h6">
                                            Type of assets
                                        </Typography>
                                        {measure["type_of_asset"].length > 0 ? joinTablesList(measure["type_of_asset"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"specific-asset-title"} variant="h6">
                                            Specific assets
                                        </Typography>
                                        {measure["specific_asset"].length > 0 ? joinTablesList(measure["specific_asset"]) : "N/A"}
                                    </Box>
                                    <Box m={2}>
                                        <Typography id={"consequence-title"} variant="h6">
                                            Consequences
                                        </Typography>
                                        {measure["consequence"].length > 0 ? joinTablesList(measure["consequence"]) : "N/A"}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div> : null
            }
        </div>
    )
}

export default MeasureDetailPage;