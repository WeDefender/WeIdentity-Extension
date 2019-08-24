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
    const [data, setData] = React.useState("null")
    const classes = useStyles()

    const userInfo = {
        "weid": "did:weid:1:0xac82c2c1f986f2da31d8475d48a595b6533e3ef6",
        "name": "林泽培",
        "gender": "男",
        "birthday": "1995-05-09",
        "address": "浙江省",
        "identityNumber": "330xxxxxxxxxxxxxxx",
        "phoneNumber": "18862173084"
    }

    return (
        <div>
            <AwesomeCredentialCard userInfo={userInfo} />
            <br></br>
            <AwesomeCredentialCard userInfo={userInfo} />
            <br></br>
            <AwesomeCredentialCard userInfo={userInfo} />
            <br></br>
            <AwesomeCredentialCard userInfo={userInfo} />
            <br></br>
            <AwesomeCredentialCard userInfo={userInfo} />
            <br></br>
            <AwesomeCredentialCard userInfo={userInfo} />
        </div>
    )
})

export { CardsWithRouter as CardsContent }

