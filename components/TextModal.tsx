import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react'
import ModalView from './ModalView'
import * as Clipboard from 'expo-clipboard';

type Props = {
    visible: Boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    data: string
}

const TextModal = (props: Props) => {
    return (
        <ModalView visible={props.visible} setVisible={props.setVisible}>

            <ScrollView style={styles.scroll}>
                <Text>{props.data}</Text>
            </ScrollView>

            <TouchableOpacity
                onPress={() => Clipboard.setStringAsync(props.data)}
                style={styles.button}>
                <Text>Copy!</Text>
            </TouchableOpacity>
        </ModalView>
    )
}

export default TextModal

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#00C853",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        minWidth: '80%'
    }
})