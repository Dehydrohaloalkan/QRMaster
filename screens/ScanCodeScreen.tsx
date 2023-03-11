import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner'

import TextModal from '../components/TextModal';
import ChangeIsScanButton from '../components/ChangeIsScanButton';
import GoToHistoryButton from '../components/GoToHistoryButton';
import GoToGenerateButton from '../components/GoToGenerateButton';
import { addQRCode, createTable, QRCodeType } from '../services/SQLite.service';
import SettingsButton from '../components/SettingsButton';
import SettingsModal from '../components/SettingsModal';
import { useLocales } from '../hooks/useLocales';

type Props = {}

const ScanCodeScreen = (props: Props) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const [data, setData] = useState('');
    const navigation = useNavigation();
    const [settingsVisible, setSettingsVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        navigation.setOptions({
            headerRight: () => (
               <SettingsButton onPress={() => setSettingsVisible(true)}/> 
            )
        })
        createTable();
    }, []);

    let permission = useLocales('permission');

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
            <GoToHistoryButton onPress={() => navigation.navigate('History')} />
            <ChangeIsScanButton isScan={isScan} setIsScan={setIsScan}></ChangeIsScanButton>
            {!hasPermission
                ? <Text>{permission}</Text>
                : isScan && <BarCodeScanner
                    style={styles.full}
                    onBarCodeScanned={onCodeScanned} />}
            <GoToGenerateButton onPress={() => navigation.navigate('GenerateCode')}/>
            <TextModal visible={modalVisible} setVisible={setModalVisible} data={data}/>
            <SettingsModal visible={settingsVisible} setVisible={setSettingsVisible} />
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
