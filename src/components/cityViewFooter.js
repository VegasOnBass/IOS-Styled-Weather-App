import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';


export default function CityViewFooter() {
    const navigation = useNavigation()
    const currentLocation = useSelector((state) => state.currentLocation.location)
    const locationNames = useSelector((state) => state.locations.names)


    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <View style={[styles.col1, styles.center]}>
                    <Text></Text>
                </View>
                <View style={[styles.col2, styles.center]}>
                    <View style={styles.row}>
                        <Pressable

                            onPress={() => navigation.navigate('City', { city: currentLocation })}
                        >
                            <FontAwesome 
                            name="location-arrow" 
                            size={16} 
                            color="black"
                            style={{ marginLeft: -9, marginTop: 8, marginRight:3 }} 
                            />
                        </Pressable>
                        {locationNames.map(location => {
                            return (
                                <Pressable
                                    key={location}
                                    onPress={() => navigation.navigate('City', { city: location })}
                                >
                                    <Entypo name="dot-single"
                                        size={35}
                                        color="black"
                                        style={{ marginLeft: -9, marginRight: -9 }}
                                    />
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
                <View style={[styles.col1, styles.center]}>
                    <Pressable
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Feather name="list" size={30} color="black" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        opacity: 10,
        width: '100%',
        height: 80,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
    },
    row: {

        flexDirection: 'row'
    },
    col1: {
        flex: 1
    },
    col2: {
        flex: 2
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationDot: {
        width: 20,
        heght: 20,
        borderRadius: 25,
        backgroundColor: 'red'
    }
});