import React from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Exercicio {
  id: string;
  nome: string;
  img: string;
  descricao: string;
}

interface ModalTutorialProps {
  visivel: boolean;
  exercicio: Exercicio | null;
  aoFechar: () => void;
}

export default function ModalTutorial({ visivel, exercicio, aoFechar }: ModalTutorialProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
      onRequestClose={aoFechar}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalConteudo}>
          {exercicio && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: exercicio.img }} style={styles.imagemAmpliada} />
              <Text style={styles.modalTitulo}>{exercicio.nome}</Text>
              
              <View style={styles.tutorialBox}>
                <Text style={styles.tutorialLabel}>Instruções de Execução:</Text>
                <Text style={styles.modalDescricao}>{exercicio.descricao}</Text>
              </View>

              <TouchableOpacity style={styles.botaoFechar} onPress={aoFechar}>
                <Text style={styles.textoBotaoFechar}>Voltar ao Treino</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(42, 42, 56, 0.3)',
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '80%',
  },
  imagemAmpliada: {
    width: '100%',
    height: 350, // Ajustado para 350 para melhor proporção em telas mobile
    borderRadius: 20,
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 22,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#2A2A38',
    marginBottom: 15,
  },
  tutorialBox: {
    backgroundColor: 'rgba(131, 111, 255, 0.04)',
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#836FFF',
    marginBottom: 25,
  },
  tutorialLabel: {
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
    color: '#836FFF',
    fontSize: 14,
    marginBottom: 6,
  },
  modalDescricao: {
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#5C5C6A',
    lineHeight: 24,
  },
  botaoFechar: {
    backgroundColor: 'rgba(131, 111, 255, 0.08)',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotaoFechar: {
    color: '#836FFF',
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
  },
});