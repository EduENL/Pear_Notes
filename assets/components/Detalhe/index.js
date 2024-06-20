// Importações necessárias
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config';
import { useTheme } from 'styled-components/native';

// Componente Detalhe
const Detalhe = ({ route }) => {
  // Hooks
  const navigation = useNavigation(); // Usado para navegação entre telas
  const [TextoNota, setTextoNota] = useState(route.params.item.nota); // Estado para o texto da nota
  const [TituloNota, setTituloNota] = useState(route.params.item.titulo); // Estado para o título da nota
  const theme = useTheme(); // Objeto de tema

  // Função para atualizar a nota no Firestore
  const handleUpdate = () => {
    if (TituloNota && TituloNota.length > 0) {
      firebase
        .firestore()
        .collection('notas')
        .doc(route.params.item.id) // ID da nota a ser atualizada
        .update({
          titulo: TituloNota,
          nota: TextoNota,
        })
        .then(() => {
          navigation.navigate('Home'); // Navegando para a tela Home após a atualização
        })
        .catch((error) => {
          alert(error); // Exibindo um alerta em caso de erro
        });
    }
  };

  // Função para excluir a nota do Firestore
  const handleDelete = () => {
    firebase
      .firestore()
      .collection('notas')
      .doc(route.params.item.id) // ID da nota a ser excluída
      .delete()
      .then(() => {
        navigation.navigate('Home'); // Navegando para a tela Home após a exclusão
      })
      .catch((error) => {
        alert(error); // Exibindo um alerta em caso de erro
      });
  };

  return (
    <View style={styles(theme).container}>
      {/* ScrollView para permitir rolagem do conteúdo */}
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
          multiline={true} // Permitindo múltiplas linhas
        />
      </ScrollView>
      {/* Container para os botões */}
      <View style={containerStyles.buttonContainer}>
        {/* Botão para atualizar a nota */}
        <Button
          style={styles(theme).buttonT}
          title="Atualizar Nota"
          onPress={handleUpdate}
          color={theme.isDarkMode ? '#59B200' : theme.detButtonColor} // Cor do botão baseada no modo escuro ou claro
        />
        {/* Espaçamento entre os botões */}
        <View style={containerStyles.spacer} />
        {/* Botão para excluir a nota */}
        <Button
          style={styles(theme).buttonT}
          title="Excluir Nota"
          onPress={handleDelete}
          color="#B20000" // Cor fixa para o botão de exclusão
        />
      </View>
    </View>
  );
};

export default Detalhe;

// ______________________________________________________
// Estilos relacionados ao tema

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.detBackground, // Cor de fundo baseada no tema
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 10,
    },
    inputTitulo: {
      padding: 20,
      fontWeight: '500',
      color: theme.detColor, // Cor do texto baseada no tema
      fontSize: 28,
    },
    inputNota: {
      height: '75%',
      padding: 15,
      fontWeight: '400',
      fontSize: 20,
      color: theme.detColor, // Cor do texto baseada no tema
      marginBottom: 20,
    },
    buttonT: {
      marginTop: 5,
    },
  });

// Estilos não relacionados ao tema
const containerStyles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  spacer: {
    height: 20, // Espaçamento entre os botões
  },
});