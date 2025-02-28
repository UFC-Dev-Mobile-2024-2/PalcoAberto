import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/styles';

export const Header = ({ showSearch, onSearch, searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.topMenu}>
      <Image
        source={require('../assets/logoBlakv2.png')} // Mock da logo
        style={styles.logoPaginas}
      />
      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
            <Icon name="search" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};