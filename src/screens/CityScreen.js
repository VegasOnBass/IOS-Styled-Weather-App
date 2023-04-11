import { Text, View, ActivityIndicator } from 'react-native';

import { weatherHook } from '../hooks/weatherHook';
import { currentLocationHook } from '../hooks/currentLocationHook'

import FullWeather from '../components/fullweatherpage';


export default function CityScreen({ route, children }) {

  currentLocationHook()
  const { currentLocation } = currentLocationHook()

  let location

  if (!route.params) {
    location = currentLocation
  } else {
    const { city } = route.params
    location = city
  }


  const { weatherData, error, isLoading } = weatherHook(location);


  if (isLoading || !weatherData) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>An error occured while fetching the weather data</Text>
      </View>
    );
  }



  return (
    <FullWeather weatherData={weatherData} children={children}/>
  );
}

