import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { removeQRCode, Qrcode, QRCodeType } from '../services/SQLite.service';
import QRCode from "react-native-qrcode-svg";
import React from "react";

type Props = {
    item: Qrcode,
    onRemove?: Function
}

const HistoryElement = (props: Props) => {
    const navigation = useNavigation();

    const colors = new Map();
    colors.set(QRCodeType.Generated, styles.greenContainer);
    colors.set(QRCodeType.Scanned, styles.blueContainer);

    const deleteCurrentQRCode = async () => {
        removeQRCode(props.item)
        props.onRemove?.();
    }

    const promptToDeleteNote = () => {
        Alert.alert(
            'Deletion',
            'Do you want to delete this note?',
            [
                { text: 'Yes', style: 'destructive', onPress: deleteCurrentQRCode },
                { text: 'No', style: 'cancel' }
            ]);
    }

    return (
        <TouchableOpacity
            style={[styles.container, colors.get(props.item.type)]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OpenQRCode', { QRCode: props.item })}
            onLongPress={promptToDeleteNote}
        >
            <QRCode value={props.item.description} size={100}></QRCode>
            <Text numberOfLines={5} style={styles.title}>{props.item.description}</Text>
        </TouchableOpacity>
    )
}

export default HistoryElement

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 8,
        borderRadius: 10,
        elevation: 3,
        flexDirection: 'row',
    },
    greenContainer: {
        backgroundColor: '#dfffbf',
    },
    blueContainer: {
        backgroundColor: '#b4f2fa',
    },
    title: {
        fontSize: 15,
        marginHorizontal: 10,
        paddingRight: 60
    },
})