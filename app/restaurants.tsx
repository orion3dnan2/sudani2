
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { apiService } from '@/services/api';

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('الكل');

  const cuisineTypes = [
    'الكل',
    'مأكولات سودانية',
    'مأكولات عربية',
    'بيتزا',
    'برجر',
    'دجاج مقلي',
    'حلويات',
    'مشروبات',
    'وجبات سريعة'
  ];

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const response = await apiService.getStores({ category: 1 }); // فئة المطاعم
      if (response.success) {
        setRestaurants(response.data || []);
      }
    } catch (error) {
      console.error('خطأ في تحميل المطاعم:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'الكل' || restaurant.cuisineType === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const handleRestaurantPress = (restaurantId: string) => {
    router.push(`/user-store?storeId=${restaurantId}`);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <IconSymbol name="chevron.right" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>المطاعم</Text>
          <View style={styles.placeholder} />
        </View>
        <Text style={styles.headerSubtitle}>
          {filteredRestaurants.length} مطعم متاح
        </Text>
      </ThemedView>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="house.fill" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث في المطاعم..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>
      </View>

      {/* Cuisine Filter */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {cuisineTypes.map((cuisine, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedCuisine === cuisine && styles.selectedFilterChip
              ]}
              onPress={() => setSelectedCuisine(cuisine)}
            >
              <Text style={[
                styles.filterChipText,
                selectedCuisine === cuisine && styles.selectedFilterChipText
              ]}>
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Restaurants List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>جاري التحميل...</Text>
          </View>
        ) : filteredRestaurants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <IconSymbol name="house.fill" size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>لا توجد مطاعم</Text>
            <Text style={styles.emptySubtitle}>لم يتم العثور على مطاعم متوفرة حالياً</Text>
          </View>
        ) : (
          <View style={styles.restaurantsContainer}>
            {filteredRestaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant.id || index}
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress(restaurant.id)}
              >
                <View style={styles.restaurantImageContainer}>
                  <Image
                    source={restaurant.image ? { uri: restaurant.image } : require('@/assets/images/react-logo.png')}
                    style={styles.restaurantImage}
                  />
                  {restaurant.isOpen && (
                    <View style={styles.openBadge}>
                      <Text style={styles.openBadgeText}>مفتوح</Text>
                    </View>
                  )}
                  {restaurant.hasDelivery && (
                    <View style={styles.deliveryBadge}>
                      <IconSymbol name="paperplane.fill" size={12} color="#fff" />
                    </View>
                  )}
                </View>
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name || 'مطعم'}</Text>
                  <Text style={styles.cuisineType}>{restaurant.cuisineType || 'مأكولات متنوعة'}</Text>
                  <Text style={styles.restaurantDescription} numberOfLines={2}>
                    {restaurant.description || 'وصف المطعم'}
                  </Text>
                  <View style={styles.restaurantStats}>
                    <View style={styles.statItem}>
                      <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                      <Text style={styles.statText}>{restaurant.rating || '0.0'}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <IconSymbol name="paperplane.fill" size={16} color="#64748b" />
                      <Text style={styles.statText}>{restaurant.deliveryTime || '30-45 دقيقة'}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statText}>رسوم التوصيل: {restaurant.deliveryFee || 'مجاني'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ef4444',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fecaca',
    textAlign: 'center',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterSection: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedFilterChip: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedFilterChipText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  restaurantsContainer: {
    padding: 20,
    gap: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  restaurantImageContainer: {
    position: 'relative',
    marginLeft: 16,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  openBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#10b981',
  },
  openBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  cuisineType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 6,
    textAlign: 'right',
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'right',
  },
  restaurantStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#e5e7eb',
  },
});
