import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CardExercicio from '@/components/CardExercicio';

export default function TelaTreino() {
  const [aluno, setAluno] = useState('');

  // Lista de exercícios (Dados)
  const listaDeExercicios = [
    { id: '1', nome: '1. Postura da Criança (Balasana)', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR73x6bhHOqX9SmA0ZLA85-i7SSlaW1x9lhQ&s' },
    { id: '2', nome: '2. Cachorro Olhando para Baixo (Adho Mukha Svanasana)', img: 'https://relajemos.com/wp-content/uploads/2016/10/pose-adho-mukha-2018.jpg' },
    { id: '3', nome: '3. Postura do Guerreiro II (Virabhadrasana II)', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP3mLXLLOXH_wjarC2QcCSNeFSTN8vZKK_UQ&s' },
    { id: '4', nome: '4. Postura da Cobra (Bhujangasana)', img: 'https://images.timesnownews.com/thumb/msid-102827261,thumbsize-34776,width-400,height-225,resizemode-75/102827261.jpg' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ficha de Treino</Text>

      {/* Campo para nome do aluno */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      {/* Lista de exercícios */}
      <FlatList
        data={listaDeExercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardExercicio nome={item.nome} imagem={item.img} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Botão de iniciar */}
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => console.log('Iniciou o treino de ' + aluno)}
      >
        <Text style={styles.textoBotao}>INICIAR TREINO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#121212',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 25,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});