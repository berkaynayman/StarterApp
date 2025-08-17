import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([1, 3]);
  const insets = useSafeAreaInsets();

  const favoriteCourses = [
    { 
      id: 1, 
      title: 'React Native Masterclass', 
      description: 'Build professional mobile apps with React Native and Expo', 
      category: 'Development',
      instructor: 'John Smith',
      duration: '12h 30m',
      rating: 4.8,
      students: 2340,
      price: '$89',
      level: 'Intermediate'
    },
    { 
      id: 3, 
      title: 'JavaScript Advanced Concepts', 
      description: 'Master advanced JavaScript concepts and modern ES6+ features', 
      category: 'Development',
      instructor: 'Mike Chen',
      duration: '15h 20m',
      rating: 4.7,
      students: 3120,
      price: '$99',
      level: 'Advanced'
    },
  ];

  const handleCardPress = (course: any) => {
    router.push({
      pathname: '/detail',
      params: {
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        instructor: course.instructor,
        duration: course.duration,
        rating: course.rating,
        students: course.students,
        price: course.price,
      },
    });
  };

  const removeFavorite = (courseId: number) => {
    setFavorites(prev => prev.filter(id => id !== courseId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return '#3B82F6';
      case 'Design': return '#8B5CF6';
      case 'Data Science': return '#10B981';
      case 'Marketing': return '#F97316';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>My Favorites</Text>
            <Text style={styles.subtitle}>{favoriteCourses.length} courses saved</Text>
          </View>

          {/* Empty State */}
          {favoriteCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="heart-outline" size={64} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyDescription}>
                Start adding courses to your favorites by tapping the heart icon
              </Text>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.browseButtonText}>Browse Courses</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Favorite Courses */
            favoriteCourses.map((course) => (
              <TouchableOpacity 
                key={course.id} 
                style={styles.courseCard} 
                onPress={() => handleCardPress(course)}
                activeOpacity={0.95}
              >
                <Image 
                  source={require('@/assets/images/img.jpg')} 
                  style={styles.courseImage}
                  resizeMode="cover"
                />
                <View style={styles.courseContent}>
                  <View style={styles.courseHeader}>
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <Text style={styles.instructorName}>by {course.instructor}</Text>
                    </View>
                    <View style={styles.courseMeta}>
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => removeFavorite(course.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="heart" size={20} color="#EF4444" />
                      </TouchableOpacity>
                      <Text style={styles.coursePrice}>{course.price}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.courseDescription}>{course.description}</Text>
                  
                  <View style={styles.courseFooter}>
                    <View style={styles.courseStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={14} color="#6B7280" />
                        <Text style={styles.statText}>{course.duration}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.statText}>{course.rating}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Ionicons name="people-outline" size={14} color="#6B7280" />
                        <Text style={styles.statText}>{course.students}</Text>
                      </View>
                    </View>
                    <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(course.category) + '20' }]}>
                      <Text style={[styles.categoryTagText, { color: getCategoryColor(course.category) }]}>
                        {course.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  browseButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courseImage: {
    height: 140,
    width: '100%',
  },
  courseContent: {
    padding: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#6B7280',
  },
  courseMeta: {
    alignItems: 'flex-end',
  },
  removeButton: {
    padding: 4,
    marginBottom: 8,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  courseDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
});