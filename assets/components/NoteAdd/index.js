import { View, Text, Button, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
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
      await notasRef.add({
        titulo,
        nota,
      });
      console.log('Nota adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar nota:', error);
    }
  };

  return (
    <View style={styles.textView}>
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
      <Button style={styles.buttonInput} title="Adicionar Nota" onPress={addNota} color="#59B200"/>
    </View>
  );
};

export default NoteAdd;

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    backgroundColor: '#FDFBD1',
    padding: 10,
  },

  textInput: {
    padding: 20,
    fontWeight: '500',
    color: '#000',
    fontSize: 28,
  },

  textStart: {
    marginBottom: 510,
    height: 60,
    padding: 15,
    fontWeight: '400',
    fontSize: 20,
    color: '#000',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  }

});

