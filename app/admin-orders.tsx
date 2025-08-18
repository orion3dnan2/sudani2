import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { apiService } from '@/services/api';
import { Order } from '@/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, [selectedStatus]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const params = selectedStatus !== 'all' ? { status: selectedStatus } : {};
      const response = await apiService.getOrders(params);

      if (response.success && response.data) {
        setOrders(response.data.data || response.data);
      } else {
        Alert.alert('خطأ', response.error || 'فشل في تحميل الطلبات');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#10b981';
      case 'shipping': return '#3b82f6';
      case 'preparing': return '#f59e0b';
      case 'confirmed': return '#8b5cf6';
      case 'pending': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'shipping': return 'قيد التوصيل';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>جاري تحميل الطلبات...</Text>
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
        <Text style={styles.headerTitle}>إدارة الطلبات</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={loadOrders}>
          <IconSymbol name="arrow.clockwise" size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'all', label: 'الكل' },
            { key: 'pending', label: 'في الانتظار' },
            { key: 'confirmed', label: 'مؤكد' },
            { key: 'preparing', label: 'قيد التحضير' },
            { key: 'shipping', label: 'قيد التوصيل' },
            { key: 'delivered', label: 'تم التوصيل' },
            { key: 'cancelled', label: 'ملغي' }
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedStatus === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedStatus(filter.key)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedStatus === filter.key && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="doc.text" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateText}>لا توجد طلبات</Text>
            <Text style={styles.emptyStateSubtext}>لم يتم العثور على طلبات مطابقة للفلتر المحدد</Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderNumber}>طلب #{order.id}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                </View>
              </View>

              <View style={styles.orderInfo}>
                <Text style={styles.customerName}>العميل: {order.userName}</Text>
                <Text style={styles.storeName}>المتجر: {order.storeName}</Text>
                <Text style={styles.orderTotal}>المجموع: {order.total} ريال</Text>
                <Text style={styles.itemCount}>عدد المنتجات: {order.items.length}</Text>
              </View>

              <View style={styles.orderActions}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => router.push(`/order-details?id=${order.id}`)}
                >
                  <IconSymbol name="eye" size={16} color="#3b82f6" />
                  <Text style={styles.viewButtonText}>عرض التفاصيل</Text>
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
  refreshButton: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  orderDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  orderInfo: {
    marginBottom: 16,
  },
  customerName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
});