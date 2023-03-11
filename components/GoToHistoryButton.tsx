import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocales } from '../hooks/useLocales';

type Props = {
    onPress: (event: GestureResponderEvent) => void,
}

const GoToHistoryButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={styles.text}>{useLocales("history")}</Text>
        </TouchableOpacity>
    )
}

export default GoToHistoryButton

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
        backgroundColor: '#E7EEFE',
    },
    text: {
        fontSize: 20,
    }
})