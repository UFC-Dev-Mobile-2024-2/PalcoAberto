import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from '../styles/styles';

export const CreatePostModal = ({ visible, onClose, onCreate }) => {
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTag, setNewTag] = useState('');
  const [contentType, setContentType] = useState('post');

  const handleCreate = () => {
    onCreate({
      description: newDescription,
      date: newDate,
      location: newLocation,
      tag: newTag,
      type: contentType,
    });
    setNewDescription('');
    setNewDate('');
    setNewLocation('');
    setNewTag('');
    setContentType('post');
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar Novo Post/Evento</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="post"
                status={contentType === 'post' ? 'checked' : 'unchecked'}
                onPress={() => setContentType('post')}
              />
              <Text style={styles.radioLabel}>Postagem</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="event"
                status={contentType === 'event' ? 'checked' : 'unchecked'}
                onPress={() => setContentType('event')}
              />
              <Text style={styles.radioLabel}>Evento</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder={contentType === 'post' ? "Descrição" : "Título do Evento"}
            placeholderTextColor="#999"
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            placeholderTextColor="#999"
            value={newDate}
            onChangeText={setNewDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Localização"
            placeholderTextColor="#999"
            value={newLocation}
            onChangeText={setNewLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Tag (ex: Banda, Rock)"
            placeholderTextColor="#999"
            value={newTag}
            onChangeText={setNewTag}
          />
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Criar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};