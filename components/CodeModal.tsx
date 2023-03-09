import { Text } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import ModalView from './ModalView'
import QRCode from 'react-native-qrcode-svg'

type Props = {
    visible: Boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    data: string
}

const CodeModal = (props: Props) => {
    return (
        <ModalView visible={props.visible} setVisible={props.setVisible}>
            {props.data
                ? <QRCode value={props.data} size={290}></QRCode>
                : <Text>No Input Text</Text>}
        </ModalView>
    )
}

export default CodeModal