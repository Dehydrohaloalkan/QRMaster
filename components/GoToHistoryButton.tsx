import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    onPress: (event: GestureResponderEvent) => void,
}

const GoToHistoryButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text>History</Text>
        </TouchableOpacity>
    )
}

export default GoToHistoryButton

const styles = StyleSheet.create({
    button: {
        margin: 15,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7EEFE',
        borderRadius: 10,
    },
})