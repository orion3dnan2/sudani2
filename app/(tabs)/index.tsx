
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  TextInput,
  Dimensions 
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, name: 'مطاعم', icon: 'house.fill', color: '#ef4444', stores: 23 },
    { id: 2, name: 'عطور', icon: 'paperplane.fill', color: '#8b5cf6', stores: 15 },
    { id: 3, name: 'حرف يدوية', icon: 'chevron.right', color: '#10b981', stores: 8 },
    { id: 4, name: 'إلكترونيات', icon: 'house.fill', color: '#3b82f6', stores: 12 },
    { id: 5, name: 'ملابس', icon: 'paperplane.fill', color: '#f59e0b', stores: 19 },
    { id: 6, name: 'كتب', icon: 'chevron.right', color: '#06b6d4', stores: 6 },
  ];

  const featuredStores = [
    { 
      id: 1, 
      name: 'مطعم الأصالة', 
      category: 'مطاعم', 
      rating: 4.8, 
      image: 'house.fill',
      distance: '1.2 كم',
      deliveryTime: '30-45 دقيقة'
    },
    { 
      id: 2, 
      name: 'عطور الجنة', 
      category: 'عطور', 
      rating: 4.9, 
      image: 'paperplane.fill',
      distance: '2.1 كم',
      deliveryTime: '45-60 دقيقة'
    },
    { 
      id: 3, 
      name: 'حرف تراثية', 
      category: 'حرف يدوية', 
      rating: 4.7, 
      image: 'chevron.right',
      distance: '3.5 كم',
      deliveryTime: '60-90 دقيقة'
    },
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>مرحباً بك</Text>
            <Text style={styles.title}>سوق المحلي</Text>
            <Text style={styles.subtitle}>اكتشف أفضل المتاجر المحلية</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <IconSymbol name="chevron.right" size={16} color="#fff" />
              <Text style={styles.logoutText}>خروج</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileIcon}>
              <IconSymbol name="house.fill" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' }}
          style={styles.backgroundImageContainer}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>اكتشف متاجر مدينتك</Text>
            <Text style={styles.heroSubtitle}>
              تسوق من المتاجر المحلية واحصل على أفضل المنتجات بأسرع وقت
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>تصفح المتاجر</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleMerchantSignup}>
                <Text style={styles.secondaryButtonText}>انضم كتاجر</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن متجر أو منتج..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <IconSymbol name="house.fill" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>تصفح حسب الفئة</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <IconSymbol name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.stores} متجر</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Featured Stores */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>المتاجر المميزة</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.storesContainer}>
          {featuredStores.map((store) => (
            <TouchableOpacity 
              key={store.id} 
              style={styles.storeCard}
              onPress={() => handleStorePress(store.id)}
            >
              <View style={styles.storeImageContainer}>
                <View style={styles.storeImage}>
                  <IconSymbol name={store.image} size={32} color="#3b82f6" />
                </View>
                <View style={styles.ratingBadge}>
                  <IconSymbol name="house.fill" size={12} color="#f59e0b" />
                  <Text style={styles.ratingText}>{store.rating}</Text>
                </View>
              </View>
              
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeCategory}>{store.category}</Text>
                
                <View style={styles.storeDetails}>
                  <View style={styles.storeDetailItem}>
                    <IconSymbol name="paperplane.fill" size={14} color="#64748b" />
                    <Text style={styles.storeDetailText}>{store.distance}</Text>
                  </View>
                  <View style={styles.storeDetailItem}>
                    <IconSymbol name="chevron.right" size={14} color="#64748b" />
                    <Text style={styles.storeDetailText}>{store.deliveryTime}</Text>
                  </View>
                </View>
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
        <Text style={styles.footerText}>سوق المحلي - دعم التجارة المحلية</Text>
        <Text style={styles.footerSubtext}>جميع الحقوق محفوظة © 2024</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e293b',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'right',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'right',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  backgroundImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchButton: {
    backgroundColor: '#3b82f6',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesScroll: {
    marginLeft: -20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  storesContainer: {
    gap: 16,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storeImageContainer: {
    position: 'relative',
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  storeInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  storeCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'right',
  },
  storeDetails: {
    gap: 4,
  },
  storeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'flex-end',
  },
  storeDetailText: {
    fontSize: 12,
    color: '#64748b',
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
    color: '#3b82f6',
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
});
