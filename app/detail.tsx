import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailScreen() {
  const { id, title, description, category, date } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image 
            source={require('@/assets/images/poznan.jpg')} 
            style={styles.image}
            resizeMode="cover"
          />
          
          <View style={styles.textContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.category}>{category}</Text>
            </View>
            
            <Text style={styles.date}>{date}</Text>
            
            <Text style={styles.description}>
              {description}
            </Text>
            
            <Text style={styles.fullText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              {'\n\n'}
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              {'\n\n'}
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
  image: {
    height: 250,
    width: '100%',
  },
  textContent: {
    padding: 24,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  fullText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});