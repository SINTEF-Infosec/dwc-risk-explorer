import React, {useEffect, useState} from "react";
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
    }
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
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
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
    const classes = useStyles()

    useEffect(() => {
        GetAllEvents().then((events) => setEvents(events))
    }, [])

    const columns = [
        {id: 'id', label: 'ID', minWidth: 70},
        {id: 'type_of_source', label: 'Type of source', minWidth: 130},
        {id: 'type_of_threat', label: 'Type of threat', minWidth: 130},
        {id: 'type_of_event', label: 'Type of event', minWidth: 130},
        {id: 'supporting_asset', label: 'Supporting asset', minWidth: 130},
        {id: 'composite_asset', label: 'Composite asset', minWidth: 130},
        {id: 'primary_asset', label: 'Primary asset', minWidth: 130},
        {id: 'consequence', label: 'Consequence', minWidth: 130},
        {id: 'description', label: 'Description', minWidth: 200},
        {id: 'example', label: 'Example', minWidth: 200},
    ];

    return (
        <div className={classes.pageContainer}>
            <Typography id={"title"} variant="h4" gutterBottom>
                Events ({events.length} loaded)
            </Typography>
            {
                events.length > 0 ?
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