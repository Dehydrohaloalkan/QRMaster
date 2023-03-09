import React from 'react'
import { Icon } from "react-native-elements"
import { TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
    onPress: VoidFunction
}

const GenerateButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Icon
                name='checkmark-outline'
                type='ionicon'
                color='#0F0' />
        </TouchableOpacity>
    )
}

export default GenerateButton

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 100,
        marginRight: 10,
    },
})