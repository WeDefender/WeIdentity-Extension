/*global chrome*/
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom'
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider';
import getStorage from '../../_component/Storage'
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 320,
        height: 600
    },
    appBar:{
        backgroundColor: "#f2f3f4"
    },
    menuButton: {
        flexGrow: 1
    },
    menuText: {
        flexGrow: 4,
        textAlign: "center"
    },
    menuIcon: {
        textAlign: "center"
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1
    },
    Center:{
        textAlign: "center"
    },
    logo:{
        height: 35
    }
    
}))


	//Shared code. When the argument length is two, it is coming from the context
// menu, while a single argument is coming from the browser action.


const LayoutWithRouter = withRouter(function Layout(props) {
    const classes = useStyles()
    const { children, location: { pathname } } = props
    const [open, setOpen] = React.useState(false)
    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setOpen(open)
    }
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        chrome.storage.local.get(['isAuth'], function(result) {
            console.log("isAuth:",result.isAuth)
            console.log(props)
        })
    }, []);

    return (
        <div className={classes.root}>
            <div>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={3} className={classes.Center}>
                                <IconButton className={classes.menuIcon} aria-label="menu" onClick={handleDrawerOpen}>
                                    <img src="/Logo.png" alt="" className={classes.logo}/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} className={classes.Center}>
                                <ListItem className={classes.menuText} button component={Link} to="/home"  selected={'/home' === pathname}>
                                    Apollo
                                </ListItem>
                            </Grid>
                            <Grid item xs={3} className={classes.Center}>
                                <Button className={classes.menuButton} component={Link} to="/cards"  selected={'/cards' === pathname}>卡包</Button>
                            </Grid>
                        </Grid> 
                        
                        
                        
                    </Toolbar>
                </AppBar>
                
            </div>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    className={classes.drawerPaper}
                    role="presentation"
                >
                    <ListItem button component={Link} to="/register"  selected={'/register' === pathname}>
                        <ListItemText primary={"注册"} />
                    </ListItem>
                    <ListItem button component={Link} to="/auth"  selected={'/auth' === pathname}>
                        <ListItemText primary={"授权"} />
                    </ListItem>
                    <ListItem button component={Link} to="/home"  selected={'/home' === pathname}>
                        <ListItemText primary={"主页"} />
                    </ListItem>
                    <ListItem button component={Link} to="/verify"  selected={'/verify' === pathname}>
                        <ListItemText primary={"核验"} />
                    </ListItem>
                    <ListItem button component={Link} to="/cards"  selected={'/cards' === pathname}>
                        <ListItemText primary={"卡包"} />
                    </ListItem>
                    <ListItem button component={Link} to="/subcard"  selected={'/subcard' === pathname}>
                        <ListItemText primary={"子凭证"} />
                    </ListItem>
                    <ListItem button component={Link} to="/"  selected={'/' === pathname}>
                        <ListItemText primary={"根"} />
                    </ListItem>
                </List>
            </Drawer>
            {/*
            
            <Button button component={Link} to="/register"  selected={'/register' === pathname}> 注册 </Button>
            <Button button component={Link} to="/auth"  selected={'/auth' === pathname}> 授权 </Button>
            <Button button component={Link} to="/home"  selected={'/home' === pathname}> 主页 </Button>
            */}
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </div>
        </div>
    )
})

export { LayoutWithRouter as Layout }
