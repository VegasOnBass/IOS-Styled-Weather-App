import { useState, useEffect } from 'react';


export function isDaytimeHook({ currentTime, sunrise, sunset }) {
    const [isDaytime, setIsDaytime] = useState(false)

    const currentTimeObj = new Date(`01/01/2021 ${currentTime}`)
    const sunriseObj = new Date(`01/01/2021 ${sunrise}`)
    const sunsetObj = new Date(`01/01/2021 ${sunset}`)

    useEffect(() => {
        if (currentTimeObj.getTime() > sunriseObj.getTime() && currentTimeObj.getTime() < sunsetObj.getTime()) {
            setIsDaytime(true)
        } else {
            setIsDaytime(false)
        }
    }, [currentTime, sunrise, sunset, isDaytime, setIsDaytime])

    return { isDaytime }

}