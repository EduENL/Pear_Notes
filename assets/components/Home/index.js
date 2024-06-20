import React, { useEffect, useState } from 'react';
import { View, Pressable, Button, Text } from 'react-native'; // Importando Text
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../../config";
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'styled-components/native';
import styled from 'styled-components/native';

// Componente Home
const Home = () => {
  // Hooks
  const navigation = useNavigation();
  const [notas, setNotas] = useState([]);
  const theme = useTheme();

  // Efeito para obter as notas do Firestore
  useEffect(() => {
    firebase.firestore()
      .collection('notas')
      .onSnapshot((QuerySnapshot) => {
        const newNotas = [];
        QuerySnapshot.forEach((doc) => {
          const { nota, titulo } = doc.data();
          newNotas.push({ nota, titulo, id: doc.id });
        })
        setNotas(newNotas);
      })
  }, [])

  // Componente estilizado com styled-components para o texto da nota
  const NotaText = styled.Text`
    padding: 5px;
    color: ${theme.isDarkMode ? 'white' : theme.notaTextColor};
  `;

  return (
    <View style={styles(theme).container}>

      {/* Lista de notas */}
      <FlashList
        data={notas}
        numColumns={2} // Exibindo duas colunas
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View style={styles(theme).notaView}>
            <Pressable
              onPress={() => navigation.navigate('Detalhe', { item })}>
              <Text style={styles(theme).notaTitulo}>
                {item.titulo}
              </Text>
              <NotaText>

                {/* Exibindo texto completo da nota ou truncado com "..." se for muito longo */}
                {item.nota.length > 25 ? `${item.nota.substring(0, 25)}...` : item.nota}
              </NotaText>
            </Pressable>
          </View>
        )}
      />

      {/* Botão para adicionar nova nota */}
      <Button title="Adicionar nota" onPress={() => navigation.navigate('NoteAdd')} color={theme.appColor}></Button>
    </View>
  )
}

export default Home

// ____________________________________________________
// Estilos para o componente

const styles = (theme) => ({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.homeBackground,
  },
  notaView: {
    backgroundColor: theme.notaView,
    width: '80%', // Ajuste para caber 2 colunas
    height: 150,
    margin: 10,
    borderRadius: 10,
    paddingBottom: 80,
    fontWeight: 'bold',
  },
  notaTitulo: {
    fontSize: 20,
    padding: 5,
    fontWeight: '500',
    color: theme.notaTitleColor,  // Ajustando a cor do título da nota
  },
});