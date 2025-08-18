import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { apiService } from '@/services/api';
import { Product } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export default function MerchantProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await apiService.getProducts({ storeId: user.id });

      if (response.success && response.data) {
        setProducts(response.data.data || response.data);
      } else {
        Alert.alert('خطأ', response.error || 'فشل في تحميل المنتجات');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد من حذف هذا المنتج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await apiService.deleteProduct(productId);

              if (response.success) {
                Alert.alert('نجح', 'تم حذف المنتج بنجاح');
                loadProducts();
              } else {
                Alert.alert('خطأ', response.error || 'فشل في حذف المنتج');
              }
            } catch (error) {
              Alert.alert('خطأ', 'حدث خطأ أثناء حذف المنتج');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'draft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'مفعل';
      case 'inactive': return 'غير مفعل';
      case 'draft': return 'مسودة';
      default: return status;
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>جاري تحميل المنتجات...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.right" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>منتجاتي</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/merchant-add-product')}
        >
          <IconSymbol name="plus" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <ScrollView 
        style={styles.productsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {products.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="cube.box" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>لا توجد منتجات</Text>
            <Text style={styles.emptyStateSubtitle}>ابدأ بإضافة منتجاتك الأولى</Text>
            <TouchableOpacity 
              style={styles.addProductButton}
              onPress={() => router.push('/merchant-add-product')}
            >
              <IconSymbol name="plus" size={20} color="#fff" />
              <Text style={styles.addProductButtonText}>إضافة منتج جديد</Text>
            </TouchableOpacity>
          </View>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(product.status)}</Text>
                  </View>
                </View>

                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>

                <View style={styles.productDetails}>
                  <Text style={styles.productPrice}>{product.price} ريال</Text>
                  <Text style={styles.productStock}>المخزون: {product.stock}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
              </View>

              <View style={styles.productActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => router.push(`/merchant-edit-product?id=${product.id}`)}
                >
                  <IconSymbol name="pencil" size={16} color="#3b82f6" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <IconSymbol name="trash" size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    padding: 8,
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  addProductButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  productDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  productStock: {
    fontSize: 14,
    color: '#6b7280',
  },
  productCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  productActions: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
});