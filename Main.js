import { useState, memo } from 'react'
import { View, Pressable, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {  useDispatch } from 'react-redux'



import CityScreen from './src/screens/CityScreen'
import SearchScreen from './src/screens/SearchScreen'
import AddScreen from './src/screens/AddScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { currentLocationHook } from './src/hooks/currentLocationHook'

import CityViewFooter from './src/components/cityViewFooter';
import { toggleEdit } from './src/redux/editFunctions'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

/* function TabScreen() {
    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CityViewFooter {...props} />}
        >
            <Tab.Screen  name='Citywithtab' component={CityScreen}/>
        
        </Tab.Navigator>
    )
}
 */

export default function Main() {
    const dispatch = useDispatch()
    currentLocationHook()

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='City'
                    component={CityScreen}
                    options={{
                        headerShown: false,
                        footer: memo((props) => <CityViewFooter {...props} />)
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        gestureEnabled: false,
                        headerBackTitleVisible: false,
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerRight: () => (
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    onPress={() => dispatch(toggleEdit())}
                                >
                                    <MaterialCommunityIcons
                                        name="dots-horizontal-circle-outline"
                                        size={24}
                                        color="white" />
                                </Pressable>
                            </View>

                        ),
                        headerLeft: () => (
                            <View></View>
                        )
                    }}
                />
                <Stack.Screen
                    name="Add"
                    component={AddScreen}
                    options={{
                        headerShown: false,
                        animation: "slide_from_bottom",
                        presentation: "modal"
                    }}

                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

