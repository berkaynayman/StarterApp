import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [currentXP, setCurrentXP] = useState(2340);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [nextLevelXP] = useState(3000);
  const [dailyStreak, setDailyStreak] = useState(12);
  
  const levelProgress = (currentXP % 1000) / 10; // Progress to next level

  const achievements = [
    { id: 1, title: 'First Course', description: 'Completed your first course', icon: 'trophy', color: '#F59E0B', earned: true, xp: 100 },
    { id: 2, title: 'Week Streak', description: '7 days learning streak', icon: 'flame', color: '#EF4444', earned: true, xp: 200 },
    { id: 3, title: 'Fast Learner', description: 'Completed 5 courses in a month', icon: 'flash', color: '#8B5CF6', earned: false, xp: 500 },
    { id: 4, title: 'Expert', description: 'Earned 10 certificates', icon: 'school', color: '#10B981', earned: false, xp: 1000 },
    { id: 5, title: 'Night Owl', description: 'Study after 10 PM for 5 days', icon: 'moon', color: '#6366F1', earned: true, xp: 150 },
    { id: 6, title: 'Early Bird', description: 'Study before 8 AM for 7 days', icon: 'sunny', color: '#F59E0B', earned: false, xp: 300 },
  ];

  const recentActivity = [
    { id: 1, action: 'Completed', course: 'React Native Masterclass', time: '2 hours ago', icon: 'checkmark-circle', color: '#10B981' },
    { id: 2, action: 'Started', course: 'UI/UX Design Fundamentals', time: '1 day ago', icon: 'play-circle', color: '#3B82F6' },
    { id: 3, action: 'Earned Certificate', course: 'JavaScript Advanced', time: '3 days ago', icon: 'ribbon', color: '#F59E0B' },
  ];

  const learningStats = [
    { label: 'Total Hours', value: '127h', icon: 'time', color: '#3B82F6' },
    { label: 'Courses Completed', value: '8', icon: 'checkmark-circle', color: '#10B981' },
    { label: 'Certificates', value: '5', icon: 'ribbon', color: '#F59E0B' },
    { label: 'Current Streak', value: '12 days', icon: 'flame', color: '#EF4444' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profilePhotoContainer}>
              <View style={styles.profilePhoto}>
                <Ionicons name="person" size={40} color="#3B82F6" />
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>L{currentLevel}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Student'}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              
              {/* XP Progress */}
              <View style={styles.xpContainer}>
                <View style={styles.xpHeader}>
                  <Text style={styles.xpText}>{currentXP} XP</Text>
                  <Text style={styles.xpNext}>Next: {nextLevelXP} XP</Text>
                </View>
                <View style={styles.xpBar}>
                  <View style={[styles.xpFill, { width: `${levelProgress}%` }]} />
                </View>
              </View>
              
              <View style={styles.profileStats}>
                <View style={styles.profileStat}>
                  <Text style={styles.profileStatNumber}>Level {currentLevel}</Text>
                  <Text style={styles.profileStatLabel}>Current Level</Text>
                </View>
                <View style={styles.profileStat}>
                  <Text style={styles.profileStatNumber}>{dailyStreak} days</Text>
                  <Text style={styles.profileStatLabel}>Streak 🔥</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Daily Challenge */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Challenge</Text>
            <View style={styles.challengeCard}>
              <View style={styles.challengeIcon}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
              </View>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeTitle}>Complete 2 Lessons</Text>
                <Text style={styles.challengeDescription}>Earn 50 XP bonus points</Text>
                <View style={styles.challengeProgress}>
                  <View style={styles.challengeBar}>
                    <View style={[styles.challengeFill, { width: '50%' }]} />
                  </View>
                  <Text style={styles.challengeText}>1/2 completed</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.challengeButton}>
                <Text style={styles.challengeButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Learning Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Progress</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Weekly Goal</Text>
                <Text style={styles.progressPercentage}>75%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.progressText}>15h of 20h completed this week</Text>
            </View>
          </View>

          {/* Learning Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Stats</Text>
            <View style={styles.statsGrid}>
              {learningStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={[
                  styles.achievementCard,
                  !achievement.earned && styles.achievementCardLocked
                ]}>
                  <View style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.earned ? achievement.color + '20' : '#F3F4F6' }
                  ]}>
                    <Ionicons 
                      name={achievement.icon as any} 
                      size={24} 
                      color={achievement.earned ? achievement.color : '#9CA3AF'} 
                    />
                  </View>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.earned && styles.achievementTitleLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.achievementDescriptionLocked
                  ]}>
                    {achievement.description}
                  </Text>
                  <View style={styles.achievementXP}>
                    <Text style={[
                      styles.achievementXPText,
                      !achievement.earned && styles.achievementXPLocked
                    ]}>
                      +{achievement.xp} XP
                    </Text>
                  </View>
                  {!achievement.earned && (
                    <View style={styles.lockOverlay}>
                      <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              {recentActivity.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                    <Ionicons name={activity.icon as any} size={16} color={activity.color} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityText}>
                      <Text style={styles.activityAction}>{activity.action}</Text> {activity.course}
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="download-outline" size={20} color="#3B82F6" />
                <Text style={styles.quickActionText}>Downloads</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="bookmark-outline" size={20} color="#3B82F6" />
                <Text style={styles.quickActionText}>Bookmarks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="ribbon-outline" size={20} color="#3B82F6" />
                <Text style={styles.quickActionText}>Certificates</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  profileHeader: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: '35%',
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  xpContainer: {
    marginVertical: 12,
    width: '100%',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  xpNext: {
    fontSize: 12,
    color: '#6B7280',
  },
  xpBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 8,
  },
  challengeFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  challengeText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  challengeButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  challengeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementDescriptionLocked: {
    color: '#9CA3AF',
  },
  achievementXP: {
    marginTop: 4,
  },
  achievementXPText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: 'bold',
  },
  achievementXPLocked: {
    color: '#9CA3AF',
  },
  lockOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  activityList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  activityAction: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 8,
    fontWeight: '600',
  },
});