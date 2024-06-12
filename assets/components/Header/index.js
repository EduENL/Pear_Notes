import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={styles.header}>
       <Text style={styles.headerText}>{props.name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#59B200', 
    textAlign: 'center',
    height: '70%',
    width: '115%',
    paddingRight: '20',
  }

});
