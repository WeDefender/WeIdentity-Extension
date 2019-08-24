/*global chrome*/
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { CssBaseline, Button, Container } from '@material-ui/core';
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
import { AwesomeCredentialCard } from './awesomeCredentialCard'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}))

//props.history.push({pathname: `/home`})

const CardsWithRouter = withRouter(function CardsContent(props) {
    const [certs, setCerts] = React.useState([])
    const [data,setData] = React.useState("null")
    const classes = useStyles()
//http://192.168.1.111:8080/common/getCredential

    useEffect(() => {
        chrome.storage.local.get("certs",function(result){
            console.log(result)
            console.log('certs currently is ' + JSON.stringify(result.certs));
            //console.log(result.certs.length)
            if (result.certs != undefined){
                setCerts(result.certs)
            }
            else if (result.certs == undefined || result.certs.length == 0) {
                console.log("in")
                chrome.storage.local.get(['weId'], function(result) {
                    console.log('Value currently is ' + result.weId);
                    setData(result.weId);
                    if (result.weId == undefined){
                        props.history.push({pathname: `/register`})
                    }
                    else{
                        fetch("http://192.168.1.111:8080/common/getCredential", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            mode: "cors",
                            body: JSON.stringify({
                                "weid":result.weId,
                                "type":0
                            })
                        }).then(function(res) {
                            console.log("cards",res)
                            if (res.status === 200) {
                                return res.json()
                            } else {
                                return Promise.reject(res.json())
                            }
                        }).then(function(res) {
                            console.log(res);
                            let data = res.data
                            let t = certs
                            t.push(data)
                            setCerts(t)
                            chrome.storage.local.set({"certs":t}, function() {
    
                            })
                        }).catch(function(err) {
                            console.log(err);
                            alert("rpc失败，请检查网络！");//TODO 
                        });
                    }
                });
            }         
        })
        
    }, []);

    useEffect(() => {
        
    }, []);

    let ACC = ""

    if (certs != undefined){
        ACC = certs.map((cert,i) =>
            // 又对啦！key应该在数组的上下文中被指定
            <div>
                <AwesomeCredentialCard userInfo={cert} num={i} />
                <br />
            </div>
            //<ListContent key={authHistory.toString()} num={i} org={authHistory} status={true} index = {1}/>
        );
    }

    return (
        <div align="center">
            <br />
            {ACC}
            <br />
            <br />
            <br />
            <Button color="primary" variant="contained" onClick={() => {props.history.push({pathname: `/subcard`})}}> 添加新凭证 </Button>
            <br />
            <br />
            <br />
        </div>
    )
})

export { CardsWithRouter as CardsContent }

