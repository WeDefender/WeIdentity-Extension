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
import getStorage from '../../_component/Storage'
import { Link, withRouter } from 'react-router-dom'

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
    logoDiv:{
        height:300,
        textAlign: "center"
    },
    logo:{
        width:320
    }
    
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
        return str.substring(0,5)+"..."+str.substring(str.length-5,str.length)
    }
    else
        return str
}

function getVerifiedStatus(){

}



//props.history.push({pathname: `/home`})




const HomeWithRouter = withRouter(function HomeContent(props) {
    const [data, setData] = React.useState("null")
    const [verifyStatus, setVerifyStatus] = React.useState(0)
    const [nickName, setNickName] = React.useState("Default")
    const classes = useStyles()
    
    useEffect(() => {
        
        chrome.storage.local.get(['weId'], function(result) {
            console.log('Value currently is ' + result.weId);
            setData(result.weId);
            fetch("http://192.168.1.111:8080/user/getUserStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    "weid":result.weId
                })
            }).then(function(res) {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject(res.json())
                }
            }).then(function(data) {
                console.log(data);
                if (data.data.status == '1'){
                    setVerifyStatus(1)
                } 
            }).catch(function(err) {
                console.log(err);
                alert("rpc失败，请检查网络！");//TODO 
            });
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.get(['nickName'], function(result) {
            setNickName(result.nickName)
        })
    }, []);

    const requestVerified = () => {
        props.history.push({pathname: `/verify`})
    }

    return (
        <div>
            <div>
                <ListItem className={classes.root}>
                    <Grid container>
                        <Grid item xs={3}>
                            <ListItemIcon className={classes.menuIcon}>
                                <MenuIcon />
                            </ListItemIcon>
                        </Grid>
                        <Grid item xs={6}>
                            <div button>
                                <div>
                                    {nickName}
                                </div>
                                <div>
                                    {getShortString(data)}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <ListItem button onClick={verifyStatus==0?requestVerified:()=>{}}>
                                {verifyStatus==0?"待审核":"已审核"}
                            </ListItem>
                        </Grid>
                    </Grid>   
                </ListItem>  
            </div>
            <Divider />  
            <div className={classes.logoDiv}>
                <img src="/WeIdentity.png" alt="" className={classes.logo}/>
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
})

export {HomeWithRouter as HomeContent}

