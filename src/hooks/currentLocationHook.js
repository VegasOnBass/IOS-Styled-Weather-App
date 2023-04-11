import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateCurrentLocation } from '../redux/currentLocation'

import * as Location from 'expo-location';

export function currentLocationHook() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch()


    let currentLocation


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000
            });
            setLocation(location);
        })();
    },[currentLocation]);


    if (!location) {
        currentLocation = 'rahway'
    } else {
        currentLocation = (location.coords.latitude).toFixed(4) + ' ' + (location.coords.longitude).toFixed(4);
    }

    /* dispatch(updateCurrentLocation(currentLocation)) */

    return { currentLocation, errorMsg }

}