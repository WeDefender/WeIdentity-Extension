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
import VoiceIcon from '@material-ui/icons/RecordVoiceOver'
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import getStorage from '../../_component/Storage'
import { Link, withRouter } from 'react-router-dom'
import { GET_USER_STATUS_URL } from '../../_constants'

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
        height:200,
        textAlign: "center"
    },
    logo:{
        paddingTop:60,
        width:280
    },
    Center:{
        textAlign: "center"
    }
    
}))

function ListContent(props){
    console.log(props)
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                        #{props.num}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <VoiceIcon />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                        {props.org}请求授权{props.index}号凭证
                </Typography>
                <Typography variant="h7" gutterBottom>
                        授权确认
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h7" gutterBottom>
                        {props.status?"通过":"拒绝"}
                </Typography>
            </Grid>
        </Grid>     
    )
}
//props.history.push({pathname: `/home`})
const HomeWithRouter = withRouter(function HomeContent(props) {
    const [data, setData] = React.useState("null")
    const [verifyStatus, setVerifyStatus] = React.useState(0)
    const [nickName, setNickName] = React.useState("Default")
    const classes = useStyles()
    const getShortString = (str) => {
        if (str==undefined)
            return ""
        else if (str.length>10){
            return str.substring(0,5)+"..." +str.substring(str.length-5,str.length)
        }
        else
            return str
    }
    useEffect(() => {
        
        chrome.storage.local.get(['weId'], function(result) {
            console.log('Value currently is ' + result.weId);
            setData(result.weId);
            if (result.weId == undefined){
                props.history.push({pathname: `/register`})
            }
            else{
                fetch(GET_USER_STATUS_URL, {
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
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.get(['nickName'], function(result) {
            setNickName(result.nickName)
        })
    }, []);

    const [authHistory,setAuthHistory] = React.useState([])
    useEffect(() => {
        chrome.storage.local.get(["authHistory"],function(result){
            console.log('authHistory currently is ' + result.authHistory);       
            if (result.authHistory != undefined){
                setAuthHistory(result.authHistory)
            }
        })
    }, []);

    const listItems = authHistory.map((authHistory,i) =>
        // 又对啦！key应该在数组的上下文中被指定
        <ListItem button>
            <ListContent key={authHistory.toString()} num={i}
                    org={authHistory} status={true} index = {1}/>
        </ListItem>
 
    );

    const requestVerified = () => {
        props.history.push({pathname: `/verify`})
    }

    return (
        <div>
            <div>
                <ListItem className={classes.root}>
                    <Grid container>
                        <Grid item xs={3} className={classes.Center}>
                            <ListItemIcon className={classes.menuIcon}>
                                <MenuIcon />
                            </ListItemIcon>
                        </Grid>
                        <Grid item xs={6} className={classes.Center} >
                            <div >
                                <div>
                                    {nickName}
                                </div>
                                <div>
                                    {getShortString(data)}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.Center}>
                            <ListItem button onClick={verifyStatus==0?requestVerified:()=>{}}>
                                {verifyStatus==0?"待审核":verifyStatus==1?"已审核":"未审核"}
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
                    {listItems}
            </List>
        </div>
    )
})

export {HomeWithRouter as HomeContent}

