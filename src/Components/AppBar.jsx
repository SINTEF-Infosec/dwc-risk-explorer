import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import {ReactComponent as DWCLogo} from "../logo.svg";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        marginLeft: theme.spacing(2)
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function MainAppBar() {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const history = useHistory();
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Button aria-label="events" color="inherit" onClick={() => {
                    history.push('/events')
                }}>
                    Events
                </Button>
            </MenuItem>
            <MenuItem>
                <Button aria-label="events" color="inherit" onClick={() => {
                    history.push('/measures')
                }}>
                    Measures
                </Button>
            </MenuItem>
            <MenuItem>
                <Button aria-label="user-guide" color="inherit" onClick={() => {
                    history.push('/user-guide')
                }}>
                    User Guide
                </Button>
            </MenuItem>
            <MenuItem>
                <Button aria-label="Download" color="inherit" onClick={() => {
                    history.push('/download')
                }}>
                    Download
                </Button>
            </MenuItem>
            <MenuItem>
                <Button aria-label="events" color="inherit" onClick={() => {
                    history.push('/about')
                }}>
                    About
                </Button>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {
                        history.push('/')
                    }}>
                        <SvgIcon style={{ fontSize: 65 }}>
                            <DWCLogo/>
                        </SvgIcon>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        DWC - RIDB & RRMD Explorer
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <Button className={classes.menuButton} aria-label="events" color="inherit"
                                onClick={() => {
                                    history.push('/events')
                                }}>
                            Events
                        </Button>
                        <Button className={classes.menuButton} aria-label="measures" color="inherit"
                                onClick={() => {
                                    history.push('/measures')
                                }}>
                            Measures
                        </Button>
                        <Button className={classes.menuButton} aria-label="user-guide" color="inherit"
                                onClick={() => {
                                    history.push('/user-guide')
                                }}>
                            User guide
                        </Button>
                        <Button className={classes.menuButton} aria-label="download" color="inherit"
                                onClick={() => {
                                    history.push('/download')
                                }}>
                            Download
                        </Button>
                        <Button className={classes.menuButton} aria-label="about" color="inherit"
                                onClick={() => {
                                    history.push('/about')
                                }}>
                            About
                        </Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}