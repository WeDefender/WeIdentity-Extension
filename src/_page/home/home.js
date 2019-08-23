/*global chrome*/
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { CssBaseline,Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarGrid: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor: "#f2f3f4"
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1
    },
    menuButton: {
        flexGrow: 1
    },
    menuText: {
        flexGrow: 4
    },
    menuIcon: {
        flexGrow: 1
    },
    
}))

function ListContent(){
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                        #99 - 7/19/2019 at 21:23
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <MenuIcon />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                        授权确认
                </Typography>
                <Typography variant="h7" gutterBottom>
                        确认
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h7" gutterBottom>
                        -0 eth
                </Typography>
            </Grid>
        </Grid>     
    )
}

function getShortString(str){
    if (str.length>10){
        return str.substring(0,5)+"..."+str.substring(str.length-5,str.length-1)
    }
    else
        return str
}

export function HomeContent() {
    const [data, setData] = React.useState("null")
    const classes = useStyles()
    
    useEffect(() => {
        chrome.storage.local.get(['weId'], function(result) {
            console.log('Value currently is ' + result.weId);
            setData(result.weId)
        });
    }, []);


    return (
        <div>
            <div>
                <ListItem className={classes.root}>
                    <ListItemIcon className={classes.menuIcon}>
                        <MenuIcon />
                    </ListItemIcon>
                    <Button>
                        <Typography variant="h7">
                            Sher
                        </Typography>
                        <Typography component="p">
                            {getShortString(data)}
                        </Typography>
                    </Button>
                    <ListItemIcon className={classes.menuButton}>
                        <MenuIcon />
                    </ListItemIcon>
                </ListItem>  
            </div>
            <Divider />  
            <div>
                <Button
                    onClick={() => {
                        chrome.storage.local.get(['weId'], function(result) {
                            console.log('Value currently is ' + result.weId);
                            setData(result.weId)
                        });
                    }}
                    variant="outlined">
                    getData
                </Button>
                <p> {data} </p>
            </div>
            <Typography variant="subtitle1" gutterBottom>
                    History:
            </Typography>
            <Divider />   
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListContent/>    
                </ListItem>
            </List>
                     


        </div>
    )
}

