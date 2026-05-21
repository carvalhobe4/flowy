import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import CardExercicio from '@/components/CardExercicio';

// Definindo o tipo dos dados para o TypeScript
interface Exercicio {
  id: string;
  nome: string;
  img: string;
  descricao: string;
}

export default function TelaTreino() {
  const [aluno, setAluno] = useState('');
  const [treinoIniciado, setTreinoIniciado] = useState(false);
  
  // Estados para o Cronômetro e Progresso
  const [segundos, setSegundos] = useState(0);
  const [exerciciosFeitos, setExerciciosFeitos] = useState<string[]>([]);

  // Estados para a expansão/detalhes do exercício
  const [modalVisivel, setModalVisivel] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState<Exercicio | null>(null);

  // Lista de exercícios com os tutoriais escritos (descrição)
  const listaDeExercicios: Exercicio[] = [
    { 
      id: '1', 
      nome: '1. Postura da Criança (Balasana)', 
      img: 'https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2021/03/09/yoga-practice-childs-pose-by-20210309092751.jpg',
      descricao: 'Ajoelhe-se no chão, sente-se sobre os calcanhares e incline o tronco para a frente, levando a testa ao tapete. Alongue os braços para a frente e respire profundamente.'
    },
    { 
      id: '2', 
      nome: '2. Cachorro Olhando para Baixo (Adho Mukha Svanasana)', 
      img: 'https://relajemos.com/wp-content/uploads/2016/10/pose-adho-mukha-2018.jpg',
      descricao: 'Comece em quatro apoios, eleve o quadril em direção ao teto formando um "V" invertido com o corpo. Empurre o chão com as mãos e tente alongar as pernas.'
    },
    { 
      id: '3', 
      nome: '3. Postura do Guerreiro II (Virabhadrasana II)', 
      img: 'https://zenwellness.com.br/blog/wp-content/uploads/2022/06/postura-do-guerreiro-1.jpeg',
      descricao: 'Afaste bem as pernas, gire o pé direito para fora e flexione o joelho direito a 90 graus. Abra os braços na linha dos ombros e olhe para a mão direita.'
    },
    { 
      id: '4', 
      nome: '4. Postura da Cobra (Bhujangasana)', 
      img: 'https://www.espacokaizen.com.br/wp-content/uploads/2025/03/yoga-posicao-cobra.jpg',
      descricao: 'Deite-se de bruços, apoie as mãos no chão ao lado do peito e empurre o chão estendendo os braços suavemente, elevando o peito enquanto mantém o quadril firme abaixo.'
    },
  ];

  // Lógica do cronômetro automático
  useEffect(() => {
    let intervalo: any;
    if (treinoIniciado) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    } else {
      setSegundos(0);
    }
    return () => clearInterval(intervalo);
  }, [treinoIniciado]);

  const formatarTempo = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60);
    const seg = totalSegundos % 60;
    return `${minutos < 10 ? '0' : ''}${minutos}:${seg < 10 ? '0' : ''}${seg}`;
  };

  const alternarExercicioFeito = (id: string) => {
    if (exerciciosFeitos.includes(id)) {
      setExerciciosFeitos(exerciciosFeitos.filter(item => item !== id));
    } else {
      setExerciciosFeitos([...exerciciosFeitos, id]);
    }
  };

  const lidarComBotaoIniciar = () => {
    if (!aluno.trim()) {
      alert('Por favor, digite o nome do aluno para prosseguir.');
      return;
    }
    setTreinoIniciado(true);
  };

  const abrirTutorial = (exercicio: Exercicio) => {
    setExercicioSelecionado(exercicio);
    setModalVisivel(true);
  };

  // --- TELA 1: ENTRADA E CONFIRMAÇÃO DO NOME ---
  if (!treinoIniciado) {
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

        <TouchableOpacity style={styles.botao} onPress={lidarComBotaoIniciar}>
          <Text style={styles.textoBotao}>CONFIRMAR E INICIAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- TELA 2: FICHA DE TREINO ATIVA (RODA DEPOIS DE CONFIRMAR) ---
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.titulo}>Treino Ativo</Text>
          <Text style={styles.alunoTexto}>Aluno: {aluno}</Text>
        </View>
        <View style={styles.cronometroBox}>
          <Text style={styles.cronometroTexto}>⏱️ {formatarTempo(segundos)}</Text>
        </View>
      </View>

      {/* Caixa do progresso de checagem */}
      <View style={styles.statusBox}>
        <Text style={styles.statusTexto}>
          Progresso: {exerciciosFeitos.length}/{listaDeExercicios.length} concluídos
        </Text>
      </View>

      <FlatList
        data={listaDeExercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* O Card do exercício agora reage ao toque abrindo o tutorial */}
            <TouchableOpacity style={{ flex: 1 }} onPress={() => abrirTutorial(item)}>
              <CardExercicio nome={item.nome} imagem={item.img} />
            </TouchableOpacity>

            {/* Quadrinho de Checagem Lateral */}
            <TouchableOpacity 
              style={[styles.checkbox, exerciciosFeitos.includes(item.id) && styles.checkboxMarcado]} 
              onPress={() => alternarExercicioFeito(item.id)}
            >
              {exerciciosFeitos.includes(item.id) && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

<TouchableOpacity 
  style={[styles.botao, treinoIniciado ? styles.botaoParar : null]} 
  onPress={() => setTreinoIniciado(false)}
>
  <Text style={[styles.textoBotao, treinoIniciado && { color: '#836FFF' }]}>
    ENCERRAR TREINO
  </Text>
</TouchableOpacity>

      {/* JANELA EXPANSIBILIZADA DO TUTORIAL (MODAL) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            {exercicioSelecionado && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: exercicioSelecionado.img }} style={styles.imagemAmpliada} />
                <Text style={styles.modalTitulo}>{exercicioSelecionado.nome}</Text>
                
                <View style={styles.tutorialBox}>
                  <Text style={styles.tutorialLabel}>Instruções de Execução:</Text>
                  <Text style={styles.modalDescricao}>{exercicioSelecionado.descricao}</Text>
                </View>

                <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisivel(false)}>
                  <Text style={styles.textoBotaoFechar}>Voltar ao Treino</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFD', // Um fundo limpo, levemente azulado/calmo
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  subtitulo: {
    fontSize: 15,
    fontFamily: 'sans-serif-light', // Fonte mais fina no Android
    fontWeight: '300',             // Fonte fininha e limpa no iOS
    color: '#7E7E8A',
    marginBottom: 25,
    lineHeight: 22,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontFamily: 'sans-serif-light',
    fontWeight: '300', // Título bem clean e fino, sem aquela força bruta do 'bold'
    color: '#2A2A38',
    letterSpacing: 0.5,
  },
  alunoTexto: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    fontWeight: '400',
    color: '#836FFF', // Nome do aluno ganha o tom roxo em destaque suave
    marginTop: 2,
  },
  cronometroBox: {
    backgroundColor: 'rgba(131, 111, 255, 0.12)', // Roxo 836FFF bem transparente e fluido
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20, // Cantos bem arredondados e modernos
  },
  cronometroTexto: {
    color: '#836FFF', // Texto no roxo principal
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Branco semi-transparente
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.2)', // Borda sutil usando o seu roxo
    marginBottom: 25,
    fontSize: 16,
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    color: '#2A2A38',
  },
  statusBox: {
    backgroundColor: 'rgba(131, 111, 255, 0.06)', // Um fundo quase invisível, bem calmo
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.15)',
    alignItems: 'center',
  },
  statusTexto: {
    color: '#6C5DD3', // Um roxo sutilmente mais escuro para leitura ideal
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Dá um respiro sutil entre as linhas
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.4)',
    borderRadius: 9,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 10,
  },
  checkboxMarcado: {
    backgroundColor: '#836FFF', // Preenchimento com seu roxo quando ativo
    borderColor: '#836FFF',
  },
  checkMark: {
    color: '#FFF',
    fontWeight: '300',
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#836FFF', // Botão principal com a sua cor roxa desejada
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    // Sombra bem sutil e espalhada para parecer flutuante
    shadowColor: '#836FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  botaoParar: {
    backgroundColor: '#ECEAFB', // Botão de parar não é mais vermelho agressivo, é um roxo bem clarinho zen
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
    letterSpacing: 1,
  },
  // Mudança sutil no texto do botão de parar (já que o fundo agora é claro)
  botaoPararTexto: {
    color: '#836FFF', 
  },
  // Estilização do Painel de Tutorial Expandido (Modal Transparente e Fluido)
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(42, 42, 56, 0.3)', // Escurecimento de fundo bem suave, puxado para o roxo escuro
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32, // Curvas mais acentuadas e amigáveis
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '80%',
  },
  imagemAmpliada: {
    width: '100%',
    height: 700,
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
    backgroundColor: 'rgba(131, 111, 255, 0.04)', // Caixa de texto muito limpa
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#836FFF', // Detalhe lateral na sua cor roxa
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