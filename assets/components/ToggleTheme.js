import React from 'react'; 
import { Button } from 'react-native';

// Define o componente ToggleTheme
const ToggleTheme = ({ route }) => { 
  const { isDarkMode, toggleTheme } = route.params; // Obtém os parâmetros da rota

  return ( 
    // Botão que altera entre modo claro e modo escuro
    <Button 
      title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'} // Título do botão muda conforme o modo
      onPress={toggleTheme} // Função de alternância de tema
    /> 
  ); 
};

export default ToggleTheme; 
