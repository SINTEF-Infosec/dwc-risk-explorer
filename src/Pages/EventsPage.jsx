import React, {useCallback, useEffect, useState} from "react";
import {GetAllEvents} from "../DataProvider/provider";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useHistory} from "react-router-dom";
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

function StickyHeadEventTable({columns, rows}) {
    const classes = useStyles();
    const history = useHistory();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    <strong>{column.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={idx}
                                          onClick={() => history.push('/events/' + row.id)}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}


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

    const applyFilters = useCallback((filters) => {
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
    })

    useEffect(() => {
        GetAllEvents().then((events) => {setEvents(events); setAllEvents(events)})
    }, [])

    const columns = [
        {id: 'id', label: 'ID', minWidth: 20},
        {id: 'type_of_source', label: 'Type of source', minWidth: 130},
        {id: 'type_of_threat', label: 'Type of threat', minWidth: 70},
        {id: 'type_of_event', label: 'Type of event', minWidth: 130},
        {id: 'supporting_asset', label: 'Supporting asset', minWidth: 130},
        {id: 'composite_asset', label: 'Composite asset', minWidth: 130},
        {id: 'primary_asset', label: 'Primary asset', minWidth: 130},
        {id: 'consequence', label: 'Consequence', minWidth: 70},
        {id: 'description', label: 'Description', minWidth: 200},
        {id: 'example', label: 'Example', minWidth: 200},
    ];

    return (
        <div className={classes.pageContainer}>
            <Box display="flex" flexDirection={"row"} style={{marginBottom: "2em"}}>
                <Typography id={"title"} variant="h4" gutterBottom>
                    Events ({events.length} loaded)
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
                                No filters
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
                    <StickyHeadEventTable rows={events} columns={columns}/>
                    :
                    <Box className={classes.progressBox}>
                        <CircularProgress color="secondary"/>
                    </Box>
            }

        </div>
    )
}

export default EventsPage;