import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['React Native', 'JavaScript', 'UI Design']);
  const [popularSearches] = useState(['Python', 'Machine Learning', 'Web Development', 'Mobile Apps']);
  const [favorites, setFavorites] = useState([1, 3]); // Course IDs that are favorited
  const [courseProgress, setCourseProgress] = useState({
    1: { progress: 75, lastWatched: 'Components and Props' },
    2: { progress: 30, lastWatched: 'Color Theory Basics' },
    3: { progress: 90, lastWatched: 'Async/Await Patterns' },
  });
  const [downloadedCourses, setDownloadedCourses] = useState([1, 2]); // Downloaded course IDs
  const [isOffline, setIsOffline] = useState(false);

  // Simulate loading data
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCourses(coursesData);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const handleSearchSelect = (query: string) => {
    setSearchQuery(query);
    setShowSearchSuggestions(false);
    // Add to recent searches if not already there
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 2)]);
    }
  };

  const toggleFavorite = (courseId: number) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleDownload = (courseId: number) => {
    setDownloadedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleCardPress = (item: any) => {
    router.push({
      pathname: '/detail',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        instructor: item.instructor,
        duration: item.duration,
        rating: item.rating,
        students: item.students,
        price: item.price,
      },
    });
  };

  const coursesData = [
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
      id: 2, 
      title: 'UI/UX Design Fundamentals', 
      description: 'Learn modern design principles and create stunning interfaces', 
      category: 'Design',
      instructor: 'Sarah Johnson',
      duration: '8h 45m',
      rating: 4.9,
      students: 1890,
      price: '$79',
      level: 'Beginner'
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
    { 
      id: 4, 
      title: 'Data Science with Python', 
      description: 'Analyze data and build machine learning models with Python', 
      category: 'Data Science',
      instructor: 'Dr. Emily Davis',
      duration: '20h 15m',
      rating: 4.6,
      students: 1560,
      price: '$129',
      level: 'Intermediate'
    },
    { 
      id: 5, 
      title: 'Digital Marketing Strategy', 
      description: 'Build effective marketing campaigns and grow your business', 
      category: 'Marketing',
      instructor: 'Alex Rodriguez',
      duration: '6h 30m',
      rating: 4.5,
      students: 980,
      price: '$69',
      level: 'Beginner'
    },
  ];

  const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return '#3B82F6';
      case 'Design': return '#8B5CF6';
      case 'Data Science': return '#10B981';
      case 'Marketing': return '#F97316';
      default: return '#6B7280';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
      >
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'Student'}! 👋</Text>
              {isOffline && (
                <View style={styles.offlineIndicator}>
                  <Ionicons name="cloud-offline-outline" size={16} color="#F97316" />
                  <Text style={styles.offlineText}>Offline Mode</Text>
                </View>
              )}
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={[styles.actionButton, isOffline && styles.offlineButton]} 
                onPress={() => setIsOffline(!isOffline)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isOffline ? "cloud-offline" : "cloud-done-outline"} 
                  size={20} 
                  color={isOffline ? "#F97316" : "#10B981"} 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={24} color="#3B82F6" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="book-outline" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Enrolled</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              </View>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="time-outline" size={20} color="#F97316" />
              </View>
              <Text style={styles.statNumber}>42h</Text>
              <Text style={styles.statLabel}>Learning</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search courses..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton} activeOpacity={0.7}>
                  <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <View style={styles.searchSuggestions}>
                {recentSearches.length > 0 && (
                  <View style={styles.suggestionSection}>
                    <Text style={styles.suggestionTitle}>Recent Searches</Text>
                    {recentSearches.map((search, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={styles.suggestionItem}
                        onPress={() => handleSearchSelect(search)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                        <Text style={styles.suggestionText}>{search}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                <View style={styles.suggestionSection}>
                  <Text style={styles.suggestionTitle}>Popular Searches</Text>
                  {popularSearches.map((search, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.suggestionItem}
                      onPress={() => handleSearchSelect(search)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="trending-up-outline" size={16} color="#9CA3AF" />
                      <Text style={styles.suggestionText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Continue Learning Section */}
          {Object.keys(courseProgress).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Continue Learning</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.seeAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.continueContainer}>
                {Object.entries(courseProgress).map(([courseId, progress]) => {
                  const course = coursesData.find(c => c.id === parseInt(courseId));
                  if (!course) return null;
                  
                  return (
                    <TouchableOpacity 
                      key={courseId} 
                      style={styles.continueCard}
                      onPress={() => handleCardPress(course)}
                      activeOpacity={0.95}
                    >
                      <Image 
                        source={require('@/assets/images/img.jpg')} 
                        style={styles.continueImage}
                        resizeMode="cover"
                      />
                      <View style={styles.continueContent}>
                        <Text style={styles.continueTitle}>{course.title}</Text>
                        <Text style={styles.continueLesson}>{progress.lastWatched}</Text>
                        <View style={styles.progressContainer}>
                          <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${progress.progress}%` }]} />
                          </View>
                          <Text style={styles.progressText}>{progress.progress}%</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Courses</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Course Cards */}
          {isLoading ? (
            // Loading Skeleton
            <View style={styles.loadingContainer}>
              {[1,2,3].map((item) => (
                <View key={item} style={styles.skeletonCard}>
                  <View style={styles.skeletonImage} />
                  <View style={styles.skeletonContent}>
                    <View style={styles.skeletonTitle} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonFooter}>
                      <View style={styles.skeletonSmall} />
                      <View style={styles.skeletonSmall} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            filteredCourses.map((course) => (
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
                      <View style={styles.courseActions}>
                        <TouchableOpacity 
                          style={styles.actionIcon}
                          onPress={() => toggleDownload(course.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons 
                            name={downloadedCourses.includes(course.id) ? "download" : "download-outline"} 
                            size={18} 
                            color={downloadedCourses.includes(course.id) ? "#10B981" : "#9CA3AF"} 
                          />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.actionIcon}
                          onPress={() => toggleFavorite(course.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons 
                            name={favorites.includes(course.id) ? "heart" : "heart-outline"} 
                            size={18} 
                            color={favorites.includes(course.id) ? "#EF4444" : "#9CA3AF"} 
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.coursePrice}>{course.price}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.courseDescription}>{course.description}</Text>
                  
                  {/* Progress Bar */}
                  {courseProgress[course.id] && (
                    <View style={styles.courseProgressContainer}>
                      <View style={styles.courseProgressBar}>
                        <View style={[styles.courseProgressFill, { width: `${courseProgress[course.id].progress}%` }]} />
                      </View>
                      <Text style={styles.courseProgressText}>{courseProgress[course.id].progress}% complete</Text>
                    </View>
                  )}
                  
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
                    <View style={styles.courseTags}>
                      {downloadedCourses.includes(course.id) && (
                        <View style={styles.downloadedBadge}>
                          <Ionicons name="download" size={10} color="#10B981" />
                          <Text style={styles.downloadedText}>Downloaded</Text>
                        </View>
                      )}
                      <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(course.category) + '20' }]}>
                        <Text style={[styles.categoryTagText, { color: getCategoryColor(course.category) }]}>
                          {course.category}
                        </Text>
                      </View>
                      <View style={[styles.levelTag, { backgroundColor: getLevelColor(course.level) + '20' }]}>
                        <Text style={[styles.levelTagText, { color: getLevelColor(course.level) }]}>
                          {course.level}
                        </Text>
                      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeSection: {
    flex: 1,
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  offlineText: {
    fontSize: 12,
    color: '#F97316',
    marginLeft: 4,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  offlineButton: {
    backgroundColor: '#FEF3C7',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  searchWrapper: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clearButton: {
    padding: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
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
  courseActions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  actionIcon: {
    padding: 4,
    marginLeft: 4,
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
  courseTags: {
    flexDirection: 'row',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  levelTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  loadingContainer: {
    paddingVertical: 8,
  },
  skeletonCard: {
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
  skeletonImage: {
    height: 140,
    backgroundColor: '#E5E7EB',
  },
  skeletonContent: {
    padding: 16,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  skeletonText: {
    height: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 12,
    width: '90%',
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonSmall: {
    height: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    width: '30%',
  },
  searchSuggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 300,
  },
  suggestionSection: {
    paddingVertical: 8,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suggestionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  continueContainer: {
    marginBottom: 8,
  },
  continueCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  continueImage: {
    width: '100%',
    height: 100,
  },
  continueContent: {
    padding: 12,
  },
  continueTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  continueLesson: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  courseProgressContainer: {
    marginBottom: 12,
  },
  courseProgressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  courseProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  courseProgressText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  downloadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  downloadedText: {
    fontSize: 9,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 2,
  },
});