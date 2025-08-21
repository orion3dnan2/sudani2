
import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function ExploreScreen() {
  const categories = [
    { id: 1, name: 'المطاعم', icon: 'house.fill', color: '#8B4513', count: '250+' },
    { id: 2, name: 'المتاجر', icon: 'paperplane.fill', color: '#D2691E', count: '180+' },
    { id: 3, name: 'الخدمات', icon: 'chevron.right', color: '#F4A460', count: '320+' },
    { id: 4, name: 'التوظيف', icon: 'house.fill', color: '#A0522D', count: '120+' },
    { id: 5, name: 'العقارات', icon: 'paperplane.fill', color: '#DEB887', count: '85+' },
    { id: 6, name: 'السيارات', icon: 'chevron.right', color: '#CD853F', count: '95+' },
  ];

  const featuredStores = [
    { id: 1, name: 'متجر الخرطوم للالكترونيات', category: 'إلكترونيات', rating: 4.8, image: require('@/assets/images/react-logo.png') },
    { id: 2, name: 'مطعم النيل الأزرق', category: 'مطاعم', rating: 4.9, image: require('@/assets/images/react-logo.png') },
    { id: 3, name: 'خدمات التوصيل السريع', category: 'خدمات', rating: 4.7, image: require('@/assets/images/react-logo.png') },
  ];

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    // ربط فئات معينة بصفحات مخصصة
    if (categoryId === 1) { // المطاعم
      router.push('/restaurants');
    } else {
      router.push(`/category-stores?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
    }
  };

  const handleStorePress = (storeId: number) => {
    router.push(`/user-store?storeId=${storeId}`);
  };

  const handleQuickActionPress = (action: string) => {
    switch (action) {
      case 'add_store':
        router.push('/store-settings');
        break;
      case 'post_ad':
        router.push('/merchant-add-product');
        break;
      case 'request_service':
        // يمكن إضافة صفحة طلب الخدمات لاحقاً
        alert('صفحة طلب الخدمات قيد التطوير');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Text style={styles.headerTitle}>استكشف</Text>
        <Text style={styles.headerSubtitle}>اكتشف أفضل المتاجر والخدمات</Text>
      </ThemedView>

      {/* Categories Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الفئات الرئيسية</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id, category.name)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <IconSymbol name={category.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Stores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>المتاجر المميزة</Text>
        <View style={styles.storesContainer}>
          {featuredStores.map((store) => (
            <TouchableOpacity 
              key={store.id} 
              style={styles.storeCard}
              onPress={() => handleStorePress(store.id)}
            >
              <Image source={store.image} style={styles.storeImage} />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeCategory}>{store.category}</Text>
                <View style={styles.storeRating}>
                  <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                  <Text style={styles.ratingText}>{store.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('add_store')}
          >
            <IconSymbol name="paperplane.fill" size={24} color="#3b82f6" />
            <Text style={styles.quickActionText}>إضافة متجر</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('post_ad')}
          >
            <IconSymbol name="house.fill" size={24} color="#10b981" />
            <Text style={styles.quickActionText}>نشر إعلان</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('request_service')}
          >
            <IconSymbol name="chevron.right" size={24} color="#f59e0b" />
            <Text style={styles.quickActionText}>طلب خدمة</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'right',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748b',
  },
  storesContainer: {
    gap: 16,
  },
  storeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 16,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
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
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fbbf24',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
});
