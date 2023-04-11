import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

export default function Hourly(weather) {
    const temp = useSelector((state) => state.editFunctions.temp)

    const {
        current: {
            temp_f,
            temp_c,
            condition: {
                icon: currentIcon
            }
        },
        location: {
            localtime
        },
        forecast: {
            forecastday
        }
    } = weather

    const hours = [...forecastday[0].hour, ...forecastday[1].hour]
    let currentHour = new Date(localtime.replace(/-/g, '\/')).toLocaleTimeString()

    if (currentHour.includes('PM')) {
        currentHour = +(currentHour.substring(0, currentHour.indexOf(':'))) + 12
        if (currentHour === 24) { currentHour = 12 }
    } else {
        currentHour = +(currentHour.substring(0, currentHour.indexOf(':')))
        if (currentHour === 12) { currentHour = 0 }
    }

    return (
        <View>
            <View style={styles.container} >
                <View style={{ paddingHorizontal: 10, color: 'white' }}>
                    <Text style={styles.text}>Hourly Forecast</Text>
                </View>
                <ScrollView>
                    <View  >
                        <FlatList horizontal
                            style={{ overflow: 'visible', marginHorizontal: 0, }}
                            ListHeaderComponent={
                                <View style={styles.center} >
                                    <Text style={styles.text} >Now</Text>
                                    <Image style={styles.icon} source={{ uri: `https:${currentIcon}` }} />
                                    <Text style={styles.text} >{temp == 'temp_f' ? Math.round(temp_f) : Math.round(temp_c)}°</Text>
                                </View>
                            }
                            data={hours.splice(currentHour + 1, 24)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(hour) => {
                                const {
                                    time,
                                    condition,
                                    temp_f,
                                    temp_c
                                } = hour.item

                                var dt = new Date(time.replace(/-/g, '\/')).toLocaleTimeString().replace(/:\d+ /, ' ');
                                return (
                                    <View style={styles.center}>
                                        <Text style={styles.text}>{dt.replace(/:\d+ /, '')}</Text>
                                        <Image style={styles.icon} source={{ uri: `https:${condition.icon}` }} />
                                        <Text style={styles.text}>{temp == 'temp_f' ? Math.round(temp_f) : Math.round(temp_c)}°</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '96%',
        borderRadius: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.07)',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    icon: {
        width: 50,
        height: 50
    },
    text: {
        color: 'white'
    }
})
