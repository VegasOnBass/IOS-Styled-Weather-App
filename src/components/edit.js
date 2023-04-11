import React from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback, Pressable } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { changeToCelsius, changeToFahrenheit, toggleEdit } from "../redux/editFunctions"
import { Ionicons } from '@expo/vector-icons';


export default function Edit() {
    const dispatch = useDispatch()
    const showEdit = useSelector((state) => state.editFunctions.showEdit)
    const temp = useSelector((state) => state.editFunctions.temp)

    return (
        <>
            {showEdit &&
                <TouchableWithoutFeedback onPress={() => dispatch(toggleEdit())}>
                    <View style={styles.container}>
                        <>
                            <Pressable onPress={() => dispatch(changeToCelsius())} style={[styles.row, { marginVertical: 5 }]} >
                                <View style={{ width: '15%' }} >
                                    {temp == 'temp_c' && <Ionicons name="checkmark" size={20} color="white" />}
                                </View>
                                <View style={{ width: '70%' }} >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Celsius</Text>
                                </View>
                                <View style={{ width: '15%' }} >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>°C</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => dispatch(changeToFahrenheit())} style={[styles.row, { marginVertical: 5 }]} >
                                <View style={{ width: '15%' }} >
                                    {temp == 'temp_f' && <Ionicons name="checkmark" size={20} color="white" />}
                                </View>
                                <View style={{ width: '70%' }} >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Fahrenheit</Text>
                                </View>
                                <View style={{ width: '15%' }} >
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>°F</Text>
                                </View>
                            </Pressable>
                        </>
                    </View>
                </TouchableWithoutFeedback>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(46,48,55,255)',
        width: 200,
        height: 'auto',
        padding: 10,
        borderRadius: 15,
        position: 'absolute',
        right: 25,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})