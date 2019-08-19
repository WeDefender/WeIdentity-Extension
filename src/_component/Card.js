import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"


const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        textAlign: 'center'
    },
    cardContent: {
        textAlign: 'center'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }
})

function CardT(props) {
    const classes = useStyles()
    const cardDetails = [
        {
            "cptId": "CPT ID: 2000000",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        },
        {
            "cptId": "CPT ID:2000001",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        },
        {
            "cptId": "CPT ID: 2000002",
            "issuer": "颁发者: did:weid:1:0x8dc34e4...23f3bbe7",
            "issuanceDate": "发行日期：20190814",
            "expirationDate": "到期日期：20250814"
        }
    ]

    return (
        <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.cardContent}
                            variant={"h6"}
                            gutterBottom
                        >
                            {"ID:" + 'did:12346567'}
                        </Typography>
                        <Typography
                            className={classes.cardContent}
                            variant={"caption"}
                        >
                            {cardDetails[0].cptId} <br />
                            {cardDetails[0].issuer} <br />
                            {cardDetails[0].issuanceDate}<br />
                            {cardDetails[0].expirationDate}
                        </Typography>
                        <Divider className={classes.divider} light />

                    </CardContent>
                </Card>
        </div>
    )
}

const CardWithStyles = withStyles(useStyles)(CardT)

export default CardWithStyles