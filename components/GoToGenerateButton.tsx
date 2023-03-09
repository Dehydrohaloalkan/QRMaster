import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

type Props = {
    onPress: (event: GestureResponderEvent) => void,
}

const GoToGenerateButton = (props: Props) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={props.onPress}>
            <Icon
                name='add-outline'
                type='ionicon'
                color='#000' />
        </TouchableOpacity>
    )
}

export default GoToGenerateButton

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
        backgroundColor: '#D1FEFF',
        borderRadius: 100,
        elevation: 4,
        color: '#000'
    },
})