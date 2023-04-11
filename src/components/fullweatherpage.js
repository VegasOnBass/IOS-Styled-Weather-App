import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux'

import Background from './background';
import Hourly from './hourly';
import DayTemps from './dayTemps';
import CityViewFooter from './cityViewFooter';
import { isDaytimeHook } from '../hooks/isDaytimeHook'

export default function FullWeather({ weatherData, children }) {
  const temp = useSelector((state) => state.editFunctions.temp)


  const {
    current: {
      temp_f,
      temp_c,
      condition: { text },
    },
    location: {
      name,
      localtime
    },
    forecast: {
      forecastday: [{
        day: { 
          maxtemp_f, 
          mintemp_f,
          maxtemp_c,
          mintemp_c
         },
        astro: { sunrise, sunset }
      }]
    }

  } = weatherData
  

  const currentTime = new Date(localtime.replace(/-/g, '\/')).toLocaleTimeString().replace(/:\d+ /, ' ')
  const { isDaytime } = isDaytimeHook({ currentTime, sunrise, sunset })
  return (
    <Background isDaytime={isDaytime}>
      <StatusBar barStyle="light-content" />
      {children}

      <View style={[styles.container, styles.center]} >
        <StatusBar style="auto" />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ marginBottom: 30, alignItems: 'center' }} >
            <Text style={styles.cityName}>{name}</Text>
            <Text style={styles.currentTemp}>{temp == 'temp_f' ? Math.round(temp_f) : Math.round(temp_c)}°</Text>
            <Text style={{ color: 'white' }}>{text}</Text>
            <Text style={{ color: 'white' }}>H:{temp == 'temp_f' ? Math.round(maxtemp_f) : Math.round(maxtemp_c)}° L:{temp == 'temp_f' ? Math.round(mintemp_f) : Math.round(mintemp_c)}°</Text>
          </View>
          <View style={styles.center} >

            <Hourly {...weatherData} />
            <DayTemps {...weatherData} />
          </View>
        </ScrollView>
        <CityViewFooter />
      </View>
    </Background>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacingBottom: {
    marginBottom: 10
  },
  cityName: {
    fontSize: 30,
    color: 'white'
  },
  currentTemp: {
    fontSize: 100,
    color: 'white'
  }
});