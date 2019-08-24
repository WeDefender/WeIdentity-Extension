import React from 'react'
import HealthCard from 'react-health-card'
import './card.css'
import './card-types.css'


export function AwesomeCredentialCard(props) {

    const [flippy, setFlippy] = React.useState(false)

    const handleFlippy = () => {
        setFlippy(!flippy)
    }

    const userInfo = props.userInfo

    const handleLongString = (str) => {
        if (str !== undefined && str.length > 20) {
            return str.substr(0, 12) + '...' + str.substr(str.length - 8, str.length - 1)
        }
        return str
    }

    let name = handleLongString(userInfo.name)
    let phoneNumber = handleLongString(userInfo.phoneNumber)
    let weid = handleLongString(userInfo.weid)
    let identityNumber = handleLongString(userInfo.identityNumber)

    return (
        <div onClick={handleFlippy}>
            <HealthCard
                issueNumberTitle="身份证号"
                cardNumberTitle="数字身份"
                issueDateTitle="出生日期"
                memberNumberTitle="手机号码"
                bgColorFront="#000000"
                bgColorBack="#000000"
                issueDateFormat="YYYY-MM-DD"
                cardNumber={weid}
                name={userInfo.gender}
                issueDate={userInfo.birthday}
                issueNumber={identityNumber}
                rank={name}
                rankPosition="back"
                memberNumber={phoneNumber}
                memberNumberLength={9}
                focused="cardNumber"
                isFlipped={flippy}
            />
        </div>
    )
}  
