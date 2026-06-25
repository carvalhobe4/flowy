import React, { useRef } from 'react';
import { Alert, Dimensions, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface HomeLandingPageProps {
  aoIniciarTreino: () => void;
  aoClicarFranquia: () => void;
}

export default function HomeLandingPage({ aoIniciarTreino, aoClicarFranquia }: HomeLandingPageProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const rolarParaSeção = (y: number) => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* 1. NAV BAR BLINDADA CONTRA QUEBRA DE LAYOUT */}
      <View style={styles.navBar}>
        <Text style={styles.navLogo} numberOfLines={1}>Flowy</Text>
        
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => rolarParaSeção(0)}>
            <Text style={styles.navText} numberOfLines={1}>Início</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => rolarParaSeção(height * 0.65)}>
            <Text style={styles.navText} numberOfLines={1}>Sobre</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={aoClicarFranquia}>
            <Text style={styles.navText} numberOfLines={1}>Seja Sócio</Text>
          </TouchableOpacity>

          {/* BOTÃO DE SHARE EM FORMATO COMPACTO PARA CABER EM QUALQUER CELULAR */}
          <TouchableOpacity style={styles.navBotaoShare} onPress={onShare} activeOpacity={0.7}>
            <Text style={styles.navBotaoShareTexto} numberOfLines={1}>
              {width < 360 ? '🔗' : '🔗 Compartilhar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBotaoPequeno} onPress={aoIniciarTreino} activeOpacity={0.7}>
            <Text style={styles.navBotaoTexto} numberOfLines={1}>Treinar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* 2. SEÇÃO HERO / BANNER PRINCIPAL */}
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

        {/* 3. SEÇÃO: O QUE É O YOGA */}
        <View style={styles.secaoBranca}>
          <Text style={styles.secaoTag}>O MOVIMENTO</Text>
          <Text style={styles.secaoTitulo}>Por que o Yoga?</Text>
          <Text style={styles.secaoDescricao}>
            Mais do que posturas físicas, o Yoga na rede Flowy é uma tecnologia de bem-estar.
          </Text>

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

        {/* 4. BANNER INTERMEDIÁRIO */}
        <View style={styles.bannerMeioContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000' }} 
            style={styles.bannerMeioImagem}
          />
          <View style={styles.bannerMeioCapa}>
            <Text style={styles.bannerMeioTexto}>"O corpo alcança o que a mente acredita."</Text>
          </View>
        </View>

        {/* 5. SEÇÃO FRANQUEADO */}
        <View style={styles.secaoRoxa}>
          <Text style={styles.franquiaTag}>EXPANSÃO FLOWY</Text>
          <Text style={styles.franquiaTitulo}>Abra sua própria Escola de Yoga Flowy</Text>
          <TouchableOpacity style={styles.botaoFranquia} onPress={aoClicarFranquia}>
            <Text style={styles.botaoFranquiaTexto}>CONHECER MODELO DE LOJA</Text>
          </TouchableOpacity>
        </View>

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
  // Mudanças críticas aqui para impedir sobreposição em telas finas/pequenas
  navBar: {
    height: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03, 
    paddingTop: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
    zIndex: 10,
  },
  navLogo: {
    fontSize: width * 0.045, 
    fontWeight: '700',
    color: '#836FFF',
    marginRight: 6,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: width * 0.018, // Espaçamento menor e dinâmico entre itens
    flex: 1, 
  },
  navText: {
    fontSize: width * 0.028, 
    color: '#7E7E8A',
    fontFamily: 'sans-serif-light',
  },
  navBotaoShare: {
    backgroundColor: '#ECEAFB',
    paddingHorizontal: width * 0.02,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.2)',
  },
  navBotaoShareTexto: {
    color: '#836FFF',
    fontSize: width * 0.028,
    fontWeight: '600',
  },
  navBotaoPequeno: {
    backgroundColor: '#836FFF',
    paddingHorizontal: width * 0.025,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navBotaoTexto: {
    color: '#FFFFFF',
    fontSize: width * 0.028,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  heroContainer: {
    width: width,
    height: 460,
  },
  heroBanner: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(42, 42, 56, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  promoTag: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
    backgroundColor: '#836FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  heroTitulo: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '300',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSubtitulo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    marginBottom: 20,
  },
  botaoPrincipal: {
    backgroundColor: '#836FFF',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoPrincipalTexto: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  secaoBranca: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: '#FFFFFF',
  },
  secaoTag: {
    color: '#836FFF',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
  },
  secaoTitulo: {
    fontSize: 22,
    color: '#2A2A38',
    textAlign: 'center',
    marginBottom: 12,
  },
  secaoDescricao: {
    fontSize: 14,
    color: '#5C5C6A',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 12,
  },
  beneficioCard: {
    backgroundColor: '#FAFAFD',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(131, 111, 255, 0.08)',
  },
  beneficioEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  beneficioTitulo: {
    fontSize: 15,
    color: '#2A2A38',
    fontWeight: '500',
  },
  beneficioTexto: {
    fontSize: 13,
    color: '#7E7E8A',
    lineHeight: 18,
  },
  bannerMeioContainer: {
    width: width,
    height: 140,
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
  },
  bannerMeioTexto: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'italic',
  },
  secaoRoxa: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: 'rgba(131, 111, 255, 0.04)',
  },
  franquiaTag: {
    color: '#836FFF',
    fontSize: 11,
  },
  franquiaTitulo: {
    fontSize: 22,
    color: '#2A2A38',
    marginBottom: 16,
  },
  botaoFranquia: {
    borderWidth: 1,
    borderColor: '#836FFF',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoFranquiaTexto: {
    color: '#836FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  footerTexto: {
    fontSize: 11,
    color: '#A0A0AA',
  },
});