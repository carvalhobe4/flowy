import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  nome: string;
  imagem: string;
}

export default function CardExercicio({ nome, imagem }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.foto} />
      <View style={styles.textoContainer}>
        <Text style={styles.texto}>{nome}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: width * 0.035, // Preenchimento responsivo
    marginBottom: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  textoContainer: {
    flex: 1, // Faz o container ocupar o espaço restante sem estourar a tela
  },
  texto: {
    fontSize: width * 0.042, // Fonte escalonada
    fontWeight: 'bold',
    color: '#333',
  },
});