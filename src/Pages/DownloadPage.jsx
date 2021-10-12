import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    pageContainer: {
        margin: theme.spacing(4)
    }
}));

function DownloadPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.pageContainer}>
                <Typography id={"title"} className={classes.title} variant="h4" gutterBottom>
                    Download
                </Typography>
                <Typography id={"functionalities-text"} variant={"body2"} style={{marginBottom: "2em"}}>
                    Here you can download the RIDB and RRMD Excel files.
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={0} md={2}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper className={classes.paper} elevation={3}>
                            <Box m={1} p={4} className={classes.title}>
                                <Button variant="outlined" startIcon={<GetAppIcon/>}
                                        onClick={() => window.location.href = "/resources/ridb.xlsx"}>
                                    RIDB
                                </Button> (ridb.xlsx)
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={0} md={2}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper className={classes.paper} elevation={3}>
                            <Box m={1} p={4} className={classes.title}>
                                <Button variant="outlined" startIcon={<GetAppIcon/>}
                                        onClick={() => window.location.href = "/resources/rrmd.xlsx"}>
                                    RRMD
                                </Button> (rrmd.xlsx)
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={0} md={2}>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default DownloadPage;