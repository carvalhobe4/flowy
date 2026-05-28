import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface FormIdentificacaoProps {
  aluno: string;
  setAluno: (nome: string) => void;
  aoIniciar: () => void;
}

export default function FormIdentificacao({ aluno, setAluno, aoIniciar }: FormIdentificacaoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Identificação</Text>
      <Text style={styles.subtitulo}>Confirme seu nome antes de iniciar a sessão de treinos:</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Aluno"
        value={aluno}
        onChangeText={setAluno}
      />

      <TouchableOpacity style={styles.botao} onPress={aoIniciar}>
        <Text style={styles.textoBotao}>CONFIRMAR E INICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFD',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#2A2A38',
    letterSpacing: 0.5,
  },
  subtitulo: {
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#7E7E8A',
    marginBottom: 25,
    lineHeight: 22,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.2)',
    marginBottom: 25,
    fontSize: 16,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#2A2A38',
  },
  botao: {
    backgroundColor: '#836FFF',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#836FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
    letterSpacing: 1,
  },
});