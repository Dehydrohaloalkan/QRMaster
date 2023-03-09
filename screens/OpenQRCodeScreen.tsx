import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import DeleteButton from '../components/DeleteButton';
import { removeQRCode } from '../services/SQLite.service';

type Props = {
    route: any
}

const OpenQRCodeScreen = (props: Props) => {
    const navigation = useNavigation();
    const [svgRef, setSvgRef] = useState<any>();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <DeleteButton onPress={() => {
                    removeQRCode(props.route.params.QRCode);
                    navigation.goBack();
                }} />
            )
        })
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.border}>
                <Text style={styles.title}>QRCode: </Text>
                <QRCode
                    value={props.route.params.QRCode.description}
                    size={315}
                    linearGradient={['#b72e3e', '#624ad8']}
                    enableLinearGradient={true}
                    getRef={(ref) => setSvgRef(ref)}
                />
                <Text style={styles.title}>Text: </Text>
                <Text >{props.route.params.QRCode.description}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => Clipboard.setStringAsync(props.route.params.QRCode.description)}
                        style={styles.button}>
                        <Text>Copy text</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default OpenQRCodeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    border: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 8,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFF',
        flex: 1,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#00C853",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
})