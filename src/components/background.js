import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import WeatherEffects from "./weatherEffects";



export default function Background({ children, isDaytime, style }) {
    const [gradientStart, setGradientStart] = useState(null)
    const [gradientEnd, setGradientEnd] = useState(null)


    useEffect(() => {
        if (isDaytime) {
            setGradientStart('#3a76ad')
            setGradientEnd('#75abe4')
        } else {
            setGradientStart('#14142c')
            setGradientEnd('#31436a')
        }
    }, [isDaytime])


    return (
        <LinearGradient
            colors={[`${gradientStart}`, `${gradientEnd}`]}
            style={[style, { flex: 1 }]}
        >
                {children}
        </LinearGradient >

    )
}