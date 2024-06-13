import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config';

const Detalhe = ({ route }) => {
  const navigation = useNavigation();
  const [TextoNota, setTextoNota] = useState(route.params.item.nota);
  const [TituloNota, setTituloNota] = useState(route.params.item.titulo);

  const handleUpdate = () => {
    if (TituloNota && TituloNota.length > 0) {
      firebase
        .firestore()
        .collection('notas')
        .doc(route.params.item.id)
        .update({
          titulo: TituloNota,
          nota: TextoNota,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleDelete = () => {
    firebase
      .firestore()
      .collection('notas')
      .doc(route.params.item.id)
      .delete()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.inputDetalhe}>
      <TextInput
        style={styles.inputTitulo}
        placeholder="Titulo"
        value={TituloNota}
        onChangeText={(text) => setTituloNota(text)}
      />
      <TextInput
        placeholder="Nota"
        value={TextoNota}
        onChangeText={(text) => setTextoNota(text)}
        style={styles.inputNota}
        multiline={true}
      />
      <Button title="Atualizar Nota" onPress={handleUpdate} color="#59B200" />
      <Button title="Excluir Nota" onPress={handleDelete} color="red" />
    </View>
  );
};

export default Detalhe;

const styles = StyleSheet.create({
  inputDetalhe: {
    flex: 1,
    backgroundColor: '#FDFBD1',
    padding: 10,
  },
  inputTitulo: {
    padding: 20,
    fontWeight: '500',
    color: '#000',
    fontSize: 28,
  },
  inputNota: {
    marginBottom: 510,
    height: 60,
    padding: 15,
    fontWeight: '400',
    fontSize: 20,
    color: '#000',
  },
});
