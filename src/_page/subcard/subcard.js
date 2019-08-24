/*global chrome*/
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { CssBaseline,Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: "coloum"
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    }
}))

//props.history.push({pathname: `/home`})

const SubCardWithRouter = withRouter(function SubCardContent(props) {
    const [data, setData] = React.useState("null")
    const classes = useStyles()
    const [values, setValues] = React.useState({
        name:false,
        gender:false,
        birthday:false,
        address:false,
        identityNumber:false,
        phoneNumber:false
    });
    /*{
	"weid":"did:weid:1:0xa1bd5ff47db4afb554004c25d846a9fe14f726cd",
	"claimPolicyJson":{
		"weid": 1,
		"name": 0,
		"gender": 1,
		"birthday": 1,
		"address": 0,
		"identityNumber": 0
	}
}   */ 
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.checked });
    };
    
    const { name, gender, birthday, address, identityNumber, phoneNumber } = values;
    return (
        <div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">选取子凭证数据条目</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={name} onChange={handleChange('name')} value="name" />}
                            label="姓名"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={gender} onChange={handleChange('gender')} value="gender" />}
                            label="性别"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={birthday} onChange={handleChange('birthday')} value="birthday" />
                            }
                            label="出生日期"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={address} onChange={handleChange('address')} value="address" />}
                            label=" 家庭住址"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={identityNumber} onChange={handleChange('identityNumber')} value="identityNumber" />}
                            label=" 身份证号"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={phoneNumber} onChange={handleChange('phoneNumber')} value="phoneNumber" />}
                            label="电话号码"
                        />
                    </FormGroup>
                </FormControl>
            </div>
            <div>
                <Button variant="outlined" className={classes.button} onClick={()=>{props.history.push({pathname: `/home`})}}>
                    取消
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}>
                    创建
                </Button>
            </div>
        </div>
    )
})

export {SubCardWithRouter as SubCardContent}

