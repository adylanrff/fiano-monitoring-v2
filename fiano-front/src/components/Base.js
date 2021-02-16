import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeAppBar from './navigation/HomeAppBar';
import HomeDrawer from './navigation/HomeDrawer';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));


export default function Base({ title, children }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <HomeAppBar title={title} open={open} handleOpen={handleDrawerOpen} />
            <HomeDrawer open={open} handleClose={handleDrawerClose} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" disableGutters className={classes.container}>
                    {children}
                </Container>
                <Box py={4}>
                    <Copyright />
                </Box>  
            </main>
        </div>
    )

}