import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import React from 'react'; 
import { useTheme } from 'styled-components/native'; 
import { Ionicons } from '@expo/vector-icons';

// Define o componente Header
const Header = ({ name, toggleTheme, isDarkMode }) => { 
  const theme = useTheme(); // Obtém o tema atual usando o hook useTheme do styled-components

  return ( 
    <View style={styles(theme).container}> 
      {/* Exibe a prop name como o título do header */}
      <Text style={styles(theme).title}>{name}</Text> 
      {/* TouchableOpacity para o botão de alternância de tema */}
      <TouchableOpacity 
        style={styles(theme).iconContainer} 
        onPress={toggleTheme}>
        {/* O ícone muda com base na prop isDarkMode */}
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} // Ícone muda entre sol e lua
          size={24} // Define o tamanho do ícone
          color={theme.headIconColor} // Cor do ícone baseada no tema
        /> 
      </TouchableOpacity> 
    </View> 
  ); 
};

// __________________________________________________________
// Define os estilos do componente com base no tema

const styles = (theme) => 
  StyleSheet.create({ 
    container: { 
      backgroundColor: theme.headBackground, // Cor de fundo baseada no tema
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingHorizontal: 16, 
    }, 
    title: { 
      fontSize: 24, 
      fontWeight: '500', 
      color: theme.headColor || theme.appColor, // Cor do título baseada no tema
      textAlign: 'center', 
    }, 
    iconContainer: { 
      marginLeft: 'auto', 
      paddingLeft: 20, 
    }, 
  }); 

export default Header; 
