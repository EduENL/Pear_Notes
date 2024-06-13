import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { QuerySnapshot } from 'firebase/firestore';
import { firebase } from "../../../config"
import { FlashList } from '@shopify/flash-list';

const Home = () => {

    const navigation = useNavigation();

    const [notas, setNotas] = useState([]);

    useEffect(() => {
        firebase.firestore()
        .collection('notas')
        .onSnapshot((QuerySnapshot) => {
            const newNotas = [];
            QuerySnapshot.forEach((doc) => {
                const {nota, titulo} = doc.data();
                newNotas.push({nota, titulo, id: doc.id});
            })
            setNotas(newNotas);
        })
    })
  return (
    <View style={styles.container}>
      <FlashList
        data={notas}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({item}) => (
            <View style= {styles.notaView}>
                <Pressable
                onPress={() => navigation.navigate('Detalhe', {item})}>
                    <Text style= {styles.notaTitulo}>
                        {item.titulo}
                    </Text>
                    <Text style= {styles.notaNota}>
                        {item.nota.length > 25 ? `${item.nota.substring(0, 25)}...` : item.nota}
                    </Text>
                </Pressable>
            </View>
        )} 
      />
      <Button title="Adicionar nota" onPress={ () => navigation.navigate('NoteAdd')} color="#59B200"></Button>
    </View>
  )
}


export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FDFBD1'
        // width: '65%'
    },

    notaView: {
        backgroundColor: '#59B200',
        width: '75%', // largura fixa
        height: 150, // altura fixa
        margin: 20,
        borderRadius: 10,
        paddingBottom: 80,
        fontWeight: 'bold',
        
    },

    notaTitulo: {
        fontSize: 20,
        padding: 5,
        fontWeight: '500'
    },

    notaNota: {
        padding: 5,
    },

})