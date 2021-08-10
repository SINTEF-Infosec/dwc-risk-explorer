import React, {useEffect, useState} from "react";
import {GetAllMeasures} from "../DataProvider/provider";
import {makeStyles} from "@material-ui/core/styles";
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
import Paper from "@material-ui/core/Paper";

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

function MeasuresPage() {
    const [measures, setMeasures] = useState([])
    const [allMeasures, setAllMeasures] = useState([])
    const [showFilters, setShowFilters] = useState(false);
    const classes = useStyles()

    // Filters
    const [filters, setFilters] = useState([])

    const availableFilters = ["Name", "Description", "Type of measure", "Type of source", "Type of threat", "Type of event", "Specific asset", "Consequence", "Risk reduction mechanism", "Characteristics of action", "Comments", "Details"]
    const filtersMapping = {
        "Name": "short_name",
        "Description": "description",
        "Type of measure": "type_of_measure",
        "Type of source": "type_of_source",
        "Type of threat": "type_of_threat",
        "Type of event": "type_of_event",
        "Specific asset": "specific_asset",
        "Consequence": "consequence",
        "Risk reduction mechanism": "risk_reduction_mechanism",
        "Characteristics of action": "characteristics_of_action",
        "Comments": "comments",
        "Details": "details"
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
        let filteredMeasures = allMeasures

        // successive filtering for each of the defined filter
        filters.forEach((filter) => {
            filteredMeasures = filteredMeasures.filter((measure) => {
                if (filter["value"].length === 0) {
                    return true
                }

                // Need to ensure we do have a not null elt
                if (measure[filtersMapping[filter["field"]]] === null) {
                    return false
                }

                // Checking if the field is an array
                if (typeof measure[filtersMapping[filter["field"]]] === "object") {
                    // If one of the elements matches the filter, we include the measure
                    let matches = false;
                    measure[filtersMapping[filter["field"]]].forEach((elt) => {
                        if (elt.toLowerCase().includes(filter["value"].toLowerCase())) {
                            matches = true;
                        }
                    })
                    return matches
                } else if (measure[filtersMapping[filter["field"]]].toLowerCase().includes(filter["value"].toLowerCase())) {
                    return true
                }

                return false
            })
        })

        setMeasures(filteredMeasures)
    }

    useEffect(() => {
        GetAllMeasures().then((measures) => {setMeasures(measures); setAllMeasures(measures)})
    }, [])

    const joinTablesList = (data) => <ul>{data.map((elt) => <li>{elt}</li>)}</ul>
    const splitWords = (word) => word.split(/(?=[A-Z][a-z])/).join(" ");

    const columns = [
        {id: 'id', label: 'ID', minWidth: 20},
        {id: 'short_name', label: 'Name', minWidth: 150, format: splitWords},
        {id: 'description', label: 'Description', minWidth: 250},
        {id: 'type_of_measure', label: 'Type of measure', minWidth: 150, format: joinTablesList},
        {id: 'type_of_source', label: 'Type of source', minWidth: 150, format: joinTablesList},
        {id: 'type_of_threat', label: 'Type of threat', minWidth: 150, format: joinTablesList},
        {id: 'type_of_event', label: 'Type of event', minWidth: 150, format: joinTablesList},
        {id: 'specific_asset', label: 'Specific asset', minWidth: 200, format: joinTablesList},
        {id: 'consequence', label: 'Consequence', minWidth: 70, format: joinTablesList},
        {id: 'risk_reduction_mechanism', label: 'Risk reduction mechanism', minWidth: 70},
        {id: 'characteristics_of_action', label: 'Characteristics of action', minWidth: 70},
        {id: 'comments', label: 'Comments', minWidth: 400},
        {id: 'details', label: 'Details', minWidth: 250},
    ];

    return (
        <div className={classes.pageContainer}>
            <Box display="flex" flexDirection={"row"} style={{marginBottom: "2em"}}>
                <Typography id={"title"} variant="h4" gutterBottom>
                    Measures ({measures.length} loaded)
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
                                    <Box display={"flex"} flexDirection={"row"} m={1}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="Field">Field</InputLabel>
                                            <Select
                                                labelId={"field" + idx}
                                                id={"field-" + idx}
                                                value={filter["field"]}
                                                onChange={handleChange(idx)}
                                            >
                                                {
                                                    availableFilters.map((avFilter) => <MenuItem
                                                        value={avFilter}>{avFilter}</MenuItem>)
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
                allMeasures.length > 0 ?
                    <StickyHeadEventTable rows={measures} columns={columns}/>
                    :
                    <Box className={classes.progressBox}>
                        <CircularProgress color="secondary"/>
                    </Box>
            }

        </div>
    )
}

export default MeasuresPage;