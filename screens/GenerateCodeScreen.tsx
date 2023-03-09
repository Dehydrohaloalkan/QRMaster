import { View, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import GenerateButton from '../components/GenerateButton'
import CodeModal from '../components/CodeModal'
import { QRCodeType, addQRCode } from '../services/SQLite.service';

type Props = {}

const GenerateCodeScreen = (props: Props) => {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <GenerateButton onPress={() => {
                    setModalVisible(true);
                    text && addQRCode({
                        id: -1,
                        description: text,
                        type: QRCodeType.Generated
                    })
                }} />
            ),
        });
    }, [text]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.description}
                placeholder="ADD CONTENT..."
                onChangeText={(text) => setText(text)}
                multiline={true}
            />
            <CodeModal visible={modalVisible} setVisible={setModalVisible} data={text} />
        </View>
    )
}

export default GenerateCodeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 3,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    description: {
        fontSize: 18,
    },
});