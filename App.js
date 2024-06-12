import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { View, Image } from 'react-native';

import Home from './assets/components/Home/index';
import NoteAdd from './assets/components/NoteAdd/index';
import Header from './assets/components/Header/index';
import Detalhe from './assets/components/Detalhe/index';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}
          options={{
            headerTitle: () => <Header name="Pear Notes"></Header>,
            headerStyle: styles.header, 
            headerTitleAlign: 'center' 
            }}>
        </Stack.Screen>
        <Stack.Screen name='NoteAdd' component={NoteAdd}
        options={{
          headerTitle: () => <Header name="Adicionar notas"></Header>,
          headerStyle: styles.header1,
          headerTitleAlign: 'center' 
          }}>
        </Stack.Screen>
        <Stack.Screen name='Detalhe' component={Detalhe}
        options={{
          headerTitle: () => <Header name="Editar notas"></Header>,
          headerStyle: styles.header2, 
          headerTitleAlign: 'center' 
          }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDFBD1',
  },
  header1: {
    backgroundColor: '#FDFBD1',
  },
  header2: {
    backgroundColor: '#FDFBD1',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#59B200',
    textAlign: 'center',
    flex: 1,
  }
});