import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import HistoryList from '../components/HistoryList'
import { Qrcode, getAllQRCodes } from '../services/SQLite.service';

type Props = {}

const HistoryScreen = (props: Props) => {
    const [QRCodes, setQRCodes] = useState<Qrcode[]>([]);
    const navigation = useNavigation();
    
    const getQRCodes = async () => {
        const data:any = await getAllQRCodes();
        setQRCodes(data);
    }

    useEffect(() => {
        navigation.addListener('focus', getQRCodes);
        return () => {
            navigation.removeListener('focus', getQRCodes);
        }
    }, [navigation]);
    
    return (
        <View>
            <HistoryList data={QRCodes} onRemove={() => getQRCodes()}/>
        </View>
    )
}

export default HistoryScreen