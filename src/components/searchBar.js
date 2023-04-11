import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { debounce } from 'lodash';


function SearchBar({ getData }) {
    const [clicked, setClicked] = useState(false)
    const [inputText, setInputText] = useState('')
    const inputRef = useRef(null)

    const handleSearch = debounce((text) => {
        getData(text);
      }, 300);

    const handleChange = (text) => {
        handleSearch(text)
        setInputText(text)
    }

    const handleCancel = () => {
        setClicked(false);
        inputRef.current.clear()
        getData('')
        setInputText('')
    }

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View
                style={[
                    styles.inputContainer,
                    clicked ? styles.searchbar_clicked : styles.searchbar_unclicked
                ]}
            >
                <AntDesign name="search1" size={18} color="#9a9c9a" />
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    onChangeText={handleChange}
                    placeholder="Search for City"
                    placeholderTextColor={'#9a9c9a'}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {inputText && <Pressable onPress={() => setInputText('')} >
                    <MaterialIcons name="cancel" size={24} color="#9a9c9a" />
                </Pressable>}
            </View>
            {clicked && (
                <View style={{ zIndex: 5, alignSelf: 'center', marginLeft: 10 }} >
                    <Pressable onPress={handleCancel}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Cancel</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default memo(SearchBar)

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#252525',
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchbar_unclicked: {
        width: '100%',
    },
    searchbar_clicked: {
        width: '80%',
        justifyContent: 'space-evenly'
    },
    input: {
        flex: 1,
        width: '80%',
        height: 35,
        color: 'white',
        fontSize: 18,
        paddingLeft: 5

    },
})