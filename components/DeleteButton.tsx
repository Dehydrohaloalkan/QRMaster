import React from 'react'
import { Icon } from "react-native-elements"
import { TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
    onPress: VoidFunction
}

const DeleteButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Icon
                name='trash-outline'
                type='ionicon'
                color='#F00' />
        </TouchableOpacity>
    )
}

export default DeleteButton

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