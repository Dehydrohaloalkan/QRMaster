import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useLocales } from '../hooks/useLocales';

type Props = {
    isScan: Boolean,
    setIsScan: Dispatch<SetStateAction<boolean>>
}

const ChangeIsScanButton = (props: Props) => {     
    
    let start = useLocales('start_scanning');
    let stop = useLocales('stop_scanning');
    
    return (
        <TouchableOpacity
            style={[styles.button, props.isScan ? styles.redButton : styles.greenButton]}
            activeOpacity={0.6}
            onPress={() => props.setIsScan(!props.isScan)}
        >
            <Text style={styles.text}>
                {props.isScan ? stop : start}
            </Text>
        </TouchableOpacity>
    )
}

export default ChangeIsScanButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        width: '92%',
        elevation: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    redButton: {
        backgroundColor: '#f02534',
    },
    greenButton: {
        backgroundColor: '#40ab68',
    },
    text: {
        fontSize: 20,
    }
})