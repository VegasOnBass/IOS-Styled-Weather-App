import React, { useState, useMemo } from 'react'
import { StyleSheet, View, ScrollView, Text, Pressable, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import SwipeToDelete from '../components/swipeToDelete'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

import Background from '../components/background'
import SearchBar from "../components/searchBar"
import { searchWeather } from '../components/api'
import { weatherHook } from '../hooks/weatherHook';
import { isDaytimeHook } from '../hooks/isDaytimeHook'
import Edit from '../components/edit'

// Component for list of search results
const SearchList = ({ searchList }) => {
    const navigation = useNavigation();

    return (
        <View>
            {
                searchList.map((item) => {
                    const {
                        name,
                        region,
                        country,
                        url
                    } = item

                    return (
                        <Pressable key={url} onPress={() => navigation.navigate('Add', { city: url })}>
                            <View style={[ styles.searchResults ,{ padding: 10 }]}>
                                <Text style={{ color: 'white' }}>{name}, {region}, {country}</Text>
                            </View>
                        </Pressable>
                    )

                })
            }
        </View>
    )


}



// Component to display saved locations on search screen
const LocationPreview = React.memo((weatherData) => {
    const temp = useSelector((state) => state.editFunctions.temp)

    const {
        location: {
            name,
            localtime
        },
        current: {
            temp_f,
            temp_c,
            condition: {
                text
            }
        },
        forecast: {
            forecastday: [{
                day: {
                    maxtemp_f,
                    mintemp_f,
                    maxtemp_c,
                    mintemp_c
                },
                astro: {
                    sunrise,
                    sunset
                }
            }]
        }
    } = weatherData

    const currentTime = new Date(localtime.replace(/-/g, '\/')).toLocaleTimeString().replace(/:\d+ /, ' ')
    const { isDaytime } = isDaytimeHook({ currentTime, sunrise, sunset })

    return (
        <View>
            <Background isDaytime={isDaytime} style={styles.locationContainer} >
                <View style={styles.row} >
                    <View>
                        <Text style={[styles.location, styles.text]} >{name}</Text>
                        <Text style={styles.text}>{currentTime}</Text>
                    </View>
                    <View>
                        <Text style={[styles.temp, styles.text]} >{temp == 'temp_f' ? Math.round(temp_f) : Math.round(temp_c)}°</Text>
                    </View>
                </View>
                <View style={[styles.row, styles.text]} >
                    <View>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>H:{temp == 'temp_f' ? Math.round(maxtemp_f) : Math.round(maxtemp_c)}° L:{temp == 'temp_f' ? Math.round(mintemp_f) : Math.round(mintemp_c)}°</Text>
                    </View>
                </View>
            </Background>
        </View>
    )




})

const PreviewContainer = React.memo(({ locationName }) => {
    const navigation = useNavigation();
    const { weatherData } = weatherHook(locationName)

    if (!weatherData) {
        return (
            <View style={styles.locationContainer} >
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <LocationPreview  {...weatherData} />
    )
})


// Component to show current location preview
const CurrentLocationPreview = React.memo((weatherData) => {
    const temp = useSelector((state) => state.editFunctions.temp)


    const {
        location: {
            name,
            localtime
        },
        current: {
            temp_f,
            temp_c,
            condition: {
                text
            }
        },
        forecast: {
            forecastday: [{
                day: {
                    maxtemp_f,
                    mintemp_f,
                    maxtemp_c,
                    mintemp_c
                },
                astro: {
                    sunrise,
                    sunset
                }
            }]
        }
    } = weatherData

    const currentTime = new Date(localtime.replace(/-/g, '\/')).toLocaleTimeString().replace(/:\d+ /, ' ')
    const { isDaytime } = isDaytimeHook({ currentTime, sunrise, sunset })


    return (
        <Background isDaytime={isDaytime} style={styles.locationContainer} >
            <View style={styles.row} >
                <View>
                    <Text style={[styles.location, styles.text]} >My Location</Text>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View>
                    <Text style={[styles.temp, styles.text]} >{temp == 'temp_f' ? Math.round(temp_f) : Math.round(temp_c)}°</Text>
                </View>
            </View>
            <View style={styles.row}  >
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View>
                    <Text style={styles.text}>H:{temp == 'temp_f' ? Math.round(maxtemp_f) : Math.round(maxtemp_c)}° L:{temp == 'temp_f' ? Math.round(mintemp_f) : Math.round(mintemp_c)}°</Text>
                </View>
            </View>
        </Background>
    )

})


// Main  search screen component
export default function SearchScreen() {
    const navigation = useNavigation();
    const currentLocation = useSelector((state) => state.currentLocation.location)
    const { weatherData, error, isLoading } = weatherHook(currentLocation);
    const [search, setSearch] = useState([])
    const locationNames = useSelector((state) => state.locations.names)
    const memoizedLocationNames = useMemo(() => locationNames, [locationNames]);


    const getSearchData = async (text) => {
        if (text.length >= 3) {
            try {
                const results = await searchWeather(text)
                if (results) {
                    setSearch(results)
                } else {
                    setSearch([])
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setSearch([])
        }

    }

    if (!weatherData) {
        return null
    }

    return (
        <ScrollView style={styles.container} >
            <View style={{ width: '90%', alignSelf: 'center' }} >
                <Text style={styles.header} >Weather</Text>
                <SearchBar getData={getSearchData} />
                <SearchList searchList={search} />
                {search.length == 0 && <Pressable onPress={() => navigation.navigate('City', { city: currentLocation })} >
                    <CurrentLocationPreview  {...weatherData} />
                </Pressable>}
                {search.length == 0 && memoizedLocationNames.map(locationName => {
                    
                    const key = nanoid()
                    
                    return (
                        <SwipeToDelete key={key} locationName={locationName} >
                            <Pressable onPress={() => navigation.navigate('City', { city: locationName })} >
                                <PreviewContainer locationName={locationName} />
                            </Pressable>
                        </SwipeToDelete>
                    )
                })}
            </View>
            <Edit />
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        overflow: 'visible',
        zIndex: 2

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 10,
    },
    locationContainer: {
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white'
    },
    location: {
        fontSize: 20,
        fontWeight: '700'
    },
    temp: {
        fontSize: 40
    },
    
})