/*global chrome*/
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import getStorage from '../../_component/Storage'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))



const VerifyWithRouter = withRouter(function VerifyContent(props) {
    const classes = useStyles()
    const [data, setData] = React.useState("null")

    useEffect(() => {
        /*
        chrome.storage.local.get(['weId'], function(result) {
            console.log('Value currently is ' + result.weId)
            setData(result.weId)
        })
        */
        getStorage("weId", function (result) {
            console.log('Value currently is ' + result.weId)
            setData(result.weId)
        })
    }, [])

    const [values, setValues] = React.useState({
        name: "Default Name",
        gender: "",
        birthday: "",
        address: "",
        identityNumber: "",
        phoneNumber: ""
    })

    const handleChange = key => event => {
        setValues({ ...values, [key]: event.target.value })
    }

    const requestVerified = () => {
        console.log("in register")
        fetch("http://192.168.1.111:8080/user/requestVerifyWeId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                weid: data,
                name: values.name,
                gender: values.gender,
                birthday: values.birthday,
                address: values.address,
                identityNumber: values.identityNumber,
                phoneNumber: values.phoneNumber
            })
        }).then(function (res) {
            if (res.status === 200) {
                return res.json()
            } else {
                return Promise.reject(res.json())
            }
        }).then(function (data) {
            console.log(data)
            chrome.storage.local.set({ identityData: values }, function () {
                alert("审核提交成功！")//TODO Dialog组件
                props.history.push({ pathname: `/home` })
            })

        }).catch(function (err) {
            console.log(err)
            alert("创建失败，请检查网络！")
        })
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
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">性别</InputLabel>
                    <Select
                        value={values.gender}
                        onChange={handleChange('gender')}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value="男">男</MenuItem>
                        <MenuItem value="女">女</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <br></br>
            <div>
                <TextField
                    id="date"
                    label="生日"
                    type="date"
                    defaultValue="1999-05-24"
                    value={values.birthday}
                    className={classes.textField}
                    onChange={handleChange('birthday')}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    type="number"
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
                    type="number"
                    label="电话号码"
                    className={classes.textField}
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                />
            </div>
            <div>
                <Button variant="outlined" className={classes.button} onClick={() => { props.history.push({ pathname: `/home` }) }}>
                    取消
                    </Button>
                <Button variant="outlined" color="primary" className={classes.button} onClick={requestVerified}>
                    提交审核
                    </Button>
            </div>
        </div>
    )
})

export { VerifyWithRouter as VerifyContent }