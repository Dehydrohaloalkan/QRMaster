import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ScanCodeScreen from '../screens/ScanCodeScreen';
import GenerateCodeScreen from '../screens/GenerateCodeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import OpenQRCodeScreen from '../screens/OpenQRCodeScreen';

type Props = {}

const Stack = createStackNavigator();

const Navigation = (props: Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 250 } },
                        close: { animation: 'timing', config: { duration: 250 } },
                    },
                    cardStyleInterpolator: ({ current, next, layouts }) => {
                        return {
                            cardStyle: {
                                transform: [
                                    {
                                        translateX: current.progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [layouts.screen.width, 0],
                                        }),
                                    },
                                    {
                                        scale: next
                                            ? next.progress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 0.9],
                                            })
                                            : 1,
                                    },
                                ],
                            },
                            overlayStyle: {
                                opacity: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                }),
                            },
                        };
                    },
                }}
                initialRouteName="ScanCode">
                <Stack.Screen
                    name="ScanCode"
                    component={ScanCodeScreen}
                    options={{
                        title: 'Scan QR Code',
                    }}
                />
                <Stack.Screen
                    name="GenerateCode"
                    component={GenerateCodeScreen}
                    options={{
                        title: 'Generate QR Code',
                    }}
                />
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{
                        title: 'History',
                    }}
                />
                <Stack.Screen
                    name="OpenQRCode"
                    component={OpenQRCodeScreen}
                    options={{
                        title: 'History',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation