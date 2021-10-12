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

function UserGuidePage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.pageContainer}>
                <Typography id={"title"} className={classes.title} variant="h4" gutterBottom>
                    User Guide
                </Typography>
                <Typography id={"functionalities"} variant="h6" gutterBottom>
                    Functionalities
                </Typography>
                <Typography id={"functionalities-text"} variant={"body2"} style={{marginBottom: "2em"}}>
                    The RIDB & RRMD Explorer is not a complex application: it simply provides the user with an easy way to navigate the risk events identified for the different solutions in Digital Water City. It provides a direct mapping between the events and the measures, i.e., for each event, the user can see what the identified risk reduction measures are and click on them to have more details if necessary. It is also possible to see all the identified risk reduction measures and see to which type of assets, type of threats, etc. they apply to.
                    In addition, filtering options were added to both the events and the measures to ease the lookup up of a risk and/or measure. Filters can be combined to refine a search.
                </Typography>

                <Typography id={"dashboard"} variant="h6" gutterBottom>
                    The dashboard
                </Typography>
                <Typography id={"dashboard-text"} variant={"body2"} style={{marginBottom: "2em"}}>
                    The dashboard provides information about the number of events and measures available in the application. Clicking on the links redirects to the events and measures’ pages respectively.
                </Typography>

                <Typography id={"events-measures-pages"} variant="h6" gutterBottom>
                    Events & Measures pages
                </Typography>
                <Typography id={"events-measures-pages"} variant={"body2"} style={{marginBottom: "2em"}}>
                    Both risk events and risks measures are presented in a similar manner in the explorer: a paginated table with the main information about an event or a measure. For the events, the fields are:
                    <ul>
                        <li>ID</li>
                    	<li>Type of source</li>
                    	<li>Type of threat</li>
                    	<li>Type of event</li>
                    	<li>Supporting asset</li>
                    	<li>Composite asset</li>
                    	<li>Primary asset</li>
                    	<li>Consequence</li>
                    	<li>Description</li>
                    	<li>Example</li>
                    	<li>Number of measures (this field is calculated automatically based on the measures associated to this event)</li>
                        </ul>
                    For the measures, the fields are:
                    <ul>
                    	<li>ID</li>
                    	<li>Name</li>
                    	<li>Description</li>
                    	<li>Type of measures</li>
                    	<li>Type of source</li>
                    	<li>Type of threat</li>
                    	<li>Specific asset</li>
                    	<li>Consequence</li>
                    	<li>Risk reduction mechanism</li>
                    </ul>

                    For a detailed explanation of those fields, please refer to the Deliverable available on <a href={"digital-water.city"}>Digital Water City website</a>.
                </Typography>

                <Typography id={"detailed-pages"} variant="h6" gutterBottom>
                    Detailed events and detailed measures pages
                </Typography>
                <Typography id={"detailed-pages-text"} variant={"body2"} style={{marginBottom: "2em"}}>
                    Clicking on an event or a measure shows the detailed page for that element with all the attributes entered in the database. When looking at a specific event, the list of applicable measures is available and can be used to navigate to the measures’ detailed pages directly.
                </Typography>

                <Typography id={"filtering"} variant="h6" gutterBottom>
                    Detailed events and detailed measures pages
                </Typography>
                <Typography id={"filtering-text"} variant={"body2"}>
                    Both the events and measures pages have basic filtering capabilities. One can add consecutive filters on specific fields.
                </Typography>

            </div>
        </div>
    )
}

export default UserGuidePage;