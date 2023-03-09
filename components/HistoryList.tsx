import React from 'react'
import { FlatList } from 'react-native';
import { Qrcode } from '../services/SQLite.service';
import HistoryElement from './HistoryElement';

type Props = {
    data: Qrcode[],
    onRemove?: Function,
}

const HistoryList = (props: Props) => {
    return (
        <FlatList
            data={props.data}
            renderItem={({ item }) => (
                <HistoryElement item={item} onRemove={props.onRemove} />
            )}
        />
    )
}

export default HistoryList
