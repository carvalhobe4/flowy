import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface HomeLandingPageProps {
  aoIniciarTreino: () => void;
  aoClicarFranquia: () => void; // Conexão com a nova tela criada
}

export default function HomeLandingPage({ aoIniciarTreino, aoClicarFranquia }: HomeLandingPageProps) {
  // Referência do ScrollView para fazer a Nav Bar rolar a tela suavemente
  const scrollViewRef = useRef<ScrollView>(null);

  // Funções para rolar até as seções da Landing Page
  const rolarParaSeção = (y: number) => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <View style={styles.container}>
      
      {/* 1. TOP NAV BAR (Navegação interna e externa) */}
      <View style={styles.navBar}>
        <Text style={styles.navLogo}>Flowy</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => rolarParaSeção(0)}>
            <Text style={styles.navTextAtivo}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rolarParaSeção(580)}>
            <Text style={styles.navText}>Sobre Yoga</Text>
          </TouchableOpacity>
          {/* Atualizado para redirecionar para a tela institucional de franquias */}
          <TouchableOpacity onPress={aoClicarFranquia}>
            <Text style={styles.navText}>Franquias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBotaoPequeno} onPress={aoIniciarTreino}>
            <Text style={styles.navBotaoTexto}>Treinar 🧘‍♀️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO PRINCIPAL (LANDING PAGE) */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* 2. SEÇÃO HERO / BANNER PRINCIPAL (Promocional) */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1545208393-2160291ba89e?q=80&w=1000' }} 
            style={styles.heroBanner}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.promoTag}>✨ SESSÃO EXCLUSIVA DISPONÍVEL</Text>
            <Text style={styles.heroTitulo}>Encontre sua fluidez, desperte sua força</Text>
            <Text style={styles.heroSubtitulo}>
              A rede Flowy combina o dinamismo do movimento com a paz mental. Comece hoje a sua jornada.
            </Text>
            <TouchableOpacity style={styles.botaoPrincipal} onPress={aoIniciarTreino}>
              <Text style={styles.botaoPrincipalTexto}>COMEÇAR TREINO AGORA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. SEÇÃO: O QUE É O YOGA FLOWY */}
        <View style={styles.secaoBranca}>
          <Text style={styles.secaoTag}>O MOVIMENTO</Text>
          <Text style={styles.secaoTitulo}>Por que o Yoga?</Text>
          <Text style={styles.secaoDescricao}>
            Mais do que posturas físicas, o Yoga na rede Flowy é uma tecnologia de bem-estar. 
            Cada asana (postura) e pranayama (respiração) é desenhado para lubrificar suas articulações, 
            reduzir o cortisol e devolver a clareza mental que o dia a dia rouba de você.
          </Text>

          {/* Mini Banners de Benefícios */}
          <View style={styles.cardsContainer}>
            <View style={styles.beneficioCard}>
              <Text style={styles.beneficioEmoji}>🌬️</Text>
              <Text style={styles.beneficioTitulo}>Redução do Estresse</Text>
              <Text style={styles.beneficioTexto}>Aprenda a acalmar o sistema nervoso através do controle da respiração.</Text>
            </View>
            <View style={styles.beneficioCard}>
              <Text style={styles.beneficioEmoji}>⚡</Text>
              <Text style={styles.beneficioTitulo}>Foco & Energia</Text>
              <Text style={styles.beneficioTexto}>Posturas que despertam a musculatura profunda e trazem presença total.</Text>
            </View>
          </View>
        </View>

        {/* 4. BANNER INTERMEDIÁRIO (Chamada de Impacto) */}
        <View style={styles.bannerMeioContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000' }} 
            style={styles.bannerMeioImagem}
          />
          <View style={styles.bannerMeioCapa}>
            <Text style={styles.bannerMeioTexto}>"O corpo alcança o que a mente acredita."</Text>
          </View>
        </View>

        {/* 5. SEÇÃO SEJA UM FRANQUEADO (Loja de Franquia) */}
        <View style={styles.secaoRoxa}>
          <Text style={styles.franquiaTag}>EXPANSÃO FLOWY</Text>
          <Text style={styles.franquiaTitulo}>Abra sua própria Escola de Yoga Flowy</Text>
          <Text style={styles.franquiaDescricao}>
            O mercado de bem-estar e saúde mental cresce dois dígitos a cada ano. Seja dono de um modelo 
            de negócios testado, lucrativo e com um propósito que transforma vidas diariamente.
          </Text>

          <View style={styles.franquiaInfoBox}>
            <Text style={styles.infoBoxItem}>✅ Suporte total na escolha do ponto comercial</Text>
            <Text style={styles.infoBoxItem}>✅ Treinamento metodológico exclusivo para professores</Text>
            <Text style={styles.infoBoxItem}>✅ Identidade visual e arquitetura minimalista zen prontas</Text>
          </View>

          {/* Atualizado para acionar a abertura da tela de captação de leads de franquia */}
          <TouchableOpacity style={styles.botaoFranquia} onPress={aoClicarFranquia}>
            <Text style={styles.botaoFranquiaTexto}>CONHECER MODELO DE LOJA</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé institucional sutil */}
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>© 2026 Rede de Academias Yoga Flowy S.A.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFD',
  },
  // Estilos da Nav Bar Superior
  navBar: {
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    borderBottomWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
    zIndex: 10,
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '400',
    color: '#836FFF',
    fontFamily: 'sans-serif-light',
    letterSpacing: 1,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  navText: {
    fontSize: 13,
    color: '#7E7E8A',
    fontFamily: 'sans-serif-light',
  },
  navTextAtivo: {
    fontSize: 13,
    color: '#836FFF',
    fontWeight: '400',
    fontFamily: 'sans-serif-light',
  },
  navBotaoPequeno: {
    backgroundColor: 'rgba(131, 111, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  navBotaoTexto: {
    color: '#836FFF',
    fontSize: 12,
    fontWeight: '400',
  },
  scrollContainer: {
    flex: 1,
  },
  // Estilos do Banner Principal (Hero)
  heroContainer: {
    width: width,
    height: 500,
    position: 'relative',
  },
  heroBanner: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(42, 42, 56, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  promoTag: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.5,
    backgroundColor: '#836FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  heroTitulo: {
    fontSize: 34,
    color: '#FFF',
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    lineHeight: 42,
    marginBottom: 12,
  },
  heroSubtitulo: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'sans-serif-light',
    fontWeight: '300',
    lineHeight: 22,
    marginBottom: 28,
  },
  botaoPrincipal: {
    backgroundColor: '#836FFF',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#836FFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  botaoPrincipalTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
  // Estilos da Seção Sobre Yoga
  secaoBranca: {
    paddingHorizontal: 24,
    paddingVertical: 45,
    backgroundColor: '#FFFFFF',
  },
  secaoTag: {
    color: '#836FFF',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '400',
    marginBottom: 6,
    textAlign: 'center',
  },
  secaoTitulo: {
    fontSize: 26,
    color: '#2A2A38',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 16,
  },
  secaoDescricao: {
    fontSize: 15,
    color: '#5C5C6A',
    lineHeight: 24,
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardsContainer: {
    gap: 16,
  },
  beneficioCard: {
    backgroundColor: '#FAFAFD',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
  },
  beneficioEmoji: {
    fontSize: 24,
    marginBottom: 10,
  },
  beneficioTitulo: {
    fontSize: 16,
    color: '#2A2A38',
    fontWeight: '400',
    marginBottom: 4,
  },
  beneficioTexto: {
    fontSize: 13,
    color: '#7E7E8A',
    lineHeight: 18,
    fontFamily: 'sans-serif-light',
  },
  // Banner de Meio
  bannerMeioContainer: {
    width: width,
    height: 180,
    position: 'relative',
  },
  bannerMeioImagem: {
    width: '100%',
    height: '100%',
  },
  bannerMeioCapa: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(131, 111, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  bannerMeioTexto: {
    color: '#FFF',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'sans-serif-light',
  },
  // Seção da Franquia de Loja
  secaoRoxa: {
    paddingHorizontal: 24,
    paddingVertical: 45,
    backgroundColor: 'rgba(131, 111, 255, 0.04)',
    borderTopWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
  },
  franquiaTag: {
    color: '#836FFF',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '400',
    marginBottom: 6,
  },
  franquiaTitulo: {
    fontSize: 26,
    color: '#2A2A38',
    fontFamily: 'sans-serif-light',
    marginBottom: 16,
  },
  franquiaDescricao: {
    fontSize: 14,
    color: '#5C5C6A',
    lineHeight: 22,
    fontFamily: 'sans-serif-light',
    marginBottom: 20,
  },
  franquiaInfoBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    gap: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.06)',
  },
  infoBoxItem: {
    fontSize: 13,
    color: '#2A2A38',
    fontFamily: 'sans-serif-light',
  },
  botaoFranquia: {
    borderWidth: 1,
    borderColor: '#836FFF',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(131, 111, 255, 0.02)',
  },
  botaoFranquiaTexto: {
    color: '#836FFF',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
  },
  footer: {
    paddingVertical: 25,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  footerTexto: {
    fontSize: 11,
    color: '#A0A0AA',
    fontFamily: 'sans-serif-light',
  },
});