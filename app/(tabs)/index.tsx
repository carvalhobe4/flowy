import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CardExercicio from '@/components/CardExercicio';
import FormIdentificacao from '@/components/FormIdentificacao';
import ModalTutorial from '@/components/ModalTutorial';
import HomeLandingPage from '@/components/HomeLandingPage';
import TelaFranquia from '@/components/TelaFranquia';

interface Exercicio {
  id: string;
  nome: string;
  img: string;
  descricao: string;
}

export default function TelaTreino() {
  // --- ESTADOS DO COMPONENTE ---
  const [aluno, setAluno] = useState('');
  const [treinoIniciado, setTreinoIniciado] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [exerciciosFeitos, setExerciciosFeitos] = useState<string[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState<Exercicio | null>(null);
  
  // Controles de Navegação de Telas
  const [exibirLandingPage, setExibirLandingPage] = useState(true);
  const [exibirFranquia, setExibirFranquia] = useState(false);

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

  // --- EFEITOS (HOOKS) ---
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

  // --- FUNÇÕES DE AJUDA E EVENTOS ---
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

  const encerrarSessaoTreino = () => {
    setTreinoIniciado(false);
    setSegundos(0);
    setExerciciosFeitos([]);
    setAluno(''); 
    setExibirLandingPage(true);
  };

  // --- ARQUITETURA DE RENDERIZAÇÃO CONDICIONAL CORRIGIDA ---

  // 1ª PRIORIDADE ABSOLUTA: Se a tela de franquia deve aparecer, ela renderiza e bloqueia o resto
  if (exibirFranquia) {
    return (
      <TelaFranquia 
        aoVoltar={() => {
          setExibirFranquia(false);    // Desliga a tela de franquia
          setExibirLandingPage(true);  // Força e garante o retorno para a Landing Page
        }} 
      />
    );
  }

  // 2ª PRIORIDADE: Se a Landing Page estiver ativa, renderiza ela
  if (exibirLandingPage) {
    return (
      <HomeLandingPage 
        aoIniciarTreino={() => setExibirLandingPage(false)} 
        aoClicarFranquia={() => {
          setExibirLandingPage(false); // Esconde a Landing Page temporariamente
          setExibirFranquia(true);     // Ativa a tela de Franquia
        }}
      />
    );
  }

  // 3ª PRIORIDADE: Fluxo de identificação do treino
  if (!treinoIniciado) {
    return (
      <FormIdentificacao 
        aluno={aluno} 
        setAluno={setAluno} 
        aoIniciar={lidarComBotaoIniciar} 
      />
    );
  }

  // 4ª PRIORIDADE: Ficha de Treino em Andamento
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
            <TouchableOpacity style={{ flex: 1 }} onPress={() => abrirTutorial(item)}>
              <CardExercicio nome={item.nome} imagem={item.img} />
            </TouchableOpacity>

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
        style={[styles.botao, styles.botaoParar]} 
        onPress={encerrarSessaoTreino}
      >
        <Text style={[styles.textoBotao, { color: '#836FFF' }]}>
          ENCERRAR TREINO
        </Text>
      </TouchableOpacity>

      <ModalTutorial 
        visivel={modalVisivel} 
        exercicio={exercicioSelecionado} 
        aoFechar={() => setModalVisivel(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFD', paddingHorizontal: 24, paddingTop: 60 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titulo: { fontSize: 28, fontFamily: 'sans-serif-light', fontWeight: '300', color: '#2A2A38', letterSpacing: 0.5 },
  alunoTexto: { fontSize: 14, fontFamily: 'sans-serif-light', fontWeight: '400', color: '#836FFF', marginTop: 2 },
  cronometroBox: { backgroundColor: 'rgba(131, 111, 255, 0.12)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  cronometroTexto: { color: '#836FFF', fontWeight: '500', fontSize: 14 },
  statusBox: { backgroundColor: 'rgba(131, 111, 255, 0.06)', padding: 14, borderRadius: 14, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.15)', alignItems: 'center' },
  statusTexto: { color: '#6C5DD3', fontWeight: '400', fontFamily: 'sans-serif-light', fontSize: 14 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  checkbox: { width: 28, height: 28, borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.4)', borderRadius: 9, marginLeft: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', marginBottom: 10 },
  checkboxMarcado: { backgroundColor: '#836FFF', borderColor: '#836FFF' },
  checkMark: { color: '#FFF', fontWeight: '300', fontSize: 14 },
  botao: { backgroundColor: '#836FFF', height: 54, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginVertical: 15, shadowColor: '#836FFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 2 },
  botaoParar: { backgroundColor: '#ECEAFB', borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.3)', shadowOpacity: 0, elevation: 0 },
  textoBotao: { color: '#FFF', fontSize: 16, fontWeight: '400', fontFamily: 'sans-serif-light', letterSpacing: 1 },
});