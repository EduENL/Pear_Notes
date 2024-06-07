import { View, Text, Button } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { firebase } from '../../../config';

const NoteAdd = () => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');

  const addNota = async () => {
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
    <View>
      <TextInput
        placeholder='Título'
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        placeholder='Comece a escrever...'
        value={nota}
        onChangeText={(text) => setNota(text)}
      />
      <Button title="Adicionar Nota" onPress={addNota} />
    </View>
  );
};

export default NoteAdd;