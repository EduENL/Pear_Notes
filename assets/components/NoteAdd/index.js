import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native'; 
import React, { useState } from 'react'; 
import { firebase } from '../../../config'; 
import { useNavigation } from '@react-navigation/native'; 
import { useTheme } from 'styled-components/native';

// Define o componente NoteAdd
const NoteAdd = () => { 
  const navigation = useNavigation(); // Hook para navegação
  const [TituloNota, setTituloNota] = useState(''); // Estado para o título da nota
  const [TextoNota, setTextoNota] = useState(''); // Estado para o texto da nota
  const theme = useTheme(); // Obtém o tema atual usando o hook useTheme do styled-components

  // Função para salvar a nota
  const handleSave = () => { 
    if (TituloNota && TituloNota.length > 0) { // Verifica se o título da nota não está vazio
      firebase 
        .firestore() 
        .collection('notas') // Acessa a coleção 'notas' no Firestore
        .add({ 
          titulo: TituloNota, // Adiciona o título da nota
          nota: TextoNota, // Adiciona o texto da nota
        }) 
        .then(() => { 
          navigation.navigate('Home'); // Navega para a tela inicial após salvar
        }) 
        .catch((error) => { 
          alert(error); // Mostra um alerta em caso de erro
        }); 
    } 
  };

  return ( 
    <View style={styles(theme).container}> 
      <ScrollView contentContainerStyle={styles(theme).scrollContainer}> 
        {/* Campo de entrada para o título da nota */}
        <TextInput 
          style={styles(theme).inputTitulo} 
          placeholder="Titulo" 
          value={TituloNota} 
          onChangeText={(text) => setTituloNota(text)} 
        /> 
        {/* Campo de entrada para o texto da nota */}
        <TextInput 
          placeholder="Nota" 
          value={TextoNota} 
          onChangeText={(text) => setTextoNota(text)} 
          style={styles(theme).inputNota} 
          multiline={true} // Permite múltiplas linhas
        /> 
      </ScrollView> 
      <View style={styles(theme).buttonContainer}> 
        {/* Botão para salvar a nota */}
        <Button title="Salvar Nota" onPress={handleSave} color={theme.noteaddColor} /> 
      </View> 
    </View> 
  ); 
};

export default NoteAdd; 

// ______________________________________________________
// Define os estilos do componente com base no tema

const styles = (theme) => 
  StyleSheet.create({ 
    container: { 
      flex: 1, // Ocupa todo o espaço disponível
      backgroundColor: theme.noteadBackground, // Cor de fundo baseada no tema
    }, 
    scrollContainer: { 
      flexGrow: 1, // Permite que o ScrollView cresça conforme necessário
      padding: 10, 
    }, 
    inputTitulo: { 
      padding: 20, 
      fontWeight: '500', 
      color: theme.noteaddColor, // Cor do texto baseada no tema
      fontSize: 28, 
    }, 
    inputNota: { 
      height: '75%', // Altura do campo de entrada
      padding: 15, 
      fontWeight: '400', 
      fontSize: 20, 
      color: theme.noteaddColor, // Cor do texto baseada no tema
      marginBottom: 20, 
    }, 
    buttonContainer: { 
      padding: 10, 
      backgroundColor: theme.noteadBackground, // Cor de fundo baseada no tema
    }, 
  });
