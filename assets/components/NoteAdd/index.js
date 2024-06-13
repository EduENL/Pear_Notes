import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { firebase } from '../../../config';

const NoteAdd = () => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState(null);

  const addNota = async () => {
    if (!titulo || !nota) {
      setError('Por favor, preencha ambos os campos!');
      return;
    }

    try {
      const db = firebase.firestore();
      const notasRef = db.collection('notas');
      console.log('Enviando nota para o Firestore:', { titulo, nota });

      const docRef = await notasRef.add({
        titulo,
        nota,
      });

      console.log('Documento adicionado com ID:', docRef.id);

      console.log('Nota adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar nota:', error.message);
      setError('Erro ao adicionar nota. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Título'
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
        />
        <TextInput
          style={styles.textStart}
          placeholder='Comece a escrever...'
          value={nota}
          onChangeText={(text) => setNota(text)}
          multiline={true}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Nota" onPress={addNota} color="#59B200" />
      </View>
    </View>
  );
};

export default NoteAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBD1',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  textInput: {
    padding: 20,
    fontWeight: '500',
    color: '#000',
    fontSize: 28,
  },
  textStart: {
    height: '75%',
    padding: 15,
    fontWeight: '400',
    fontSize: 20,
    color: '#000',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#FDFBD1',
  },
});
