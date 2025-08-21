import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Modal
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const categories = [
    { id: 1, name: 'مطاعم', icon: 'fork.knife', color: '#ef4444' },
    { id: 2, name: 'بقالة', icon: 'basket', color: '#10b981' },
    { id: 3, name: 'صيدلية', icon: 'cross.case', color: '#3b82f6' },
    { id: 4, name: 'ملابس', icon: 'tshirt', color: '#8b5cf6' },
  ];

  const featuredStores = [
    { name: 'مطعم الأصالة', rating: 4.8, image: '🍽️' },
    { name: 'بقالة السعد', rating: 4.6, image: '🛒' },
    { name: 'صيدلية النور', rating: 4.9, image: '💊' },
    { name: 'ملابس العز', rating: 4.7, image: '👕' },
  ];

  const handleLogout = () => {
    router.replace('/auth');
  };

  const handleCategoryPress = (categoryId: number) => {
    console.log('Category pressed:', categoryId);
    // يمكن إضافة منطق التصفية حسب الفئة هنا
  };

  const handleStorePress = (storeId: number) => {
    router.push('/user-store');
  };

  const handleMerchantSignup = () => {
    router.push('/auth');
  };

  const handleSearch = () => {
    console.log('البحث عن:', searchQuery);
    // يمكن إضافة منطق البحث هنا
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="arrow.right.square" size={20} color="#fff" />
          <Text style={styles.logoutText}>خروج</Text>
        </TouchableOpacity>

        <Text style={styles.appTitle}>القفة السودانية</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setShowUserMenu(true)}
        >
          <IconSymbol name="person.circle.fill" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#8B4513', '#D2691E', '#CD853F']}
          style={styles.backgroundImageContainer}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>القفة السودانية</Text>
            <Text style={styles.heroSubtitle}>
              تسوق من أفضل المتاجر المحلية بضغطة واحدة
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/restaurants')}
            >
              <Text style={styles.primaryButtonText}>ابدأ التسوق</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن متجر أو منتج..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>التصنيفات</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <IconSymbol name={category.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Stores */}
      <View style={styles.popularSection}>
        <Text style={styles.sectionTitle}>المتاجر المميزة</Text>
        <View style={styles.storesGrid}>
          {featuredStores.map((store, index) => (
            <TouchableOpacity
              key={index}
              style={styles.storeCard}
              onPress={() => handleStorePress(index)}
            >
              <Text style={styles.storeEmoji}>{store.image}</Text>
              <Text style={styles.storeName}>{store.name}</Text>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={12} color="#fbbf24" />
                <Text style={styles.rating}>{store.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>إحصائيات سريعة</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>متجر محلي</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>عميل راضي</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>خدمة العملاء</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>القفة السودانية - دعم التجارة المحلية</Text>
        <Text style={styles.footerSubtext}>جميع الحقوق محفوظة © 2024</Text>
      </View>

      {/* User Menu Modal */}
      <Modal
        visible={showUserMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUserMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUserMenu(false)}
        >
          <View style={styles.userMenuContainer}>
            <View style={styles.userMenuHeader}>
              <View style={styles.userAvatar}>
                <IconSymbol name="person.circle.fill" size={40} color="#8B4513" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>المستخدم</Text>
                <Text style={styles.userEmail}>user@example.com</Text>
              </View>
            </View>

            <View style={styles.userMenuItems}>
              <TouchableOpacity
                style={styles.userMenuItem}
                onPress={() => {
                  setShowUserMenu(false);
                  router.push('/user-settings');
                }}
              >
                <IconSymbol name="house.fill" size={20} color="#8B4513" />
                <Text style={styles.userMenuItemText}>إعدادات الحساب</Text>
                <IconSymbol name="chevron.right" size={16} color="#8B4513" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.userMenuItem}
                onPress={() => {
                  setShowUserMenu(false);
                  // إضافة منطق عرض الطلبات
                }}
              >
                <IconSymbol name="paperplane.fill" size={20} color="#8B4513" />
                <Text style={styles.userMenuItemText}>طلباتي</Text>
                <IconSymbol name="chevron.right" size={16} color="#8B4513" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.userMenuItem}
                onPress={() => {
                  setShowUserMenu(false);
                  // إضافة منطق المفضلة
                }}
              >
                <IconSymbol name="house.fill" size={20} color="#8B4513" />
                <Text style={styles.userMenuItemText}>المفضلة</Text>
                <IconSymbol name="chevron.right" size={16} color="#8B4513" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.userMenuItem}
                onPress={() => {
                  setShowUserMenu(false);
                  // إضافة منطق المساعدة
                }}
              >
                <IconSymbol name="paperplane.fill" size={20} color="#8B4513" />
                <Text style={styles.userMenuItemText}>المساعدة</Text>
                <IconSymbol name="chevron.right" size={16} color="#8B4513" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={[styles.userMenuItem, styles.logoutMenuItem]}
                onPress={() => {
                  setShowUserMenu(false);
                  handleLogout();
                }}
              >
                <IconSymbol name="house.fill" size={20} color="#ef4444" />
                <Text style={[styles.userMenuItemText, styles.logoutMenuText]}>تسجيل الخروج</Text>
                <IconSymbol name="chevron.right" size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    backgroundColor: '#8B4513',
    borderBottomWidth: 1,
    borderBottomColor: '#A0522D',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    backgroundColor: '#D2691E',
    padding: 8,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F4A460',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    gap: 6,
  },
  logoutText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    height: 250,
  },
  backgroundImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    textAlign: 'right',
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    alignItems: 'center',
    width: '48%',
    paddingVertical: 20,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  popularSection: {
    padding: 20,
  },
  storesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    backgroundColor: '#1e293b',
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  // User Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 20,
  },
  userMenuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 280,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  userMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4A460',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  userMenuItems: {
    paddingVertical: 8,
  },
  userMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  userMenuItemText: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  logoutMenuItem: {
    borderTopWidth: 1,
    borderTopColor: '#fee2e2',
    backgroundColor: '#fef2f2',
  },
  logoutMenuText: {
    color: '#ef4444',
  },
});