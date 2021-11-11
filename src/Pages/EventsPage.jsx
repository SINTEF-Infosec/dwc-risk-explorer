import React, {useEffect, useState} from "react";
import {GetAllEvents} from "../DataProvider/provider";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import {Box, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import StickyHeadEventTable from "../Components/StickyHeadEventTable";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 1000,
    },
    pageContainer: {
        margin: theme.spacing(4)
    },
    progressBox: {
        textAlign: "center",
        padding: theme.spacing(10)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function EventsPage() {
    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [showFilters, setShowFilters] = useState(false);
    const classes = useStyles()

    // Filters
    const [filters, setFilters] = useState([])

    const availableFilters = ["Type of source", "Type of threat", "Type of event", "Supporting asset", "Composite asset", "Primary asset", "Consequence"]
    const filtersMapping = {
        "Type of source": "type_of_source",
        "Type of threat": "type_of_threat",
        "Type of event": "type_of_event",
        "Supporting asset": "supporting_asset",
        "Composite asset": "composite_asset",
        "Primary asset": "primary_asset",
        "Consequence": "consequence"
    }

    const handleChange = (idx) => (event) => {
        const newFilters = [...filters];
        newFilters[idx]["field"] = event.target.value;
        setFilters(newFilters);
        applyFilters(newFilters)
    }

    const handleTextChange = (idx) => (event) => {
        const newFilters = [...filters];
        newFilters[idx]["value"] = event.target.value;
        setFilters(newFilters);
        applyFilters(newFilters)
    }

    const handleDelete = (idx) => () => {
        const newFilters = [...filters]
        newFilters.splice(idx, 1);
        setFilters(newFilters);
        applyFilters(newFilters)
    }

    const handleAddFilter = () => {
        const newFilters = [...filters]
        newFilters.push({"field": availableFilters[0], "value": ""})
        setFilters(newFilters)
    }

    const handleClearAllFilters = () => {
        setFilters([])
    }

    const applyFilters = (filters) => {
        let filteredEvents = allEvents

        // successive filtering for each of the defined filter
        filters.forEach((filter) => {
            filteredEvents = filteredEvents.filter((event) => {
                if (filter["value"].length === 0) {
                    return true
                }

                if (event[filtersMapping[filter["field"]]].toLowerCase().includes(filter["value"].toLowerCase())) {
                    return true
                }

                return false
            })
        })

        setEvents(filteredEvents)
    }

    useEffect(() => {
        GetAllEvents().then((events) => {setEvents(events); setAllEvents(events)})
    }, [])

    const columns = [
        {id: 'id', label: 'ID', minWidth: 20, align: "center"},
        {id: 'type_of_source', label: 'Type of source', minWidth: 130},
        {id: 'type_of_threat', label: 'Type of threat', minWidth: 70},
        {id: 'type_of_event', label: 'Type of event', minWidth: 130},
        {id: 'supporting_asset', label: 'Supporting asset', minWidth: 130},
        {id: 'composite_asset', label: 'Composite asset', minWidth: 130},
        {id: 'primary_asset', label: 'Primary asset', minWidth: 130},
        {id: 'consequence', label: 'Consequence', minWidth: 70},
        {id: 'description', label: 'Description', minWidth: 200},
        {id: 'example', label: 'Example', minWidth: 200},
        {id: 'measures', label: '# measures', minWidth: 50, format: (data) => data.length, align: "center"},
    ];

    return (
        <div className={classes.pageContainer}>
            <Box display="flex" flexDirection={"row"} style={{marginBottom: "2em"}}>
                <Typography id={"title"} variant="h4" gutterBottom>
                    Risk Identification - Events ({events.length} loaded)
                </Typography>
                <Box flexGrow={1} p={1} m={1}/>
                <Button variant="contained" startIcon={<SettingsIcon/>} onClick={() => setShowFilters(!showFilters)} >
                    Filter
                </Button>
            </Box>
            {
                showFilters ? <Paper className={classes.root}>
                    <Box display="flex" flexDirection={"column"} m={2} p={1}>
                        <Typography id={"filters-title"} variant="h6" gutterBottom>
                            Filters
                        </Typography>
                        {
                            filters.length > 0 ? filters.map((filter, idx) => {
                                return (
                                    <Box display={"flex"} flexDirection={"row"} m={1} key={idx}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="Field">Field</InputLabel>
                                            <Select
                                                labelId={"field" + idx}
                                                id={"field-" + idx}
                                                value={filter["field"]}
                                                onChange={handleChange(idx)}
                                            >
                                                {
                                                    availableFilters.map((avFilter, miIdx) => <MenuItem
                                                       key={"menu-item-" + miIdx} value={avFilter}>{avFilter}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <TextField id={"textfield-" + idx} label="Contains" value={filter["value"]} style={{width: "100%"}} onChange={handleTextChange(idx)}/>
                                        </FormControl>
                                        <IconButton aria-label="delete" onClick={handleDelete(idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                )
                            }) : <Typography id={"no-filter"} variant="body1" gutterBottom>
                                <em>No filters</em>
                            </Typography>
                        }
                        <Box display={"flex"} flexDirection={"row-reverse"} m={1}>
                            <Button aria-label="add" onClick={handleAddFilter} startIcon={<AddIcon/>} disabled={filters.length >= availableFilters.length}>
                                Add filter
                            </Button>
                            <Button aria-label="add" onClick={handleClearAllFilters} disabled={filters.length === 0} startIcon={<ClearAllIcon/>}>
                                Clear all
                            </Button>
                        </Box>

                    </Box>
                </Paper> : null
            }
            {
                allEvents.length > 0 ?
                    <StickyHeadEventTable rows={events} columns={columns} resource_name={"events"}/>
                    :
                    <Box className={classes.progressBox}>
                        <CircularProgress color="secondary"/>
                    </Box>
            }

        </div>
    )
}

export default EventsPage;