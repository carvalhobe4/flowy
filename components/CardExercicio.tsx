import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Isso aqui é necessário no .tsx para dizer o que o componente recebe
interface Props {
  nome: string;
  imagem: string;
}

export default function CardExercicio({ nome, imagem }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.foto} />
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 3,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});