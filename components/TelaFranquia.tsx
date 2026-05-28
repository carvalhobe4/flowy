import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface TelaFranquiaProps {
  aoVoltar: () => void;
}

export default function TelaFranquia({ aoVoltar }: TelaFranquiaProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [capital, setCapital] = useState('');

  const lidarComEnvio = () => {
    if (!nome || !email || !telefone) {
      if (Platform.OS === 'web') {
        alert('Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone).');
      } else {
        Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone).');
      }
      return;
    }
    
    const mensagemSucesso = `Obrigado, ${nome}! Nossa equipe de expansão enviará a apresentação completa para o e-mail: ${email} nas próximas 24 horas.`;

    // Se estiver rodando no Navegador (Web), o Alert.alert nativo falha silenciosamente.
    // Usamos o alert clássico para garantir o funcionamento em qualquer lugar.
    if (Platform.OS === 'web') {
      alert(`Proposta Recebida! 🧘‍♀️\n\n${mensagemSucesso}`);
      aoVoltar(); // Redireciona imediatamente no ambiente web
    } else {
      Alert.alert(
        'Proposta Recebida! 🧘‍♀️',
        mensagemSucesso,
        [{ text: 'Ok', onPress: () => aoVoltar() }]
      );
      // Fallback de segurança para dispositivos móveis: força a volta caso o modal trave
      aoVoltar();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={aoVoltar} style={styles.botaoVoltar}>
          <Text style={styles.botaoVoltarTexto}>⬅ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Seja um Franqueado</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Banner de Introdução */}
        <View style={styles.heroBox}>
          <Text style={styles.heroSub}>INVISTA NO MERCADO QUE MAIS CRESCE</Text>
          <Text style={styles.heroFormTitulo}>Leve o Mindful Movement para sua cidade</Text>
          <Text style={styles.heroDesc}>
            O modelo de franquias Flowy oferece alta rentabilidade, gestão simplificada e um propósito que transforma a saúde mental e física dos seus alunos.
          </Text>
        </View>

        {/* Dados Financeiros / Diferenciais */}
        <View style={styles.secaoDados}>
          <Text style={styles.tituloSecao}>O Modelo de Negócio</Text>
          
          <View style={styles.gridDados}>
            <View style={styles.cardDado}>
              <Text style={styles.dadoValor}>22% a 35%</Text>
              <Text style={styles.dadoLabel}>Lucratividade Média</Text>
            </View>
            <View style={styles.cardDado}>
              <Text style={styles.dadoValor}>18 a 24 m</Text>
              <Text style={styles.dadoLabel}>Retorno do Investimento</Text>
            </View>
          </View>

          <View style={styles.boxSuporte}>
            <Text style={styles.suporteTitulo}>✨ O que está incluso na taxa de franquia?</Text>
            <Text style={styles.suporteItem}>• Manuais de Gestão Operacional e Financeira.</Text>
            <Text style={styles.suporteItem}>• Treinamento e certificação para professores na metodologia Flowy.</Text>
            <Text style={styles.suporteItem}>• Projeto arquitetônico pronto (Estúdio Zen Minimalista).</Text>
            <Text style={styles.suporteItem}>• Sistema de marketing centralizado para captação de alunos.</Text>
          </View>
        </View>

        {/* Formulário de Lead */}
        <View style={styles.secaoForm}>
          <Text style={styles.tituloSecao}>Seja um Parceiro Flowy</Text>
          <Text style={styles.subForm}>Preencha os dados abaixo para receber a Circular de Oferta de Franquia (COF).</Text>

          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Carlos Silva" 
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail Corporativo *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: carlos@email.com" 
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Telefone / WhatsApp *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: (11) 99999-9999" 
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>Capital disponível para investimento (Opcional)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: R$ 150.000" 
            value={capital}
            onChangeText={setCapital}
          />

          <TouchableOpacity style={styles.botaoEnviar} onPress={lidarComEnvio}>
            <Text style={styles.botaoEnviarTexto}>SOLICITAR APRESENTAÇÃO COMMERCIAL</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFD' },
  header: {
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35,
    borderBottomWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
  },
  botaoVoltar: { paddingVertical: 6, paddingHorizontal: 12 },
  botaoVoltarTexto: { color: '#836FFF', fontSize: 14, fontWeight: '500' },
  headerTitulo: { fontSize: 16, fontWeight: '600', color: '#2A2A38' },
  scroll: { flex: 1 },
  heroBox: {
    backgroundColor: '#836FFF',
    padding: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600', letterSpacing: 1, marginBottom: 8 },
  heroFormTitulo: { fontSize: 24, color: '#FFF', fontWeight: '300', marginBottom: 12, lineHeight: 30 },
  heroDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 20, fontWeight: '300' },
  secaoDados: { padding: 24 },
  tituloSecao: { fontSize: 20, color: '#2A2A38', fontWeight: '400', marginBottom: 16 },
  gridDados: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  cardDado: { flex: 1, backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.08)', alignItems: 'center' },
  dadoValor: { fontSize: 22, color: '#836FFF', fontWeight: '600', marginBottom: 4 },
  dadoLabel: { fontSize: 12, color: '#7E7E8A', textAlign: 'center' },
  boxSuporte: { backgroundColor: 'rgba(131, 111, 255, 0.03)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.06)' },
  suporteTitulo: { color: '#2A2A38', fontWeight: '500', fontSize: 14, marginBottom: 12 },
  suporteItem: { color: '#5C5C6A', fontSize: 13, lineHeight: 22, marginBottom: 4 },
  secaoForm: { backgroundColor: '#FFF', marginHorizontal: 24, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(131, 111, 255, 0.08)' },
  subForm: { fontSize: 13, color: '#7E7E8A', marginBottom: 20, lineHeight: 18 },
  label: { fontSize: 13, color: '#2A2A38', fontWeight: '500', marginBottom: 6 },
  input: { backgroundColor: '#FAFAFD', borderWidth: 1, borderColor: '#E4E4ED', height: 48, borderRadius: 12, paddingHorizontal: 14, marginBottom: 16, color: '#2A2A38' },
  botaoEnviar: { backgroundColor: '#836FFF', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  botaoEnviarTexto: { color: '#FFF', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
});