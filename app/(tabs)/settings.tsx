import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Switch, Modal } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState('HD');
  const [language, setLanguage] = useState('English');
  const [storageUsed] = useState(2.4); // GB
  const [totalStorage] = useState(16); // GB
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const qualityOptions = [
    { id: 'SD', label: 'SD (480p)', description: 'Lower quality, less storage' },
    { id: 'HD', label: 'HD (720p)', description: 'Good quality, moderate storage' },
    { id: 'Full HD', label: 'Full HD (1080p)', description: 'Best quality, more storage' },
  ];

  const languageOptions = [
    { id: 'English', label: 'English', flag: '🇺🇸' },
    { id: 'Türkçe', label: 'Türkçe', flag: '🇹🇷' },
    { id: 'Español', label: 'Español', flag: '🇪🇸' },
    { id: 'Français', label: 'Français', flag: '🇫🇷' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const handleQualitySelect = (quality: string) => {
    setDownloadQuality(quality);
    setShowQualityModal(false);
  };

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
          {/* User Info Header */}
          <View style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Ionicons name="person" size={32} color="#3B82F6" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'Student'}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <View style={styles.userBadge}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.userBadgeText}>Pro Member</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Ionicons name="pencil" size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {/* Learning Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Preferences</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#1F2937' + '20' }]}>
                    <Ionicons name="moon" size={20} color="#1F2937" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Dark Mode</Text>
                    <Text style={styles.settingDescription}>Switch to dark theme</Text>
                  </View>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#3B82F6' + '20' }]}>
                    <Ionicons name="notifications" size={20} color="#3B82F6" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Push Notifications</Text>
                    <Text style={styles.settingDescription}>Course updates & reminders</Text>
                  </View>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#10B981' + '20' }]}>
                    <Ionicons name="download" size={20} color="#10B981" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Auto Download</Text>
                    <Text style={styles.settingDescription}>Download new lessons automatically</Text>
                  </View>
                </View>
                <Switch
                  value={autoDownload}
                  onValueChange={setAutoDownload}
                  trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                  thumbColor={autoDownload ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#F97316' + '20' }]}>
                    <Ionicons name="wifi-outline" size={20} color="#F97316" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Offline Mode</Text>
                    <Text style={styles.settingDescription}>Access downloaded content offline</Text>
                  </View>
                </View>
                <Switch
                  value={offlineMode}
                  onValueChange={setOfflineMode}
                  trackColor={{ false: '#E5E7EB', true: '#F97316' }}
                  thumbColor={offlineMode ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            </View>
          </View>

          {/* App Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem} onPress={() => setShowQualityModal(true)}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
                    <Ionicons name="videocam" size={20} color="#8B5CF6" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Download Quality</Text>
                    <Text style={styles.settingDescription}>Current: {downloadQuality}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem} onPress={() => setShowLanguageModal(true)}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#EF4444' + '20' }]}>
                    <Ionicons name="language" size={20} color="#EF4444" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Language</Text>
                    <Text style={styles.settingDescription}>Current: {language}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#F59E0B' + '20' }]}>
                    <Ionicons name="trash" size={20} color="#F59E0B" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Clear Cache</Text>
                    <Text style={styles.settingDescription}>Free up storage space</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Storage Management */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Storage Management</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#3B82F6' + '20' }]}>
                    <Ionicons name="server" size={20} color="#3B82F6" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Downloaded Content</Text>
                    <Text style={styles.settingDescription}>{storageUsed} GB of {totalStorage} GB used</Text>
                    <View style={styles.storageBar}>
                      <View style={[styles.storageFill, { width: `${(storageUsed / totalStorage) * 100}%` }]} />
                    </View>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#10B981' + '20' }]}>
                    <Ionicons name="folder" size={20} color="#10B981" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Manage Downloads</Text>
                    <Text style={styles.settingDescription}>View and delete downloaded courses</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support & Legal</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#3B82F6' + '20' }]}>
                    <Ionicons name="help-circle" size={20} color="#3B82F6" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Help Center</Text>
                    <Text style={styles.settingDescription}>Get help and support</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#10B981' + '20' }]}>
                    <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Privacy Policy</Text>
                    <Text style={styles.settingDescription}>How we protect your data</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#F97316' + '20' }]}>
                    <Ionicons name="document-text" size={20} color="#F97316" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>Terms of Service</Text>
                    <Text style={styles.settingDescription}>App terms and conditions</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[styles.settingIcon, { backgroundColor: '#6B7280' + '20' }]}>
                    <Ionicons name="information-circle" size={20} color="#6B7280" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>App Version</Text>
                    <Text style={styles.settingDescription}>v1.0.0 (Latest)</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Download Quality Modal */}
      <Modal
        visible={showQualityModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQualityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Download Quality</Text>
              <TouchableOpacity onPress={() => setShowQualityModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            {qualityOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.modalOption}
                onPress={() => handleQualitySelect(option.id)}
              >
                <View style={styles.modalOptionContent}>
                  <Text style={styles.modalOptionTitle}>{option.label}</Text>
                  <Text style={styles.modalOptionDescription}>{option.description}</Text>
                </View>
                {downloadQuality === option.id && (
                  <Ionicons name="checkmark" size={20} color="#3B82F6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.modalOption}
                onPress={() => handleLanguageSelect(option.id)}
              >
                <View style={styles.modalOptionContent}>
                  <Text style={styles.modalOptionFlag}>{option.flag}</Text>
                  <Text style={styles.modalOptionTitle}>{option.label}</Text>
                </View>
                {language === option.id && (
                  <Ionicons name="checkmark" size={20} color="#3B82F6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  userCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  userBadgeText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  editProfileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
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
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  storageBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 8,
  },
  storageFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  modalOptionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalOptionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  modalOptionFlag: {
    fontSize: 20,
    marginRight: 12,
  },
});