import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../redux/savedLocations'

import CityScreen from './CityScreen'

export default function AddScreen({ route }) {
    const { city } = route.params;
    const [showAddBtn, setShowAddBtn] = useState(null)
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const locationNames = useSelector((state) => state.locations.names)

    useEffect(() => {
        setShowAddBtn(locationNames.includes(city));
    }, [city])

    return (
        <CityScreen route={route} >
            <View style={styles.container} >
                <View style={styles.row} >
                    <Button
                        title='Cancel'
                        onPress={() => navigation.goBack()}
                        color='white'
                    />
                    {
                        !showAddBtn && <Button
                            title='Add'
                            color='white'
                            onPress={() => {
                                dispatch(addLocation(city))
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [
                                            { name: 'Search' },
                                        ],
                                    })
                                );
                            }}
                        />
                    }
                </View>
            </View>
        </CityScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,

    },
    center: {
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
