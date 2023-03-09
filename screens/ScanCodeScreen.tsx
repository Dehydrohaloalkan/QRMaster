import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

import TextModal from '../components/TextModal';
import ChangeIsScanButton from '../components/ChangeIsScanButton';
import GoToHistoryButton from '../components/GoToHistoryButton';
import GoToGenerateButton from '../components/GoToGenerateButton';
import { addQRCode, createTable, QRCodeType } from '../services/SQLite.service';

type Props = {}

const ScanCodeScreen = (props: Props) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const [data, setData] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        navigation.setOptions({
            headerRight: () => (
                <GoToHistoryButton onPress={() => navigation.navigate('History')} />
            )
        })
        createTable();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsScan(false);
        });
        return () => {
            navigation.removeListener('focus', unsubscribe);
        }
    }, [navigation]);

    const onCodeScanned = (scanData: BarCodeEvent) => {
        setData(scanData.data);
        setModalVisible(true);
        setIsScan(false);

        addQRCode({
            id: -1,
            description: scanData.data,
            type: QRCodeType.Scanned,
        })

        if (scanData.data.toLowerCase().startsWith('http') || scanData.data.toLowerCase().startsWith('https')) {
            Linking.openURL(scanData.data);
        }
    }

    return (
        <View style={styles.container}>
            <ChangeIsScanButton isScan={isScan} setIsScan={setIsScan}></ChangeIsScanButton>
            {!hasPermission
                ? <Text>Give Permission</Text>
                : isScan && <BarCodeScanner
                    style={styles.full}
                    onBarCodeScanned={onCodeScanned} />}
            <GoToGenerateButton onPress={() => navigation.navigate('GenerateCode')}/>
            <TextModal visible={modalVisible} setVisible={setModalVisible} data={data}></TextModal>
        </View>
    )
}

export default ScanCodeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    full: {
        height: '67%',
        width: '100%',
    },
})
