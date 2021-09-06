import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import {
    Avatar,
    Badge,
    Button, Menu, MenuItem,
    Typography
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../../Store/userSlice';
import {useHistory, useRouteMatch} from "react-router-dom";

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
}));

export default function Header() {
    const match = useRouteMatch();
    const classes = useStyles();
    const Login = useSelector(state => state.user.current);
    const isLogIn = !! Login.email;
    const [anchorEl, setAnchorEl] = useState(null);
    const openAuth = Boolean(anchorEl);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout =()=>{
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
                <Toolbar style={{minHeight: '96px'}}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ImportContactsIcon />
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        noWrap
                        component='a'
                        href='/'
                    >RIKUO</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Tìm kiếm…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {!isLogIn && (
                            <Button
                                color="inherit"
                                className={classes.link}
                                component='a'
                                href={`${match.path}/login`}
                                endIcon={<ExitToAppIcon className="text-white"/>}
                                style={{textTransform: 'none'}}
                            >
                                Đăng nhập
                            </Button>
                        )}
                        {isLogIn && (
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
                                    <MenuItem onClick={handleClose} style={{color: 'rgba(0, 0, 0, 0.87)'}} component='a' href='/app/profile'>Bảng điều khiển tài khoản</MenuItem>
                                    <MenuItem onClick={()=>{
                                        Logout()
                                        handleClose()
                                    }} component='a'>Đăng xuất</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    );
}
