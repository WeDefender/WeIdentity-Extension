/*global chrome*/
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { CssBaseline,Button } from '@material-ui/core';



export function HomeContent() {
    const [data, setData] = React.useState("null")

    return (
        <div>
            
            <Button
                onClick={() => {
                    let value = "12345"

                    chrome.storage.local.set({weId: value}, function() {
                        console.log('Value is set to ' + value);
                    });
                    
                      
                }}>
                writeData
            </Button>
            <Button
                onClick={() => {
                    chrome.storage.local.get(['weId'], function(result) {

                        console.log('Value currently is ' + result.weId);
                        setData(result.weId)
                    });
                }}>
                getData
            </Button>
            <p> {data} </p>
        </div>
    )
}

