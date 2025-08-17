import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailScreen() {
  const { id, title, description, category, instructor, duration, rating, students, price } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const curriculum = [
    { id: 1, title: 'Introduction to React Native', duration: '15:30', completed: true, locked: false },
    { id: 2, title: 'Setting up Development Environment', duration: '22:45', completed: true, locked: false },
    { id: 3, title: 'Components and Props', duration: '18:20', completed: false, locked: false },
    { id: 4, title: 'State Management', duration: '25:10', completed: false, locked: false },
    { id: 5, title: 'Navigation Basics', duration: '20:15', completed: false, locked: true },
    { id: 6, title: 'API Integration', duration: '30:40', completed: false, locked: true },
  ];

  const relatedCourses = [
    { id: 2, title: 'Advanced React Native', instructor: 'Sarah Johnson', rating: 4.9, price: '$99', image: require('@/assets/images/img.jpg') },
    { id: 3, title: 'React Native Testing', instructor: 'Mike Chen', rating: 4.7, price: '$79', image: require('@/assets/images/img.jpg') },
  ];

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
        {/* Video Preview */}
        <View style={styles.videoContainer}>
          <Image 
            source={require('@/assets/images/img.jpg')} 
            style={styles.videoPreview}
            resizeMode="cover"
          />
          <View style={styles.videoOverlay}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={32} color="white" />
            </TouchableOpacity>
            <View style={styles.videoDuration}>
              <Text style={styles.videoDurationText}>Preview • 3:45</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Course Header */}
          <View style={styles.courseHeader}>
            <View style={styles.courseMeta}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(category as string) + '20' }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(category as string) }]}>
                  {category}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.ratingText}>{rating}</Text>
                <Text style={styles.studentsText}>({students} students)</Text>
              </View>
            </View>
            
            <Text style={styles.courseTitle}>{title}</Text>
            <Text style={styles.instructorName}>by {instructor}</Text>
            
            <View style={styles.courseStats}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={styles.statText}>{duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="#6B7280" />
                <Text style={styles.statText}>{students} students</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="trophy-outline" size={16} color="#6B7280" />
                <Text style={styles.statText}>Certificate</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
              onPress={() => setSelectedTab('overview')}
            >
              <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'curriculum' && styles.activeTab]}
              onPress={() => setSelectedTab('curriculum')}
            >
              <Text style={[styles.tabText, selectedTab === 'curriculum' && styles.activeTabText]}>Curriculum</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
              onPress={() => setSelectedTab('reviews')}
            >
              <Text style={[styles.tabText, selectedTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>About This Course</Text>
              <Text style={styles.description}>{description}</Text>
              
              <Text style={styles.sectionTitle}>What You'll Learn</Text>
              <View style={styles.learningPoints}>
                {[
                  'Master React Native fundamentals',
                  'Build real-world mobile applications',
                  'Understand navigation and state management',
                  'Deploy apps to App Store and Google Play'
                ].map((point, index) => (
                  <View key={index} style={styles.learningPoint}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={styles.learningPointText}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {selectedTab === 'curriculum' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Course Content</Text>
              <Text style={styles.curriculumInfo}>6 sections • 24 lectures • 12h 30m total</Text>
              
              <View style={styles.curriculumList}>
                {curriculum.map((lesson) => (
                  <View key={lesson.id} style={styles.lessonItem}>
                    <View style={styles.lessonLeft}>
                      <View style={styles.lessonIcon}>
                        {lesson.completed ? (
                          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        ) : lesson.locked ? (
                          <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                        ) : (
                          <Ionicons name="play-circle-outline" size={20} color="#3B82F6" />
                        )}
                      </View>
                      <View style={styles.lessonContent}>
                        <Text style={[styles.lessonTitle, lesson.locked && styles.lessonTitleLocked]}>
                          {lesson.title}
                        </Text>
                        <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                      </View>
                    </View>
                    {!lesson.locked && (
                      <TouchableOpacity style={styles.lessonAction}>
                        <Ionicons name="download-outline" size={16} color="#6B7280" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Student Reviews</Text>
              <View style={styles.reviewsHeader}>
                <View style={styles.ratingOverview}>
                  <Text style={styles.ratingNumber}>{rating}</Text>
                  <View style={styles.stars}>
                    {[1,2,3,4,5].map(star => (
                      <Ionicons key={star} name="star" size={16} color="#F59E0B" />
                    ))}
                  </View>
                  <Text style={styles.reviewCount}>Based on {students} reviews</Text>
                </View>
              </View>
            </View>
          )}

          {/* Related Courses */}
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Related Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {relatedCourses.map((course) => (
                <View key={course.id} style={styles.relatedCourse}>
                  <Image source={course.image} style={styles.relatedImage} resizeMode="cover" />
                  <Text style={styles.relatedTitle}>{course.title}</Text>
                  <Text style={styles.relatedInstructor}>by {course.instructor}</Text>
                  <View style={styles.relatedMeta}>
                    <View style={styles.relatedRating}>
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text style={styles.relatedRatingText}>{course.rating}</Text>
                    </View>
                    <Text style={styles.relatedPrice}>{course.price}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.originalPrice}>$129</Text>
        </View>
        <TouchableOpacity 
          style={[styles.enrollButton, isEnrolled && styles.continueButton]}
          onPress={() => setIsEnrolled(!isEnrolled)}
        >
          <Text style={styles.enrollButtonText}>
            {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>
      </View>
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
  videoContainer: {
    position: 'relative',
    height: 220,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoDurationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  courseHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  studentsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  tabContent: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  learningPoints: {
    marginBottom: 24,
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  learningPointText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  curriculumInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  curriculumList: {
    marginBottom: 24,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIcon: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  lessonTitleLocked: {
    color: '#9CA3AF',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  lessonAction: {
    padding: 8,
  },
  reviewsHeader: {
    marginBottom: 20,
  },
  ratingOverview: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  relatedSection: {
    marginTop: 24,
  },
  relatedCourse: {
    width: 160,
    marginRight: 16,
  },
  relatedImage: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  relatedInstructor: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  relatedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relatedRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedRatingText: {
    fontSize: 12,
    color: '#1F2937',
    marginLeft: 2,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  enrollButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButton: {
    backgroundColor: '#10B981',
  },
  enrollButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});