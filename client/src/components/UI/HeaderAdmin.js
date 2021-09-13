import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {alpha, makeStyles} from '@material-ui/core/styles';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import {Avatar, Button, Menu, MenuItem, Typography} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {logout} from '../../Store/userSlice';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        color: '#fff'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontFamily: 'Poiret One, cursive',
        fontSize: '1.7em',
        fontWeight: 900,
        letterSpacing: '.1em',
        color: '#ffffff',
        textDecoration: 'none'

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '100ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    link: {
        color: '#fff !important'
    },
    menu: {
        flexGrow: 1,
        color: '#fff',
        textTransform: 'none',
        fontSize: '1.2em',
    }
}));

export default function HeaderAdmin() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElH, setAnchorElH] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const openAuth = Boolean(anchorEl);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClickListItem = (event) => {
        setAnchorElH(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorElH(null);
    };
    const handleCloseH = () => {
        setAnchorElH(null);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = () => {
        dispatch(logout());
        history.push('/');
    }
    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                color="primary"
                position="fixed"
            >
                <Toolbar style={{minHeight: '80px'}}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ImportContactsIcon/>
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        noWrap
                        component='a'
                        href='/'
                    >RIKUO</Typography>
                    <Typography variant="h6">
                        Hi Admin!
                    </Typography>
                    <div className={classes.sectionDesktop}>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar className={classes.large} src="https://cdn.quasar.dev/img/boy-avatar.png"/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                getContentAnchorEl={null}
                                keepMounted
                                open={openAuth}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    Logout()
                                    handleClose()
                                }} component='a'>Đăng xuất</MenuItem>
                            </Menu>
                        </div>

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
