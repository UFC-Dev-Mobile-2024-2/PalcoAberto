import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export const PostCard = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.highlightCard} onPress={onPress}>
      <Image style={styles.highlightImage} source={post.image} />
      <Text style={styles.highlightDescription}>{post.description}</Text>
      <View style={styles.cardTags}>
        {post.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};