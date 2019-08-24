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
    }
}))

//props.history.push({pathname: `/home`})

const CardsWithRouter = withRouter(function CardsContent(props) {
    const [data, setData] = React.useState("null")
    const classes = useStyles()

    return (
        <div>
            123
        </div>
    )
})

export {CardsWithRouter as CardsContent}

