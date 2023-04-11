import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

const TempRange = ({ min, max, lows, highs }) => {
    const [gaugeWidth, setGaugeWidth] = useState(null)
    const [gaugeLeftSide, setGaugeLeftSide] = useState(0)
    const [gaugeStart, setGaugeStart] = useState(null)
    const [gaugeEnd, setGaugeEnd] = useState(null)

    const tempType = useSelector((state) => state.editFunctions.temp)


    const tempColors = ['#e600e6', '#d001ff', '#9e01ff', '#6600ff',
        '#0000fe', '#004aff', '#0173ff', '#01a2fe',
        '#00ccfe', '#07e5ff', '#02ffff', '#02ffb2',
        '#7fff01', '#cdff00', '#ffff00', '#fee502',
        '#fecc02', '#fe9900', '#ff4800', '#fe0100',
        '#ff4545', '#ff6768', '#ff8787', '#ff9e9e',
        '#ffb5b4', '#ffcecf',]

    let tempsUsed = []

    const lowest = Math.round(Math.min(...lows))
    const highest = Math.round(Math.max(...highs))

    useEffect(() => {
        setGaugeWidth((max - min) / (highest - lowest) * 100)

        if (min === lowest) {
            setGaugeLeftSide(-2)
        } else {
            const l = min - lowest
            setGaugeLeftSide(l / (highest - lowest) * 100 + 2)
        }


    }, [])

    useEffect(() => {

        if (tempType == 'temp_f') {
            if (min >= -20 && min < -15) {
                setGaugeStart(0)
            } else if (min >= -15 && min < -10) {
                setGaugeStart(1)
            } else if (min >= -10 && min < -5) {
                setGaugeStart(2)
            } else if (min >= -5 && min < 0) {
                setGaugeStart(3)
            } else if (min >= 0 && min < 5) {
                setGaugeStart(4)
            } else if (min >= 5 && min < 10) {
                setGaugeStart(5)
            } else if (min >= 10 && min < 15) {
                setGaugeStart(6)
            } else if (min >= 15 && min < 20) {
                setGaugeStart(7)
            } else if (min >= 20 && min < 25) {
                setGaugeStart(8)
            } else if (min >= 25 && min < 30) {
                setGaugeStart(9)
            } else if (min >= 30 && min < 35) {
                setGaugeStart(10)
            } else if (min >= 35 && min < 40) {
                setGaugeStart(11)
            } else if (min >= 40 && min < 45) {
                setGaugeStart(12)
            } else if (min >= 45 && min < 50) {
                setGaugeStart(13)
            } else if (min >= 50 && min < 55) {
                setGaugeStart(14)
            } else if (min >= 55 && min < 60) {
                setGaugeStart(15)
            } else if (min >= 60 && min < 65) {
                setGaugeStart(16)
            } else if (min >= 65 && min < 70) {
                setGaugeStart(17)
            } else if (min >= 70 && min < 75) {
                setGaugeStart(18)
            } else if (min >= 75 && min < 80) {
                setGaugeStart(19)
            } else if (min >= 80 && min < 85) {
                setGaugeStart(20)
            } else if (min >= 85 && min < 90) {
                setGaugeStart(21)
            } else if (min >= 90 && min < 95) {
                setGaugeStart(22)
            } else if (min >= 95 && min < 100) {
                setGaugeStart(23)
            } else if (min >= 100 && min < 105) {
                setGaugeStart(24)
            } else if (min >= 105 && min < 110) {
                setGaugeStart(25)
            } else {
                setGaugeStart(10)
            }

            if (max >= -20 && max < -15) {
                setGaugeEnd(0)
            } else if (max >= -15 && max < -10) {
                setGaugeEnd(1)
            } else if (max >= -10 && max < -5) {
                setGaugeEnd(2)
            } else if (max >= -5 && max < 0) {
                setGaugeEnd(3)
            } else if (max >= 0 && max < 5) {
                setGaugeEnd(4)
            } else if (max >= 5 && max < 10) {
                setGaugeEnd(5)
            } else if (max >= 10 && max < 15) {
                setGaugeEnd(6)
            } else if (max >= 15 && max < 20) {
                setGaugeEnd(7)
            } else if (max >= 20 && max < 25) {
                setGaugeEnd(8)
            } else if (max >= 25 && max < 30) {
                setGaugeEnd(9)
            } else if (max >= 30 && max < 35) {
                setGaugeEnd(10)
            } else if (max >= 35 && max < 40) {
                setGaugeEnd(11)
            } else if (max >= 40 && max < 45) {
                setGaugeEnd(12)
            } else if (max >= 45 && max < 50) {
                setGaugeEnd(13)
            } else if (max >= 50 && max < 55) {
                setGaugeEnd(14)
            } else if (max >= 55 && max < 60) {
                setGaugeEnd(15)
            } else if (max >= 60 && max < 65) {
                setGaugeEnd(16)
            } else if (max >= 65 && max < 70) {
                setGaugeEnd(17)
            } else if (max >= 70 && max < 75) {
                setGaugeEnd(18)
            } else if (max >= 75 && max < 80) {
                setGaugeEnd(19)
            } else if (max >= 80 && max < 85) {
                setGaugeEnd(20)
            } else if (max >= 85 && max < 90) {
                setGaugeEnd(21)
            } else if (max >= 90 && max < 95) {
                setGaugeEnd(22)
            } else if (max >= 95 && max < 100) {
                setGaugeEnd(23)
            } else if (max >= 100 && max < 105) {
                setGaugeEnd(24)
            } else if (max >= 105 && max < 110) {
                setGaugeEnd(25)
            } else {
                setGaugeEnd(10)
            }
        } else {
            if (min >= -28.9 && min < -26.1) {
                setGaugeStart(0)
            } else if (min >= -26.1 && min < -23.3) {
                setGaugeStart(1)
            } else if (min >= -23.3 && min < -20.6) {
                setGaugeStart(2)
            } else if (min >= -20.6 && min < -17.8) {
                setGaugeStart(3)
            } else if (min >= -17.8 && min < -15) {
                setGaugeStart(4)
            } else if (min >= -15 && min < -12.2) {
                setGaugeStart(5)
            } else if (min >= -12.2 && min < -9.4) {
                setGaugeStart(6)
            } else if (min >= -9.4 && min < -6.7) {
                setGaugeStart(7)
            } else if (min >= -6.7 && min < -3.9) {
                setGaugeStart(8)
            } else if (min >= -3.9 && min < -1.1) {
                setGaugeStart(9)
            } else if (min >= -1.1 && min < 1.7) {
                setGaugeStart(10)
            } else if (min >= 1.7 && min < 4.4) {
                setGaugeStart(11)
            } else if (min >= 4.4 && min < 7.2) {
                setGaugeStart(12)
            } else if (min >= 7.2 && min < 10) {
                setGaugeStart(13)
            } else if (min >= 10 && min < 12.8) {
                setGaugeStart(14)
            } else if (min >= 12.8 && min < 15.6) {
                setGaugeStart(15)
            } else if (min >= 15.6 && min < 18.3) {
                setGaugeStart(16)
            } else if (min >= 18.3 && min < 21.1) {
                setGaugeStart(17)
            } else if (min >= 21.1 && min < 23.9) {
                setGaugeStart(18)
            } else if (min >= 23.9 && min < 26.7) {
                setGaugeStart(19)
            } else if (min >= 26.7 && min < 29.4) {
                setGaugeStart(20)
            } else if (min >= 29.4 && min < 32.2) {
                setGaugeStart(21)
            } else if (min >= 32.2 && min < 35) {
                setGaugeStart(22)
            } else if (min >= 35 && min < 37.8) {
                setGaugeStart(23)
            } else if (min >= 37.8 && min < 40.6) {
                setGaugeStart(24)
            } else if (min >= 40.6 && min < 43.3) {
                setGaugeStart(25)
            } else {
                setGaugeStart(10)
            }

            if (max >= -28.9 && max < -26.1) {
                setGaugeEnd(0)
            } else if (max >= -26.1 && max < -23.3) {
                setGaugeEnd(1)
            } else if (max >= -23.3 && max < -20.6) {
                setGaugeEnd(2)
            } else if (max >= -20.6 && max < -17.8) {
                setGaugeEnd(3)
            } else if (max >= -17.8 && max < -15) {
                setGaugeEnd(4)
            } else if (max >= -15 && max < -12.2) {
                setGaugeEnd(5)
            } else if (max >= -12.2 && max < -9.4) {
                setGaugeEnd(6)
            } else if (max >= -9.4 && max < -6.7) {
                setGaugeEnd(7)
            } else if (max >= -6.7 && max < -3.9) {
                setGaugeEnd(8)
            } else if (max >= -3.9 && max < -1.1) {
                setGaugeEnd(9)
            } else if (max >= -1.1 && max < 1.7) {
                setGaugeEnd(10)
            } else if (max >= 1.7 && max < 4.4) {
                setGaugeEnd(11)
            } else if (max >= 4.4 && max < 7.2) {
                setGaugeEnd(12)
            } else if (max >= 7.2 && max < 10) {
                setGaugeEnd(13)
            } else if (max >= 10 && max < 12.8) {
                setGaugeEnd(14)
            } else if (max >= 12.8 && max < 15.6) {
                setGaugeEnd(15)
            } else if (max >= 15.6 && max < 18.3) {
                setGaugeEnd(16)
            } else if (max >= 18.3 && max < 21.1) {
                setGaugeEnd(17)
            } else if (max >= 21.1 && max < 23.9) {
                setGaugeEnd(18)
            } else if (max >= 23.9 && max < 26.7) {
                setGaugeEnd(19)
            } else if (max >= 26.7 && max < 29.4) {
                setGaugeEnd(20)
            } else if (max >= 29.4 && max < 32.2) {
                setGaugeEnd(21)
            } else if (max >= 32.2 && max < 35) {
                setGaugeEnd(22)
            } else if (max >= 35 && max < 37.8) {
                setGaugeEnd(23)
            } else if (max >= 37.8 && max < 40.6) {
                setGaugeEnd(24)
            } else if (max >= 40.6 && max < 43.3) {
                setGaugeEnd(25)
            } else {
                setGaugeEnd(10)
            }
        }
    })

    tempsUsed = tempColors.splice(gaugeStart, gaugeEnd - gaugeStart + 1)
    
    return (
        <View style={[styles.row, styles.center]} >
            <Text style={styles.text} >{Math.round(min)}°</Text>
            <View style={styles.tempBar} >
                {gaugeStart == gaugeEnd ? <View style={[styles.tempRange,
                {
                    backgroundColor: `${tempsUsed}`,
                    width: `${gaugeWidth}%`,
                    left: `${gaugeLeftSide}%`
                }]} /> :
                    <LinearGradient
                        colors={tempsUsed}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[styles.tempRange,
                        {
                            width: `${gaugeWidth}%`,
                            left: `${gaugeLeftSide}%`
                        }]} />}
            </View>
            <Text style={styles.text} >{Math.round(max)}°</Text>
        </View >
    )
}


export default function DayTemps(weather) {
    const temp = useSelector((state) => state.editFunctions.temp)

    const {
        forecast: {
            forecastday
        }
    } = weather

    const lows = []
    const highs = []

    return (
        <View style={styles.container}>
            <Text style={styles.text} >3-Day Forecast</Text>
            {
                forecastday.map((day) => {
                    const {
                        date,
                        day: {
                            maxtemp_f,
                            mintemp_f,
                            maxtemp_c,
                            mintemp_c,
                            condition: { icon }

                        }
                    } = day

                    if (temp == 'temp_f') {
                        lows.push(mintemp_f)
                        highs.push(maxtemp_f)
                    } else {
                        lows.push(mintemp_c)
                        highs.push(maxtemp_c)
                    }


                    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    var dt = new Date(date.replace(/-/g, '\/')).getDay()
                    return (
                        <View key={weekday[dt]} style={[styles.row, styles.center]}>
                            <View style={styles.spot1}>
                                <Text style={styles.text} >{weekday[dt]}</Text>
                            </View>
                            <View style={styles.spot1}>
                                <Image style={styles.icon} source={{ uri: `https:${icon}` }} />
                            </View>
                            <View style={[styles.spot2, styles.center]}>
                                <TempRange lows={lows} highs={highs} min={temp == 'temp_f' ? Math.round(mintemp_f) : mintemp_c} max={temp == 'temp_f' ? Math.round(maxtemp_f) : maxtemp_c} />
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '96%',
        height: 'auto',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.07)',

    },
    spot1: {
        flex: 1
    },
    spot2: {
        flex: 4
    },
    center: {
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    icon: {
        width: 50,
        height: 50,
    },
    text: {
        color: 'white'
    },
    tempBar: {
        width: 100,
        height: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    tempRange: {
        height: 5,
        borderRadius: 10,
        flex: 1
    },
})