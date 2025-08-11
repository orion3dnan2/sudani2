
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function UserStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // معلومات المتجر (في تطبيق حقيقي، هذه ستأتي من قاعدة البيانات)
  const storeInfo = {
    name: 'متجر الفر',
    description: 'متجر متخصص في بيع المنتجات الرقمية والأزياء',
    rating: 4.8,
    totalProducts: 45,
    followers: 1250,
    coverImage: require('@/assets/images/react-logo.png'),
    profileImage: require('@/assets/images/react-logo.png'),
  };

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'fashion', name: 'أزياء' },
    { id: 'digital', name: 'منتجات رقمية' },
    { id: 'accessories', name: 'إكسسوارات' },
  ];

  const products = [
    {
      id: 1,
      name: 'هاتف ذكي متقدم',
      price: 2500,
      originalPrice: 3000,
      discount: 17,
      rating: 4.5,
      image: require('@/assets/images/react-logo.png'),
      category: 'electronics',
      inStock: true,
    },
    {
      id: 2,
      name: 'قميص كاجوال أنيق',
      price: 150,
      originalPrice: 200,
      discount: 25,
      rating: 4.2,
      image: require('@/assets/images/react-logo.png'),
      category: 'fashion',
      inStock: true,
    },
    {
      id: 3,
      name: 'دورة تدريبية أونلاين',
      price: 500,
      originalPrice: null,
      discount: 0,
      rating: 4.9,
      image: require('@/assets/images/react-logo.png'),
      category: 'digital',
      inStock: true,
    },
    {
      id: 4,
      name: 'ساعة ذكية رياضية',
      price: 800,
      originalPrice: 1000,
      discount: 20,
      rating: 4.6,
      image: require('@/assets/images/react-logo.png'),
      category: 'electronics',
      inStock: false,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    router.back();
  };

  const handleFollowStore = () => {
    alert('تم متابعة المتجر بنجاح!');
  };

  const handleProductPress = (productId: number) => {
    alert(`عرض تفاصيل المنتج ${productId}`);
  };

  const handleAddToCart = (productId: number) => {
    alert(`تم إضافة المنتج ${productId} إلى السلة`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol name="chevron.right" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{storeInfo.name}</Text>
          <Text style={styles.headerSubtitle}>متجر إلكتروني</Text>
        </View>

        <TouchableOpacity style={styles.shareButton}>
          <IconSymbol name="paperplane.fill" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView>

      {/* Store Cover and Info */}
      <View style={styles.storeSection}>
        <Image source={storeInfo.coverImage} style={styles.coverImage} />
        
        <View style={styles.storeInfoCard}>
          <View style={styles.storeProfileSection}>
            <View style={styles.storeDetails}>
              <Text style={styles.storeName}>{storeInfo.name}</Text>
              <Text style={styles.storeDescription}>{storeInfo.description}</Text>
              
              <View style={styles.storeStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{storeInfo.totalProducts}</Text>
                  <Text style={styles.statLabel}>منتج</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{storeInfo.followers}</Text>
                  <Text style={styles.statLabel}>متابع</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.ratingContainer}>
                    <IconSymbol name="house.fill" size={16} color="#fbbf24" />
                    <Text style={styles.statNumber}>{storeInfo.rating}</Text>
                  </View>
                  <Text style={styles.statLabel}>تقييم</Text>
                </View>
              </View>
            </View>

            <View style={styles.profileImageContainer}>
              <Image source={storeInfo.profileImage} style={styles.profileImage} />
            </View>
          </View>

          <TouchableOpacity style={styles.followButton} onPress={handleFollowStore}>
            <IconSymbol name="house.fill" size={20} color="#fff" />
            <Text style={styles.followButtonText}>متابعة المتجر</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <IconSymbol name="house.fill" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث في المتجر..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.selectedCategoryButtonText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>المنتجات ({filteredProducts.length})</Text>
        
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
            >
              <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} />
                {product.discount > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{product.discount}%</Text>
                  </View>
                )}
                {!product.inStock && (
                  <View style={styles.outOfStockBadge}>
                    <Text style={styles.outOfStockText}>نفذت الكمية</Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                
                <View style={styles.productRating}>
                  <IconSymbol name="house.fill" size={14} color="#fbbf24" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>

                <View style={styles.productPricing}>
                  <Text style={styles.currentPrice}>{product.price} ر.س</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>{product.originalPrice} ر.س</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.addToCartButton,
                    !product.inStock && styles.disabledButton
                  ]}
                  onPress={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                >
                  <IconSymbol name="house.fill" size={16} color={product.inStock ? "#fff" : "#9ca3af"} />
                  <Text style={[
                    styles.addToCartText,
                    !product.inStock && styles.disabledButtonText
                  ]}>
                    {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="house.fill" size={48} color="#9ca3af" />
            <Text style={styles.emptyStateText}>لا توجد منتجات مطابقة للبحث</Text>
          </View>
        )}
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
    backgroundColor: '#8b5cf6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeSection: {
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  storeInfoCard: {
    padding: 20,
  },
  storeProfileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  storeDetails: {
    flex: 1,
    paddingRight: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'right',
  },
  storeDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'right',
  },
  storeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8b5cf6',
  },
  followButton: {
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    textAlign: 'right',
    color: '#1f2937',
  },
  categoriesSection: {
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  selectedCategoryButton: {
    backgroundColor: '#8b5cf6',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  productsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'right',
    lineHeight: 20,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  disabledButton: {
    backgroundColor: '#f3f4f6',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
});
