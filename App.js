import { StatusBar } from 'react-native' 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import Main from './Main'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <StatusBar barStyle="light-content" />
        <Main />
      </PersistGate>
    </Provider>
  )
}
