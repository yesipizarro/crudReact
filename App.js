
import React,{useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

import {DefaultTheme, Provider as PaperProvider} from  'react-native-paper';


const App = () => {




  const Stack = createNativeStackNavigator();


  // defino un tema

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1774F2',
      accent: '#0655BF'
    }
  }

  return (
    <>
    <PaperProvider>
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          // para cambiar la apariencia pero para el "container"
          screenOptions= {{
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTitleAlign: 'center',
            headerTintColor:theme.colors.surface,
            headerTitleStyle: {
              fontWeight:'bold'
            }
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={ ({navigation, route}) => ({
              //headerLeft: (props) => <BarraSuperior {...props}
                                   //navigation={navigation}
                                   //route={route}
                                 
                                    // />
            })}
          />

          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title:'Nuevo Cliente'
              
            }}
            
          />

          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{
              title:'Detalles Cliente'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </>
  )
};

const styles = StyleSheet.create({

});

export default App;
