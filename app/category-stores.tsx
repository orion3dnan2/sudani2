
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams, router } from 'expo-router';
import { apiService } from '@/services/api';

export default function CategoryStoresScreen() {
  const { categoryId, categoryName } = useLocalSearchParams();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStoresByCategory();
  }, [categoryId]);

  const loadStoresByCategory = async () => {
    try {
      setLoading(true);
      const response = await apiService.getStores({ category: categoryId });
      if (response.success) {
        setStores(response.data || []);
      }
    } catch (error) {
      console.error('خطأ في تحميل المتاجر:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStorePress = (storeId: string) => {
    router.push(`/user-store?storeId=${storeId}`);
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
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <View style={styles.placeholder} />
        </View>
        <Text style={styles.headerSubtitle}>
          {filteredStores.length} متجر متاح
        </Text>
      </ThemedView>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="house.fill" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث في المتاجر..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>
      </View>

      {/* Stores List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>جاري التحميل...</Text>
          </View>
        ) : filteredStores.length === 0 ? (
          <View style={styles.emptyContainer}>
            <IconSymbol name="house.fill" size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>لا توجد متاجر</Text>
            <Text style={styles.emptySubtitle}>لم يتم العثور على متاجر في هذه الفئة</Text>
          </View>
        ) : (
          <View style={styles.storesContainer}>
            {filteredStores.map((store, index) => (
              <TouchableOpacity
                key={store.id || index}
                style={styles.storeCard}
                onPress={() => handleStorePress(store.id)}
              >
                <View style={styles.storeImageContainer}>
                  <Image
                    source={store.image ? { uri: store.image } : require('@/assets/images/react-logo.png')}
                    style={styles.storeImage}
                  />
                  {store.isVip && (
                    <View style={styles.vipBadge}>
                      <IconSymbol name="house.fill" size={12} color="#fbbf24" />
                    </View>
                  )}
                </View>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{store.name || 'متجر'}</Text>
                  <Text style={styles.storeDescription} numberOfLines={2}>
                    {store.description || 'وصف المتجر'}
                  </Text>
                  <View style={styles.storeStats}>
                    <View style={styles.statItem}>
                      <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                      <Text style={styles.statText}>{store.rating || '0.0'}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <IconSymbol name="paperplane.fill" size={16} color="#64748b" />
                      <Text style={styles.statText}>{store.distance || '0 كم'}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statText}>{store.productsCount || '0'} منتج</Text>
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
    backgroundColor: '#1e293b',
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
    color: '#cbd5e1',
    textAlign: 'center',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  storesContainer: {
    padding: 20,
    gap: 16,
  },
  storeCard: {
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
  storeImageContainer: {
    position: 'relative',
    marginLeft: 16,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  vipBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
    textAlign: 'right',
  },
  storeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'right',
  },
  storeStats: {
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
