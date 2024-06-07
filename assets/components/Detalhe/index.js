import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../../config' 
import react from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'

const Detalhe = ({route}) => {
    const navigation = useNavigation();
    const [TextoNota, setTextoNota] = useState(route.params.item.nota);
    const [TituloNota, setTituloNota] = useState(route.params.item.titulo);

    const handleUpdate = () => {
        if (TituloNota && TituloNota.length > 0){
            firebase.firestore()
            .collection('notas')
            .doc(route.params.item.id)
            .update({
                titulo: TituloNota,
                nota: TextoNota,
            })
            .then (() => {
                navigation.navigate('Home')
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

  return (
    <View>
      <TextInput
        placeholder='Titulo'
        value={TituloNota}
        onChangeText={(text) => setTituloNota(text)}
        style={styles.inputTitulo}
      >
      </TextInput>
      <TextInput
        placeholder='Nota'
        value={TextoNota}
        onChangeText={(text) => setTextoNota(text)}
        style={styles.inputNota}
        multiline={true}
      >
      </TextInput>
      <Button title="Atualizar Nota" onPress={handleUpdate} />
    </View>
  )
}

export default Detalhe

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FDFBD1',
    }
})
