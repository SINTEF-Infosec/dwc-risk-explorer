import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    pageContainer: {
        margin: theme.spacing(4)
    }
}));

function AboutPage() {
    const classes= useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.pageContainer}>
                <Typography id={"title"} className={classes.title} variant="h4" gutterBottom>
                    About
                </Typography>
                <Typography id={"about"} variant="body2" gutterBottom>
                    To learn more about the RIDB & RRMD, please have a look at Deliverable D4.2, available from the <a href={"https://www.digital-water.city/"}>Digital Water City</a> website.
                </Typography>
            </div>
        </div>
    )
}

export default AboutPage;