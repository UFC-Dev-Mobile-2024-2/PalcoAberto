import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Modal,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import { EventCard } from './components/EventCard';
import { CreatePostModal } from './components/CreatePostModal';
import { styles } from './styles/styles';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTag, setNewTag] = useState('');
  const [contentType, setContentType] = useState('post');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Carlos Eventos',
      message: 'Olá, gostaria de saber mais sobre o evento.',
      timestamp: '15/12/2023 10:00',
    },
    {
      id: 2,
      sender: 'Maria Souza',
      message: 'Você pode me enviar mais detalhes?',
      timestamp: '15/12/2023 10:05',
    },
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'post',
      image: require('./assets/de.jpg'),
      description: 'O Festival de Verão foi incrível!',
      details: 'Foi um show emocionante com mais de 50 mil pessoas presentes. Reggaezim do Cera arrasou no palco principal!',
      date: '15/12/2023',
      location: 'São Paulo, SP',
      tags: ['Banda', 'Rock'],
    },
    {
      id: 2,
      type: 'post',
      image: require('./assets/fg.jpg'),
      description: 'Novo single lançado! Confiram!',
      details: 'Ouça agora o novo single "Vibração Cósmica" nas principais plataformas de streaming.',
      date: '15/12/2023',
      location: 'São Paulo, SP',
      tags: ['Banda', 'Rock'],
    },
     {
      id: 3,
      type: 'post',
      image: require('./assets/cd.jpg'),
      description: 'Gorilla Glue! A nova banda do momento.',
      details: 'Conheça de perto a mais nova campeã do reality Battle of the Bands.',
      date: '07/02/2024',
      location: 'São Paulo, SP',
      tags: ['Banda', 'Evento'],
    },
    {
      id: 4,
      type: 'post',
      image: require('./assets/bc.jpg'),
      description: 'Gravação do novo albúm.',
      details: 'Escute nossas novas faixas!       Disponível em todas as plataformas digitais..',
      date: '05/07/2022',
      location: 'Icó, CE',
      tags: ['Banda', 'Jazz'],
    },
  ]);

  const [profileData, setProfileData] = useState({
    name: 'Carlos Eventos',
    bio: 'Produtor de eventos com mais de 10 anos de experiência, especializado em festivais e shows ao vivo.',
    profileImage: require('./assets/image.png'),
    socialLinks: [
      { id: 1, icon: 'language', label: 'Site' },
      { id: 2, icon: 'camera-alt', label: 'Instagram' },
      { id: 3, icon: 'email', label: 'Email' },
    ],
    events: [
      {
        id: 1,
        title: 'CTN - Show Forró love',
        date: '15/12/2025',
        location: 'São Paulo, SP',
        image: require('./assets/ctn.jpg'),
        tags: ['Banda', 'Forró'],
        details: 'Requisitos de repertório mínimo (30 min).',
      },
      {
        id: 2,
        title: 'Boate Pink - Crush Party',
        date: '20/01/2025',
        location: 'Rio de Janeiro, RJ',
        image: require('./assets/boate.jpg'),
        tags: ['Solo', 'Eletrônico'],
        details: 'Requisito mínimo de 40 min de show.',
      },
      {
        id: 3,
        title: 'Igreja M.P. - Show Beneficente',
        date: '05/02/2025',
        location: 'Belo Horizonte, MG',
        image: require('./assets/show.jpg'),
        tags: ['Festival'],
        details: 'Show voltado para arrecadar fundos para a campanha Amigos do Bem.',
      },
      {
        id: 4,
        title: 'Pampas Grill - Cantor para Noite',
        date: '25/07/2025',
        location: 'Brasília, DF',
        image: require('./assets/carne.jpg'),
        tags: ['Solo', 'Country'],
        details: 'Valor de couvert R$ 10,00 por cliente.',
      },
    ],
    reviews: [
      {
        id: 1,
        author: 'João Silva',
        rating: 5,
        comment: 'Eventos incríveis! Tudo foi muito bem organizado.',
      },
      {
        id: 2,
        author: 'Maria Souza',
        rating: 4,
        comment: 'Adorei o festival, mas a fila para o banheiro estava longa.',
      },
    ],
  });

  // Função para fazer login
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        setIsLoggedIn(true);
        setShowSplash(true);
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
    }
  };

  // Efeito para esconder a splash screen
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Função para abrir detalhes do post/evento
  const openPostDetails = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  // Função para fechar o modal de detalhes
  const closePostDetails = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  // Função para criar um novo post/evento
  const handleCreatePost = ({ description, date, location, tag, type }) => {
    if (type === 'post') {
      const newPost = {
        id: posts.length + 1,
        type: 'post',
        image: require('./assets/de.jpg'),
        description,
        details: 'Detalhes do novo post',
        date,
        location,
        tags: [tag],
      };
      setPosts([...posts, newPost]);
    } else if (type === 'event') {
      const newEvent = {
        id: profileData.events.length + 1,
        title: description,
        date,
        location,
        image: require('./assets/de.jpg'),
        tags: [tag],
        details: 'Detalhes do novo evento',
      };
      setProfileData({
        ...profileData,
        events: [...profileData.events, newEvent],
      });
    }
    setCreateModalVisible(false);
  };

  // Renderiza o conteúdo com base na tela atual
  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ScrollView style={styles.container}>
            <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Text style={styles.sectionTitle}>Postagens em Destaque</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.highlightsContainer}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onPress={() => openPostDetails(post)} />
              ))}
            </ScrollView>
            <Text style={styles.sectionTitle}>Eventos</Text>
            <View style={styles.eventsContainer}>
              {profileData.events.map((event) => (
                <EventCard key={event.id} event={event} onPress={() => openPostDetails(event)} />
              ))}
            </View>
          </ScrollView>
        );
      case 'Postagens':
        return (
          <ScrollView style={styles.container}>
            <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Text style={styles.sectionTitle}>Postagens</Text>
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onPress={() => openPostDetails(post)} />
              ))}
            </View>
          </ScrollView>
        );
      case 'Propostas':
        return (
          <ScrollView style={styles.container}>
            <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Text style={styles.sectionTitle}>Eventos</Text>
            <View style={styles.eventsContainer}>
              {profileData.events.map((event) => (
                <EventCard key={event.id} event={event} onPress={() => openPostDetails(event)} />
              ))}
            </View>
          </ScrollView>
        );
      case 'Perfil':
        return (
          <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
              <Image source={profileData.profileImage} style={styles.profileImage} />
              <Text style={styles.profileName}>{profileData.name}</Text>
              <Text style={styles.profileBio}>{profileData.bio}</Text>
              <View style={styles.socialLinksContainer}>
                {profileData.socialLinks.map((link) => (
                  <TouchableOpacity key={link.id} style={styles.socialLinkButton}>
                    <Icon name={link.icon} size={24} color="#007BFF" />
                    <Text style={styles.socialLinkLabel}>{link.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text style={styles.sectionTitle}>Eventos Criados</Text>
            <View style={styles.eventsContainer}>
              {profileData.events.map((event) => (
                <EventCard key={event.id} event={event} onPress={() => openPostDetails(event)} />
              ))}
            </View>
            <Text style={styles.sectionTitle}>Meus posts</Text>
            <View style={styles.postsContainer}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onPress={() => openPostDetails(post)} />
              ))}
            </View>
            <Text style={styles.sectionTitle}>Avaliações</Text>
            <View style={styles.reviewsContainer}>
              {profileData.reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );
      case 'Mensagens':
        return (
          <ScrollView style={styles.container}>
            <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Text style={styles.sectionTitle}>Mensagens</Text>
            <View style={styles.messagesContainer}>
              {messages.map((message) => (
                <TouchableOpacity key={message.id} style={styles.messageCard} onPress={() => openMessageDetails(message)}>
                  <Text style={styles.messageSender}>{message.sender}</Text>
                  <Text style={styles.messageText}>{message.message}</Text>
                  <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  // Tela de login
  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Image source={require('./assets/logoBlakv2.png')} style={styles.logo} />
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

  // Splash screen
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./assets/logoBlack.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      {renderContent()}

      {/* Botão flutuante para adicionar posts/eventos */}
      {currentScreen !== 'Perfil' && currentScreen !== 'Mensagens' && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Menu inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Icon
            name="home"
            size={24}
            color={currentScreen === 'Home' ? '#007BFF' : '#666'}
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
            color={currentScreen === 'Postagens' ? '#007BFF' : '#666'}
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
            color={currentScreen === 'Propostas' ? '#007BFF' : '#666'}
          />
          <Text style={currentScreen === 'Propostas' ? styles.menuButtonActive : styles.menuButtonText}>
            Eventos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Mensagens')}
        >
          <Icon
            name="message"
            size={24}
            color={currentScreen === 'Mensagens' ? '#007BFF' : '#666'}
          />
          <Text style={currentScreen === 'Mensagens' ? styles.menuButtonActive : styles.menuButtonText}>
            Mensagens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setCurrentScreen('Perfil')}
        >
          <Icon
            name="person"
            size={24}
            color={currentScreen === 'Perfil' ? '#007BFF' : '#666'}
          />
          <Text style={currentScreen === 'Perfil' ? styles.menuButtonActive : styles.menuButtonText}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para detalhes do post/evento */}
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
                <Image source={selectedPost.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedPost.title || selectedPost.description}</Text>
                <Text style={styles.modalDetails}>{selectedPost.details}</Text>
                <Text style={styles.modalDetails}>{selectedPost.date}</Text>
                <Text style={styles.modalDetails}>{selectedPost.location}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closePostDetails}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal para criar novo post/evento */}
      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={handleCreatePost}
      />
    </View>
  );
}