import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { authContext, useAuth } from '../../services/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 26,
    },
    brand: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    fixedHeight: {
        height: 240,
    },
}));

export default function HomeAppBar({ open, handleOpen, title }) {
    const classes = useStyles();
    const { user, logout } = React.useContext(authContext)
    const [userPopoverOpen, setUserPopoverOpen] = useState(null)

    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)
    const popoverOpen = Boolean(popoverAnchorEl)

    const openPopover = (event) => {
        setPopoverAnchorEl(event.currentTarget)
    }

    const closePopover = () => {
        setPopoverAnchorEl(null)
    }

    return (
        <AppBar position="absolute" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    size="small"
                    aria-label="open drawer"
                    onClick={handleOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" className={classes.brand}>{`Fiano | ${title}`}</Typography>
                {!user && (
                    <Button color="inherit" style={{ textTransform: "none" }}>
                        <Link href="/login">
                            <Typography>
                                Login
                            </Typography>
                        </Link>
                    </Button>
                )}
                {user && (
                    <>
                        <Button
                            color="inherit"
                            onClick={openPopover}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            style={{ textTransform: "none", textDecoration: "underline" }}
                        >
                            <Typography>
                                {user.username}
                            </Typography>
                        </Button>
                        <Menu
                            anchorEl={popoverAnchorEl}
                            transformOrigin={{ 
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={Boolean(popoverAnchorEl)}
                            onClose={closePopover}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}