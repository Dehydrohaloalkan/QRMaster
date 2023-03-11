import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    children: any,
    visible: Boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    callback?: Function,
}

const ModalView = (props: Props) => {
    const OkButtonPress = () => {
        props.setVisible(!props.visible);
        props.callback?.();
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={Boolean(props.visible)}
            onRequestClose={() => {
                props.setVisible(!props.visible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {props.children}
                    <TouchableOpacity
                        onPress={OkButtonPress}
                        style={styles.button}>
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalView

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: '#FFFFFF',
        maxHeight: '80%',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        elevation: 10,
    },
    button: {
        backgroundColor: '#E7EEFE',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
})