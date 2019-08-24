/*global chrome*/
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    }
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const RegisterWithRouter = withRouter(function RegisterContent(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name:"Default Name"
    });
    const handleChange = key => event => {
        setValues({ ...values, [key]: event.target.value });
    };

    const [value,setValue] = React.useState(0)
    function handleChangePage(event, newValue) {
        setValue(newValue);
    }

    const register = () => {
        console.log("in register")
        fetch("http://192.168.1.111:8080/user/createWeId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                "name":values.name,
                "type": 0
            })
        }).then(function(res) {
            if (res.status === 200) {
                return res.json()
            } else {
                return Promise.reject(res.json())
            }
        }).then(function(data) {
            console.log(data);
            chrome.storage.local.set({nickName: values.name}, function() {
                chrome.storage.local.set({weId: data.data.weId}, function() {
                    console.log('Weid is set to ' + data.data.weId);
                    chrome.storage.local.set({prvKey: data.data.userWeIdPrivateKey.privateKey}, function() {
                        console.log('prvKey is set to ' + data.data.userWeIdPrivateKey.privateKey);
                    });
                    chrome.storage.local.set({pubKey: data.data.userWeIdPublicKey.publicKey}, function() {
                        console.log('PubKey is set to ' + data.data.userWeIdPublicKey.publicKey);
                        alert("WeID创建成功！"); //TODO Dialog组件
                        props.history.push({pathname: `/home`})
                    });
                }); 
            });
        }).catch(function(err) {
            console.log(err);
            alert("创建失败，请检查网络！");
        });
    }

    return (
        <div>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChangePage}
                        aria-label="simple tabs example"
                    >
                        <Tab label="创建" {...a11yProps(0)}/>
                        <Tab label="导入" disabled {...a11yProps(1)}/>
                        <Tab label="连接" disabled {...a11yProps(2)}/>
                    </Tabs>
                </Paper>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <div>
                    <Button variant="outlined" className={classes.button} onClick={()=>{props.history.push({pathname: `/home`})}}>
                        取消
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={register}>
                        创建
                    </Button>
                </div>
            
        </div>
    )
})

export {RegisterWithRouter as RegisterContent}