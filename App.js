import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está logado

  // Função para simular o login
  const handleLogin = () => {
    setIsLoggedIn(true); // Define o estado como logado
  };

  // Se o usuário não estiver logado, exibe a tela de login
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Se o usuário estiver logado, exibe a tela do artista
  return <ArtistProfile />;
}

function ArtistProfile() {
  const [currentScreen, setCurrentScreen] = useState('Home'); // Estado para controlar a tela atual
  const [selectedPost, setSelectedPost] = useState(null); // Estado para armazenar o post selecionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a busca

  // Dados das postagens e eventos (mock)
  const posts = [
    {
      id: 1,
      type: 'post',
      image: require('./assets/image.png'),
      description: 'Show incrível no Festival de Verão!',
      details: 'Foi um show emocionante com mais de 50 mil pessoas presentes. Reggaezim do Cera arrasou no palco principal!',
      tags: ['DJ', 'Eletrônico'], // Tags de gênero e tipo de artista
    },
    {
      id: 2,
      type: 'post',
      image: require('./assets/image.png'),
      description: 'Novo single lançado!',
      details: 'Ouça agora o novo single "Vibração Cósmica" nas principais plataformas de streaming.',
      tags: ['Solo', 'Reggae'], // Tags de gênero e tipo de artista
    },
    {
      id: 3,
      type: 'post',
      image: require('./assets/image.png'),
      description: 'Entrevista exclusiva!',
      details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
      tags: ['Duo', 'Rock'], // Tags de gênero e tipo de artista
    },
  ];

  const events = [
    {
      id: 1,
      type: 'event',
      image: require('./assets/image.png'),
      description: 'Festival de Inverno',
      details: 'Não perca o Festival de Inverno no próximo mês! Será um evento épico com várias atrações.',
      tags: ['DJ', 'Eletrônico'], // Tags de gênero e tipo de artista
    },
    {
      id: 2,
      type: 'event',
      image: require('./assets/image.png'),
      description: 'Show Beneficente',
      details: 'Participe do show beneficente para ajudar crianças carentes.',
      tags: ['Solo', 'Pop'], // Tags de gênero e tipo de artista
    },
    {
      id: 3,
      type: 'event',
      image: require('./assets/image.png'),
      description: 'Lançamento do Novo Álbum',
      details: 'Venha para o lançamento do novo álbum "Vibração Cósmica".',
      tags: ['Duo', 'Reggae'], // Tags de gênero e tipo de artista
    },
  ];

  // Função para abrir o modal com os detalhes do post
  const openPostDetails = (post) => {
    setSelectedPost(post); // Define o post selecionado
    setModalVisible(true); // Abre o modal
  };

  // Função para fechar o modal
  const closePostDetails = () => {
    setModalVisible(false); // Fecha o modal
    setSelectedPost(null); // Limpa o post selecionado
  };

  // Função mockada para filtrar posts (simulação)
  const filterPosts = () => {
    alert(`Filtrando posts com a busca: "${searchQuery}"`);
  };

  // Função para renderizar o conteúdo com base na tela atual
  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ScrollView style={styles.container}>
            {/* Barra de Busca */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar posts ou eventos..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.searchButton} onPress={filterPosts}>
                <Text style={styles.searchButtonText}>🔍</Text>
              </TouchableOpacity>
            </View>

            {/* Seção de Posts em Destaque */}
            <Text style={styles.sectionTitle}>Posts em Destaque</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.highlightsContainer}
            >
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.highlightCard}
                  onPress={() => openPostDetails(post)}
                >
                  <Image
                    style={styles.highlightImage}
                    source={post.image}
                  />
                  <Text style={styles.highlightDescription}>{post.description}</Text>
                  {/* Tags no canto direito */}
                  <View style={styles.cardTags}>
                    {post.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Seção de Eventos */}
            <Text style={styles.sectionTitle}>Eventos</Text>
            <View style={styles.eventsContainer}>
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => openPostDetails(event)}
                >
                  <Image
                    style={styles.eventImage}
                    source={event.image}
                  />
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  {/* Tags no canto direito */}
                  <View style={styles.cardTags}>
                    {event.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      case 'Perfil':
        return (
          <ScrollView style={styles.container}>
            {/* Cabeçalho do Artista */}
            <View style={styles.header}>
              <Image
                style={styles.artistImage}
                source={require('./assets/image.png')} // Substitua pela imagem do artista
              />
              <Text style={styles.artistName}>Reggaezim do Cera</Text>
              <Text style={styles.artistBio}>Artista de Rock/DJ com mais de 10 anos de experiência.</Text>

              {/* Redes Sociais */}
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text>🌐 Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text>📸 Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text>🎵 Spotify</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Postagens do Artista */}
            <Text style={styles.sectionTitle}>Postagens</Text>
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.postCard}
                  onPress={() => openPostDetails(post)}
                >
                  <Image
                    style={styles.postImage}
                    source={post.image}
                  />
                  <Text style={styles.postDescription}>{post.description}</Text>
                  {/* Tags no canto direito */}
                  <View style={styles.cardTags}>
                    {post.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Depoimentos */}
            <Text style={styles.sectionTitle}>Depoimentos</Text>
            <View style={styles.testimonialsContainer}>
              {/* Depoimento 1 */}
              <View style={styles.testimonialCard}>
                <Text style={styles.testimonialText}>
                  "O show foi incrível! Reggaezim do Cera arrasou!"
                </Text>
                <Text style={styles.testimonialAuthor}>- João Silva</Text>
              </View>

              {/* Depoimento 2 */}
              <View style={styles.testimonialCard}>
                <Text style={styles.testimonialText}>
                  "Melhor experiência musical da minha vida!"
                </Text>
                <Text style={styles.testimonialAuthor}>- Maria Souza</Text>
              </View>

              {/* Depoimento 3 */}
              <View style={styles.testimonialCard}>
                <Text style={styles.testimonialText}>
                  "Não vejo a hora do próximo show!"
                </Text>
                <Text style={styles.testimonialAuthor}>- Pedro Oliveira</Text>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.fullContainer}>
      {/* Conteúdo principal */}
      {renderContent()}

      {/* Modal para detalhes da postagem */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closePostDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPost && (
              <>
                <Image
                  style={styles.modalImage}
                  source={selectedPost.image}
                />
                <Text style={styles.modalDescription}>{selectedPost.description}</Text>
                <Text style={styles.modalDetails}>{selectedPost.details}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closePostDetails}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Text style={currentScreen === 'Home' ? styles.menuButtonActive : styles.menuButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Perfil')}
        >
          <Text style={currentScreen === 'Perfil' ? styles.menuButtonActive : styles.menuButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos da tela de login
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos da tela do artista
  fullContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#6200ee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  highlightsContainer: {
    paddingBottom: 16,
  },
  highlightCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  highlightImage: {
    width: '100%',
    height: 120,
  },
  highlightDescription: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  eventsContainer: {
    marginBottom: 16,
  },
  eventCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventDescription: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  cardTags: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  tag: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  testimonialsContainer: {
    marginBottom: 24,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  testimonialText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 16,
    color: '#666',
  },
  menuButtonActive: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 'bold',
  },

  // Estilos do modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});