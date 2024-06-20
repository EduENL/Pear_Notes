import 'react-native-gesture-handler'; 
import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { StyleSheet } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { ThemeProvider } from 'styled-components/native'; 
import themes from './assets/components/Theme'; 
import Home from './assets/components/Home/index'; 
import NoteAdd from './assets/components/NoteAdd/index'; 
import Header from './assets/components/Header/index'; 
import Detalhe from './assets/components/Detalhe/index';

// Cria o stack navigator
const Stack = createStackNavigator();

export default function App() { 
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar o modo escuro

  // Função para alternar o tema
  const toggleTheme = () => { 
    setIsDarkMode(!isDarkMode); // Alterna entre modo claro e escuro
  };

  const theme = isDarkMode ? themes.dark : themes.light; // Define o tema baseado no estado do modo escuro

  return ( 
    <NavigationContainer> 
      <ThemeProvider theme={theme}> 
        <Stack.Navigator> 
          {/* Tela Home */}
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              headerTitle: () => <Header name="Pear Notes" toggleTheme={toggleTheme} isDarkMode={isDarkMode} />, // Usa o componente Header personalizado
              headerStyle: { backgroundColor: theme.headBackground }, // Estilo do cabeçalho baseado no tema
              headerTitleAlign: 'center', // Alinha o título do cabeçalho ao centro
            }} 
          /> 
          {/* Tela NoteAdd */}
          <Stack.Screen 
            name="NoteAdd" 
            component={NoteAdd} 
            options={{ 
              headerStyle: { backgroundColor: theme.headBackground }, // Estilo do cabeçalho baseado no tema
              headerTitleAlign: 'center', // Alinha o título do cabeçalho ao centro
              headerTintColor:'#fff', // Cor do texto do cabeçalho
            }} 
          /> 
          {/* Tela Detalhe */}
          <Stack.Screen 
            name="Detalhe" 
            component={Detalhe} 
            options={{ 
              headerStyle: { backgroundColor: theme.headBackground }, // Estilo do cabeçalho baseado no tema
              headerTitleAlign: 'center', // Alinha o título do cabeçalho ao centro
              headerTintColor: '#fff', // Cor do texto do cabeçalho
            }} 
          /> 
        </Stack.Navigator> 
      </ThemeProvider> 
    </NavigationContainer> 
  ); 
}
