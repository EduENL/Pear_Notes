import { View, Text, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../../config";

const Home = () => {
  const navigation = useNavigation();
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('notas')
      .onSnapshot((querySnapshot) => {
        const newNotas = [];
        querySnapshot.forEach((doc) => {
          const { nota, titulo } = doc.data();
          newNotas.push({ nota, titulo, id: doc.id });
        });
        setNotas(newNotas);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listContainer}>
          {notas.map((item) => (
            <View key={item.id} style={styles.notaView}>
              <Pressable onPress={() => navigation.navigate('Detalhe', { item })}>
                <Text style={styles.notaTitulo}>{item.titulo}</Text>
                <Text style={styles.notaNota}>
                  {item.nota.length > 25 ? `${item.nota.substring(0, 25)}...` : item.nota}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar nota" onPress={() => navigation.navigate('NoteAdd')} color="#59B200" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBD1',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  notaView: {
    backgroundColor: '#59B200',
    width: '40%', // Ajuste para caber duas colunas
    height: 150,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  notaTitulo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  notaNota: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#FDFBD1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
