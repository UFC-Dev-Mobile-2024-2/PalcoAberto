import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando ícones do Material Design
import axios from 'axios'; // Para fazer requisições HTTP

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está logado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Home'); // Estado para controlar a tela atual
  const [selectedPost, setSelectedPost] = useState(null); // Estado para armazenar o post selecionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a busca

  // Função para fazer login com a API reqres.in
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        setIsLoggedIn(true); // Define o estado como logado
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
    }
  };

  // Dados das postagens e eventos (mock)
  const posts = [
    {
      id: 1,
      type: 'post',
      image: require('./assets/de.jpg'),
      description: 'O Festival de Verão foi incrível!',
      details: 'Foi um show emocionante com mais de 50 mil pessoas presentes. Reggaezim do Cera arrasou no palco principal!',
       date: '15/12/2023',
        location: 'São Paulo, SP',
      tags: ['Banda', 'Rock'], // Tags de gênero e tipo de artista
    },
    {
      id: 2,
      type: 'post',
      image: require('./assets/fg.jpg'),
      description: 'Novo single lançado! Confiram!',
      details: 'Ouça agora o novo single "Vibração Cósmica" nas principais plataformas de streaming.',
       date: '15/12/2023',
        location: 'São Paulo, SP',
      tags: ['Banda', 'Rock'], // Tags de gênero e tipo de artista
    },
    {
      id: 3,
      type: 'post',
      image: require('./assets/gh.jpg'),
      description: 'O que falar da apresentação no matulão!',
      details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
       date: '15/12/2023',
        location: 'São Paulo, SP',
      tags: ['solo', 'Rock'], // Tags de gênero e tipo de artista
    },
    {
      id: 4,
      type: 'post',
      image: require('./assets/gh.jpg'),
      description: 'Confira como foi nosso show em Quixadá',
      details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
      date: '15/12/2023',
      location: 'São Paulo, SP',
      tags: ['duo', 'Reggae'], // Tags de gênero e tipo de artista
    },
  ];


  // Dados do perfil do produtor de eventos 
  const profileData = {
    name: 'Carlos Eventos',
    bio: 'Produtor de eventos com mais de 10 anos de experiência, especializado em festivais e shows ao vivo.',
    profileImage: require('./assets/image.png'), // Mock da imagem do perfil
    socialLinks: [
      { id: 1, icon: 'language', label: 'Site' }, // Ícone do Material Design para Site
      { id: 2, icon: 'camera-alt', label: 'Instagram' }, // Ícone do Material Design para Instagram
      { id: 3, icon: 'email', label: 'Email' }, // Ícone do Material Design para Email
    ],
    events: [
      {
        id: 1,
        title: 'Show de forró',
        date: '15/12/2023',
        location: 'São Paulo, SP',
        image: require('./assets/ab.JPG'),
        tags: ['Banda', 'Forró'], // Tags de gênero e tipo de artista
        details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
      },
      {
        id: 2,
        title: 'Noite Eletrônica',
        date: '20/01/2024',
        location: 'Rio de Janeiro, RJ',
        image: require('./assets/bc.JPG'),
        tags: ['Solo', 'Eletrônico'], // Tags de gênero e tipo de artista,
        details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
      },
      {
        id: 3,
        title: 'Show Beneficente',
        date: '05/02/2024',
        location: 'Belo Horizonte, MG',
        image: require('./assets/cd.JPG'),
        tags: ['Festival'], // Tags de gênero e tipo de artista
        details: 'Confira a entrevista de Reggaezim do Cera na revista Rolling Stone.',
      },
    ],
    reviews: [
      {
        id: 1,
        author: 'João Silva',
        rating: 5,
        comment: 'Eventos incríveis! Tudo foi muito bem organizado.',
      },
      {
        id: 2,
        author: 'Maria Souza',
        rating: 4,
        comment: 'Adorei o festival, mas a fila para o banheiro estava longa.',
      },
      {
        id: 3,
        author: 'Pedro Oliveira',
        rating: 5,
        comment: 'Melhor evento que já fui! Parabéns à equipe.',
      },
    ],
  };

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



  // Função para renderizar o conteúdo com base na tela atual
  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ScrollView style={styles.container}>
            {/* Menu Superior */}
            <Image
              source={require('./assets/logoBlakv2.png')} // Mock da logo
              style={styles.logoPaginas}
            />
            <View style={styles.topMenu}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar posts ou eventos..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} >
                  <Icon
                    name="search" // Ícone do Material Design para lupa
                    size={24} // Tamanho do ícone
                    color="#6200ee" // Cor do ícone (roxo)
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Seção de Posts em Destaque */}
            <Text style={styles.sectionTitle}>Postagens em Destaque</Text>

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
              {profileData.events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => openPostDetails(event)}
                >
                  <Image
                    source={event.image}
                    style={styles.eventImage}
                  />

                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>

                    {/* Tags no canto direito */}
                    <View style={styles.cardTags2}>
                      {event.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      case 'Postagens':
        return (
          <ScrollView style={styles.container}>
            {/* Menu Superior */}
            <Image
              source={require('./assets/logoBlakv2.png')} // Mock da logo
              style={styles.logoPaginas}
            />
            <View style={styles.topMenu}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar posts..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} >
                  <Icon
                    name="search" // Ícone do Material Design para lupa
                    size={24} // Tamanho do ícone
                    color="#6200ee" // Cor do ícone (roxo)
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Lista de Postagens */}
            <Text style={styles.sectionTitle}>Postagens</Text>
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.smallCard}
                  onPress={() => openPostDetails(post)}
                >
                  <Image
                    style={styles.smallCardImage}
                    source={post.image}
                  />
                  <Text style={styles.smallCardDescription}>{post.description}</Text>
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
          </ScrollView>
        );
      case 'Propostas':
        return (
          <ScrollView style={styles.container}>
            {/* Menu Superior */}
            <Image
              source={require('./assets/logoBlakv2.png')} // Mock da logo
              style={styles.logoPaginas}
            />
            <View style={styles.topMenu}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar eventos..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} >
                  <Icon
                    name="search" // Ícone do Material Design para lupa
                    size={24} // Tamanho do ícone
                    color="#6200ee" // Cor do ícone (roxo)
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Lista de Propostas */}
            <Text style={styles.sectionTitle}>Eventos</Text>
            <View style={styles.eventsContainer}>
              {profileData.events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => openPostDetails(event)}
                >
                  <Image
                    source={event.image}
                    style={styles.eventImage}
                  />

                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>

                    {/* Tags no canto direito */}
                    <View style={styles.cardTags2}>
                      {event.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      case 'Perfil':
        return (
          <ScrollView style={styles.container}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.profileHeader}>
              <Image
                source={profileData.profileImage}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileBio}>{profileData.bio}</Text>

              {/* Redes Sociais */}
              <View style={styles.socialLinksContainer}>
                {profileData.socialLinks.map((link) => (
                  <TouchableOpacity key={link.id} style={styles.socialLinkButton}>
                    <Icon
                      name={link.icon} // Usando o ícone do Material Design
                      size={24} // Tamanho do ícone
                      color="#6200ee" // Cor do ícone (roxo)
                    />
                    <Text style={styles.socialLinkLabel}>{link.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Seção de Eventos Criados */}
            <Text style={styles.sectionTitle}>Eventos Criados</Text>
            <View style={styles.eventsContainer}>
              {profileData.events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => openPostDetails(event)}
                >
                  <Image
                    source={event.image}
                    style={styles.eventImage}
                  />

                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>

                    {/* Tags no canto direito */}
                    <View style={styles.cardTags2}>
                      {event.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Seção de Meus Posts */}
             <Text style={styles.sectionTitle}>Meus posts</Text>
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.smallCard}
                  onPress={() => openPostDetails(post)}
                >
                  <Image
                    style={styles.smallCardImage}
                    source={post.image}
                  />
                  <Text style={styles.smallCardDescription}>{post.description}</Text>
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

            {/* Seção de Avaliações */}
            <Text style={styles.sectionTitle}>Avaliações</Text>
            <View style={styles.reviewsContainer}>
              {profileData.reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewRating}>
                    {'⭐'.repeat(review.rating)}
                  </Text>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  // Se o usuário não estiver logado, exibe a tela de login
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Image
          source={require('./assets/logoBlakv2.png')} // Mock da logo
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      {/* Conteúdo principal */}
      {renderContent()}

      {/* Modal para detalhes do evento */}
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
                  source={selectedPost.image}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedPost.title || selectedPost.description}</Text>
                <Text style={styles.modalDetails}>{selectedPost.details}</Text>
                <Text style={styles.modalDetails}>{selectedPost.date}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closePostDetails}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Botão Flutuante */}
      {currentScreen !== 'Perfil' && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => Alert.alert('Adicionar', 'Adicionar postagem ou evento')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Barra de Menu Inferior com Ícones do Material Design */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Icon
            name="home"
            size={24}
            color={currentScreen === 'Home' ? '#6200ee' : '#666'}
          />
          <Text style={currentScreen === 'Home' ? styles.menuButtonActive : styles.menuButtonText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Postagens')}
        >
          <Icon
            name="article"
            size={24}
            color={currentScreen === 'Postagens' ? '#6200ee' : '#666'}
          />
          <Text style={currentScreen === 'Postagens' ? styles.menuButtonActive : styles.menuButtonText}>
            Postagens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Propostas')}
        >
          <Icon
            name="assignment"
            size={24}
            color={currentScreen === 'Propostas' ? '#6200ee' : '#666'}
          />
          <Text style={currentScreen === 'Propostas' ? styles.menuButtonActive : styles.menuButtonText}>
            Eventos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Perfil')}
        >
          <Icon
            name="person"
            size={24}
            color={currentScreen === 'Perfil' ? '#6200ee' : '#666'}
          />
          <Text style={currentScreen === 'Perfil' ? styles.menuButtonActive : styles.menuButtonText}>
            Perfil
          </Text>
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
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '80%',
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
  topMenu: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: '85%',
    height: 85,
    marginBottom: 56,
    marginTop: 70,
  },
  logoPaginas: {
    width: '30%',
    height: 30,
    marginBottom: 20,
    marginTop: 70,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
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
  eventDetails: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  smallCard: {
    width: '48%',
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
  smallCardImage: {
    width: '100%',
    height: 100,
  },
  smallCardDescription: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  cardTags: {
    top: 3,
    right: 3,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  cardTags2: {
    position: 'absolute',
    top: 25,
    right: 10,
    alignItems: 'flex-end',
  },
  tag: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 2,
    marginLeft: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    marginTop: 56,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLinkButton: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialLinkLabel: {
    fontSize: 12,
    color: '#666',
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewCard: {
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
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
  },
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
  modalTitle: {
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
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menuButtonActive: {
    fontSize: 12,
    color: '#6200ee',
    fontWeight: 'bold',
    marginTop: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});