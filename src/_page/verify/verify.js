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
import getStorage from '../../_component/Storage'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
    }
  }));



const VerifyWithRouter = withRouter(function VerifyContent(props) {
    const classes = useStyles();
    const [data, setData] = React.useState("null")
    
    useEffect(() => {
        /*
        chrome.storage.local.get(['weId'], function(result) {
            console.log('Value currently is ' + result.weId);
            setData(result.weId)
        });
        */
       getStorage("weId",function(result){
            console.log('Value currently is ' + result.weId);
            setData(result.weId)
       })
    }, []);

    const [values, setValues] = React.useState({
        name:"Default Name",
        gender:"",
        birthday:"",
        address:"",
        identityNumber:"",
        phoneNumber:""
    });

    const handleChange = key => event => {
        setValues({ ...values, [key]: event.target.value });
    };

    const requestVerified = () => {
        console.log("in register")
        fetch("http://192.168.1.111:8080/user/requestVerifyWeId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                weid:data,
                name:values.name,
                gender:values.gender,
                birthday:values.birthday,
                address:values.address,
                identityNumber:values.identityNumber,
                phoneNumber:values.phoneNumber
            })
        }).then(function(res) {
            if (res.status === 200) {
                return res.json()
            } else {
                return Promise.reject(res.json())
            }
        }).then(function(data) {
            console.log(data);
            chrome.storage.local.set({identityData: values}, function() {
                alert("审核成功！");//TODO Dialog组件
                props.history.push({pathname: `/home`})
            }); 
            
        }).catch(function(err) {
            console.log(err);
            alert("创建失败，请检查网络！");
        });
    }
    
    return (
        <div>
            <div>
                <TextField
                    id="standard-name"
                    label="姓名"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
            </div> 
            <div>
                <TextField
                    id="standard-name"
                    label="性别"
                    className={classes.textField}
                    value={values.gender}
                    onChange={handleChange('gender')}
                    margin="normal"
                />
            </div> 
            <div>
                <TextField
                    id="standard-name"
                    label="生日"
                    className={classes.textField}
                    value={values.birthday}
                    onChange={handleChange('birthday')}
                    margin="normal"
                />
            </div> 
            <div>
                <TextField
                    id="standard-name"
                    label="地址"
                    className={classes.textField}
                    value={values.address}
                    onChange={handleChange('address')}
                    margin="normal"
                />
            </div> 
            <div>
                <TextField
                    id="standard-name"
                    label="身份证号码"
                    className={classes.textField}
                    value={values.identityNumber}
                    onChange={handleChange('identityNumber')}
                    margin="normal"
                />
            </div> 
            <div>
                <TextField
                    id="standard-name"
                    label="电话号码"
                    className={classes.textField}
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                />
            </div> 
            <div>
                    <Button variant="outlined" className={classes.button} onClick={()=>{props.history.push({pathname: `/home`})}}>
                        取消
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={requestVerified}>
                        提交审核
                    </Button>
            </div>
        </div>
    )
})

export {VerifyWithRouter as VerifyContent}