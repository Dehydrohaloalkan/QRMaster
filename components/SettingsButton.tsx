import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

type Props = {
    onPress: (event: GestureResponderEvent) => void,
}

const SettingsButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Icon
                name='ellipsis-vertical-outline'
                type='ionicon'
                color='#000' />
        </TouchableOpacity>
    )
}

export default SettingsButton

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 100,
    },
});