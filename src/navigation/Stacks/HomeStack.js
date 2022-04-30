import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/homeTabs/HomeScreen';
import AlbumScreen from '../../screens/main/AlbumScreen';
import React from 'react'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                gesturesEnabled: false,
                animation: "slide_from_right",
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{ animation: "slide_from_bottom" }} />
        </Stack.Navigator>
    );
}

export default HomeStack