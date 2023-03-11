import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ModalView from './ModalView'
import i18n from '../locales/LocalesController'
import { CheckBox } from 'react-native-elements'
import { useLocales } from '../hooks/useLocales';

type Props = {
    visible: Boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

const SettingsModal = (props: Props) => {
    const [checked, setChecked] = useState<string>(i18n.locale);
    
    const changeLocales = () => {
        i18n.locale = checked;        
    }
    
    return (
        <ModalView visible={props.visible} setVisible={props.setVisible} callback={changeLocales}>
            <Text style={styles.modalText}>{useLocales('language_settings')}</Text>
            <View>
                {Object.values(i18n.translations).map((item : any) => (
                    <CheckBox
                        key={item.id}
                        title={item.title}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, margin: 0, }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={checked === item.id}
                        onPress={() => setChecked(item.id)}
                    />
                ))}
            </View>
        </ModalView>
    )
}

export default SettingsModal

const styles = StyleSheet.create({
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
})