import React from 'react';
import { Animated, StyleSheet, Text, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux'
import { deleteLocation } from '../redux/savedLocations'



export default function SwipeToDelete({ children, locationName }) {
    const dispatch = useDispatch()

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        })

        return (
            <Animated.View style={{ height: 110, transform: [{ translateX: trans }] }}>
                <RectButton style={styles.rightAction} onPress={() => dispatch(deleteLocation(locationName))}>
                    <Text>X</Text>
                </RectButton>
            </Animated.View >
        )
    };



    return (
        <Swipeable
            friction={1}
            renderRightActions={renderRightActions}
            rightThreshold={-5}
            >
            {children}

        </Swipeable>
    );

}

const styles = StyleSheet.create({
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        flexGrow: 4,
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
        width: 75,
        height: 'auto'

    }
});