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
            }}>
        </Stack.Screen>
        <Stack.Screen name='NoteAdd' component={NoteAdd}
        options={{
          headerTitle: () => <Header name="Adicionar nota"></Header>
          }}>
        </Stack.Screen>
        <Stack.Screen name='Detalhe' component={Detalhe}
        options={{
          headerTitle: () => <Header name="Editar notas"></Header>
          }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDFBD1',
  }
})